import { all } from 'redux-saga/effects';
import { watchTestSaga } from '@ysm/common/sagas/test/saga';

import { watchDisplaySaga } from './project/sagas/display/saga';

function* rootSaga() {
  yield all([
    // common
    watchTestSaga,
    // display
    watchDisplaySaga(),
  ]);
}

export default rootSaga;
