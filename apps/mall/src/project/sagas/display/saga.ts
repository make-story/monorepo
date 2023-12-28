/*
-
FSA(Flux Standard Action)
https://github.com/redux-utilities/flux-standard-action

객체는 액션을 구분할 고유한 문자열을 가진 `type` 필드가 반드시 있으며,
`payload` 필드에 데이터를 담아 전달한다.
그 외에 `meta`, `error` 필드를 가질 수도 있다.
{
    type: ACTION_NAME,
    payload: 'createAction 활용할 경우, 두 번째 파라미터 함수 반환 값',
    meta: '사용자값',
    error: '사용자값',
}
*/
import { AnyAction } from '@reduxjs/toolkit';
import { call, delay, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  loadingActionType,
  loadingActionCreator,
} from '@ysm/common/stores/loading/action';
import {
  displayActionType,
  displayActionCreator,
} from 'src/project/stores/display/action';
import * as api from 'src/project/api/display/index';
import { IMainContentsNewOfTheMonth } from 'src/project/types/display/index';

// 이달의 신상 썸네일형
function* fetchDisplay(action: AnyAction) {
  const { type, payload, apiManager } = action;
  console.log('display > saga > fetchDisplay', action); // createAction 에서 넘어오는 값

  // 로딩 시작
  yield put(loadingActionCreator.startLoading(displayActionType.FETCH_DISPLAY));

  try {
    // call(비동기 실행함수, 함꼐 넘길 파라미터 값)
    const data: IMainContentsNewOfTheMonth = yield call(
      api.getMainContentsNewOfTheMonth,
      action.payload,
    );

    // 디스패치
    yield put({
      // createAction 활용해 생성된 액션함수 사용 없이 바로 호출!
      type: displayActionType.FETCH_DISPLAY_SUCCESS, // 액션 타입
      payload: data, // 응답 데이터 값
      meta: action.payload, // 호출정보
    });
  } catch (e) {
    // 디스패치
    yield put({
      // createAction 활용해 생성된 액션함수 사용 없이 바로 호출!
      type: displayActionType.FETCH_DISPLAY_FAILURE, // 액션 타입
      payload: e,
      error: true,
    });
  }

  // 로딩 끝
  yield put(
    loadingActionCreator.finishLoading(displayActionType.FETCH_DISPLAY),
  );
}

// Saga 미들웨어 - 액션타입 등록
export function* watchDisplaySaga() {
  yield takeLatest(displayActionType.FETCH_DISPLAY, fetchDisplay);
}
