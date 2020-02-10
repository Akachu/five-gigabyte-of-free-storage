import { createReducer } from 'typesafe-actions';
import { storage } from 'firebase';
import { FilesState, FilesAction } from './types';
import { REQUEST_FILE_LIST, SET_FILE_LIST } from './actions';

const initialState: FilesState = {
  loading: true,
  ref: storage().ref(),
  folderList: [],
  fileList: [],
};

const itemList = createReducer<FilesState, FilesAction>(initialState, {
  [REQUEST_FILE_LIST]: (state, action) => ({
    ...state,
    loading: true,
  }),
  [SET_FILE_LIST]: (state, action) => action.payload,
});

export default itemList;
