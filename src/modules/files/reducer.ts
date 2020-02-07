import { FilesState, FilesAction } from "./types";
import { createReducer } from "typesafe-actions";
import { 
  // REQUEST_FILE_LIST, 
  SET_FILE_LIST 
} from "./actions";
import { storage } from "firebase";

const initialState: FilesState = {
  ref: storage().ref(),
  folderList: [],
  fileList: []
};

const itemList = createReducer<FilesState, FilesAction>(initialState, {
  // [REQUEST_FILE_LIST]: (state, action) => ({
  //   ref: state.ref,
  //   folderList: state.folderList,
  //   fileList: state.fileList
  // }),
  [SET_FILE_LIST]: (state, action) => action.payload
});

export default itemList;
