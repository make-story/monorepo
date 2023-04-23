import { AnyAction } from '@reduxjs/toolkit';
import produce from 'immer';

import { displayActionType, displayActionCreator } from './action';

// 타입
interface IState {
  data: any;
}

// 초기 상태 값
export const initialState = {
  data: [],
};

// 리듀서 함수 - combineReducers 에 등록
export default function reducer(state: IState = initialState, action: AnyAction) {
  const { type, payload, meta } = action;

  switch (type) {
    // 테스트
    case displayActionType.FETCH_DISPLAY_SUCCESS:
      console.log('display > reducer > FETCH_DISPLAY_SUCCESS', action);
      return produce(state, (draft: { data: any }) => {
        draft.data = payload;
      });
    case displayActionType.FETCH_DISPLAY_FAILURE:
      console.log('display > reducer > FETCH_DISPLAY_SUCCESS', action);
      return state;

    default:
      return state;
  }
}
