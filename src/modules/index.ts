import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { loadingBarReducer } from 'react-redux-loading-bar';
import { files, filesSaga } from './files';
import { fileUpload } from './fileUpload';
import { selectedRef } from './selectedRef';

const rootReducer = combineReducers({
  files,
  fileUpload,
  selectedRef,
  loadingBar: loadingBarReducer,
});

export function* rootSaga() {
  yield all([filesSaga()]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
