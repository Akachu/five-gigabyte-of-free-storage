import { combineReducers } from "redux";
import items from "./files";

const rootReducer = combineReducers({
  items
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
