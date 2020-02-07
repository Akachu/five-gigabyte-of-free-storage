import { ItemsState, ItemsAction } from "./types";
import { createReducer } from "typesafe-actions";
import { GET_FILE_LIST } from "./actions";

const initialState: ItemsState = {
  list: []
};

const itemList = createReducer<ItemsState, ItemsAction>(initialState, {
  [GET_FILE_LIST]: (state, action) => ({ list: action.payload })
});

export default itemList;
