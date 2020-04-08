import { createReducer } from 'typesafe-actions';
import { FilesAction } from './types';
import { FilesState } from './interface';
import { REQUEST_FILE_LIST, SET_FILE_LIST } from './actions';

const initialState: FilesState = {
  loading: true,
};

const files = createReducer<FilesState, FilesAction>(initialState, {
  [REQUEST_FILE_LIST]: state => ({
    ...state,
    loading: true,
  }),
  [SET_FILE_LIST]: (state, action) => action.payload,
});

export default files;
