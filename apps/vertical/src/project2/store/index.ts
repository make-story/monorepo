import { combineReducers } from '@reduxjs/toolkit';

import displaySlice from './display/displaySlice';

export default combineReducers({
  display: displaySlice,
});
