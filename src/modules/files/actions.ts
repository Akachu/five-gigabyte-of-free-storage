import { createAction } from 'typesafe-actions';
import { storage } from 'firebase';
import { FilesState } from './types';

export const REQUEST_FILE_LIST = 'files/REQUEST_FILE_LIST';
export const SET_FILE_LIST = 'files/REQUEST_FILE_REST';

export const requestFileList = createAction(REQUEST_FILE_LIST)<
  storage.Reference
>();

export const setFileList = createAction(SET_FILE_LIST)<FilesState>();
