import { combineReducers } from "redux";
import { files, filesSaga } from "./files";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  files,
});

export function* rootSaga() {
  yield all([filesSaga()]);
}

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
