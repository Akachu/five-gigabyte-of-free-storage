import { createAction } from 'typesafe-actions';
import { FileUploadInfo } from './interface';

export const REQUEST_FILE_UPLOAD = 'fileUpload/REQUEST_FILE_UPLOAD';
export const COMPLETE_FILE_UPLOAD = 'fileUpload/COMPLETE_FILE_UPLOAD';

export const requestFileUpload = createAction(REQUEST_FILE_UPLOAD)<
  FileUploadInfo
>();
export const completeFileUpload = createAction(COMPLETE_FILE_UPLOAD)<string>();
