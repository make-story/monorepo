import { combineReducers } from '@reduxjs/toolkit';

import testSlice from './test/testSlice';

export default combineReducers({
  test: testSlice,
});
