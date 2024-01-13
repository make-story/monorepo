import { combineReducers } from '@reduxjs/toolkit';

import common from '@/common/store/index';
import project1 from '@/project1/store/index';
import project2 from '@/project2/store/index';

/**
 * 각각의 reducer 를 하나로 합쳐준다.
 */
export const reducer = combineReducers({
  common,
  //project1,
  project2,
});

export const persistReducerList = {
  whitelist: ['common'],
  blacklist: [],
};
