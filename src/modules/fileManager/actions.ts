import { createAction } from 'typesafe-actions';
import { FileRequestInfo, ReqeustCompleteInfo } from './interface';

export const REQUEST_FILE_UPLOAD = 'fireManager/REQUEST_FILE_UPLOAD';
export const REQUEST_FILE_DOWNLOAD = 'fireManager/REQUEST_FILE_DOWNLOAD';
export const COMPLETE_FILE_REQUEST = 'fireManager/COMPLETE_FILE_REQUEST';

export const requestFileUpload = createAction(REQUEST_FILE_UPLOAD)<FileRequestInfo>();
export const requestFileDownload = createAction(REQUEST_FILE_DOWNLOAD)<FileRequestInfo>();
export const completeFileRequest = createAction(COMPLETE_FILE_REQUEST)<ReqeustCompleteInfo>();
