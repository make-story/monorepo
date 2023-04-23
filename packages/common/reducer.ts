import { combineReducers, AnyAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// common
import loading from './stores/loading/reducer';
import test from './stores/test/reducer';

const reducers = combineReducers({
  loading,
  test,
});

export type TRootStateCommon = ReturnType<typeof reducers>;
