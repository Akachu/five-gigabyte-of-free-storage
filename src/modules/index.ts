import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { files, filesSaga } from './files';
import { loadingBarReducer } from 'react-redux-loading-bar';

const rootReducer = combineReducers({
  files,
  loadingBar: loadingBarReducer,
});

export function* rootSaga() {
  yield all([filesSaga()]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
