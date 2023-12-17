//import { GetServerSidePropsContext } from 'next';
import {
  Action,
  configureStore,
  EnhancedStore,
  ThunkAction,
  combineReducers,
  AnyAction,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  Persistor,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  HYDRATE,
  createWrapper,
  Context,
  MakeStore,
  _GetServersidePropsCallback,
  GetServerSidePropsContext,
} from 'next-redux-wrapper';
//import { composeWithDevTools } from 'redux-devtools-extension'; // redux-toolkit 을 사용할 경우, 더 이상 사용하지 않음 - https://redux-toolkit.js.org/api/configureStore#devtools
import logger from 'redux-logger';

import common from '@/common/store/index';
import project1 from '@/project1/store/index';
import project2 from '@/project2/store/index';

/**
 * 각각의 reducer 를 하나로 합쳐준다.
 */
const reducer = combineReducers({
  common,
  //project1,
  project2,
});

/**
 * HYDRATE
 * https://github.com/kirill-konshin/next-redux-wrapper#state-reconciliation-during-hydration
 * https://github.com/vercel/next.js/blob/canary/examples/with-redux-wrapper/store/store.js
 */
const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      // use previous state
      ...state,
      // Server Side에서 생성한 State를 Client Side State에 주입
      ...action.payload,
      // next에서 store에 서버에서 발생된 데이터를 주입 완료 하였는지 판단하기 위함
      /*next: {
        isHydrate: true,
      },*/
    };
    return nextState;
  } else {
    return reducer(state, action);
  }
};

/**
 * Redux Toolkit, Redux Persist
 * https://github.com/kirill-konshin/next-redux-wrapper#usage-with-redux-persist
 * https://github.com/fazlulkarimweb/with-next-redux-wrapper-redux-persist
 * https://blog.openreplay.com/state-management-in-next-js-with-redux-toolkit/
 *
 * Redux Persist 관련 'src/pages/_app.tsx' 에 <PersistGate /> 설정 필요!
 */
const makeConfiguredStore = (reducer: any) => {
  // createStore deprecated -> redux/toolkit의 configureStore 사용 추천
  return configureStore({
    devTools: true,
    reducer,
    middleware: getDefaultMiddleware =>
      // 기본 미들웨어 설정
      // 공식문서: https://redux-toolkit.js.org/api/getDefaultMiddleware
      // immutableCheck, serializableCheck 는 개발을 돕는 도구로, true로 설정하여도 production에서는 활성화 되지 않는다.
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
        //serializableCheck: true,
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        // 추가 미들웨어 설정
        .concat([logger]),
  });
};
//const makeStore = (context: Context) => makeConfiguredStore(rootReducer);
const makeStore: MakeStore<any> = (context: Context) => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return makeConfiguredStore(rootReducer);
  } else {
    const persistedReducer = persistReducer(
      {
        key: 'root',
        version: 1,
        storage,
        whitelist: ['common'], // reducer 중 스토리지에 저장할 것
        blacklist: [], // reducer 중 스토리지 저장에 제외할 것
      },
      rootReducer,
    );
    const store = makeConfiguredStore(persistedReducer);
    store.__persistor = persistStore(store); // Nasty hack
    return store;
  }
};
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

/**
 * next-redux-wrapper
 * 각각 페이지의 getServerSideProps 에서 공통적으로 실행될 로직이 있는 경우 아래 함수 내부에 추가
 * https://github.com/kirill-konshin/next-redux-wrapper#redux-toolkit
 */
const createWrapperWithCommonLogic = () => {
  // Next.js는 유저가 요청할때마다 redux store를 새로 생성
  const wrapper = createWrapper<AppStore>(makeStore, {
    // 디버그 로깅 사용여부
    // https://github.com/kirill-konshin/next-redux-wrapper#configuration
    debug: false,
    serializeState: state => JSON.stringify(state),
    deserializeState: state => JSON.parse(state),
  });

  /**
   * getServerSideProps 공통 로직
   */
  const getServerSideProps = <P extends any, Strict extends boolean = false>(
    callback: _GetServersidePropsCallback<AppStore, P, Strict>,
  ) => {
    return wrapper.getServerSideProps(store => async _context => {
      // 각 pages 하위 getServerSideProps 함수 파라미터로 주입될 'context' 값 재생산
      const context: GetServerSidePropsContext<AppStore> = {
        ..._context,
        store,
        //apiManager: await createApiManagerServerSide({ ..._context, store }), // 예: axios 공통 인스턴스
      };
      const { req, res } = context;

      // 토큰 만료여부 확인 및 갱신 (동기적으로 실행)
      // 서버단 : 토큰 만료 여유시간(약 10분전)을 두고 갱신 필요 (클라이언트에서 동시성으로 여러 콜이 발생했을 때, 갱신이 일어나지 않도록 서버사이드에서 만료여부 확인하여 방어)
      // 클라이언트단 : axios 등 data 패칭 라이브러리 인터샙터 기능 내 토큰만료시 갱신 후 fetch 가 일어나도록 함
      // ...

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
