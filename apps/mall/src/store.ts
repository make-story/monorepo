import { Store, configureStore, Reducer } from '@reduxjs/toolkit';
import createSagaMiddleware, { Task } from 'redux-saga';
import { createWrapper, Context, _GetServersidePropsCallback, GetServerSidePropsContext } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import produce from 'immer';
import _omit from 'lodash/omit';

import createApiManagerServerSide from '@makeapi/common/apiManager/serverSide';
import { injectAxiosMiddleware } from '@makeapi/common/apiManager/reduxMiddlewares';
import rootReducer, { TypedRootState } from './rootReducer';
import rootSaga from './rootSaga';

export interface SagaStore extends Store {
  sagaTask?: Task;
}

/**
 * 스토어 생성
 * Next js 에 의해 서버에서는 사용자별로 스토어 생성
 */
const makeStore = (context: Context) => {
  // 1: Create the middleware
  const sagaMiddleware = createSagaMiddleware();
  // 2: Add an extra parameter for applying middleware:
  const store = configureStore({
    reducer: rootReducer as Reducer<TypedRootState>,
    devTools: true, // 운영환경의 경우 false
    middleware: getDefaultMiddleware =>
      // 기본 미들웨어 설정
      // 공식문서: https://redux-toolkit.js.org/api/getDefaultMiddleware
      //
      // thunk는 사용하지 않기로 함에 따라 false로 설정한다.
      // immutableCheck, serializableCheck는 개발을 돕는 도구로, true로 설정하여도 production에서는 활성화 되지 않는다.
      // 모두 true 설정 시 기본값은 아래와 같다.
      // - node env production: [thunk]
      // - node env development: [thunk, immutableCheck, serializableCheck]
      getDefaultMiddleware({
        thunk: false,
        // Immutability Middleware 활성화 여부
        // https://redux-toolkit.js.org/api/immutabilityMiddleware
        //
        // 주의! Redux state는 불변성을 유지해야 한다.
        // https://ko.redux.js.org/tutorials/fundamentals/part-1-overview/#the-redux-store
        // - You must never directly modify or change the state that is kept inside the Redux store
        // - Instead, the only way to cause an update to the state is to create a plain action object that describes "something that happened in the application", and then dispatch the action to the store to tell it what happened.
        immutableCheck: true,
        // Serializability Middleware 활성화 여부
        // https://redux-toolkit.js.org/api/serializabilityMiddleware
        //
        // 주의! Redux action 과 state는 직렬화 가능한 값만 포함해야 한다.
        // https://ko.redux.js.org/tutorials/essentials/part-4-using-data/#storing-dates-for-posts
        // - Redux actions and state should only contain plain JS values like objects, arrays, and primitives.
        // - Don't put class instances, functions, or other non-serializable values into Redux!
        serializableCheck: true,
      })
        // 추가 미들웨어 설정
        .concat([injectAxiosMiddleware, sagaMiddleware]),
  });
  // 3: Run your sagas on server
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  // 4: now return the store:
  return store;
};

/**
 * getServerSideProps에 공통로직 추가
 */
const createWrapperWithCommonLogic = () => {
  // Next.js는 유저가 요청할때마다 redux store를 새로 생성
  const wrapper = createWrapper(makeStore, {
    // 디버그 로깅 사용여부
    debug: false,
    serializeState: state => JSON.stringify(state),
    deserializeState: state => JSON.parse(state),
  });

  const getServerSideProps = <P extends {} = any, Strict extends boolean = false>(
    callback: _GetServersidePropsCallback<ReturnType<typeof makeStore>, P, Strict>,
  ) => {
    return wrapper.getServerSideProps(store => async _context => {
      const context: GetServerSidePropsContext = {
        ..._context,
        store,
        apiManager: await createApiManagerServerSide({ ..._context, store }),
      };

      const { req, res } = context;

      return await callback(context);
    });
  };

  // wrapper 에서 getServerSideProps를 override하여 반환
  return {
    ...wrapper,
    getServerSideProps,
  };
};

export const wrapper = createWrapperWithCommonLogic();
