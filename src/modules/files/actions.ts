import { createAction } from 'typesafe-actions';
import { storage } from 'firebase';
import { FilesState } from './interface';

export const REQUEST_FILE_LIST = 'files/REQUEST_FILE_LIST';
export const REFRESH_FILE_LIST = 'files/REFRESH_FILE_LIST';
export const SET_FILE_LIST = 'files/SET_FILE_LIST';

export const requestFileList = createAction(REQUEST_FILE_LIST)<storage.Reference>();
export const refreshFileList = createAction(REFRESH_FILE_LIST)();
export const setFileList = createAction(SET_FILE_LIST)<FilesState>();
