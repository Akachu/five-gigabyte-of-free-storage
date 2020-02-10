import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { files, filesSaga } from './files';

const rootReducer = combineReducers({
  files,
});

export function* rootSaga() {
  yield all([filesSaga()]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
