import { createAction } from "typesafe-actions";

export const UPLOAD_FILE = "files/UPLOAD_FILE";
export const DELETE_FILE = "files/DELETE_FILE";
export const RENAME_FILE = "files/RENAME_FILE";
export const GET_FILE_LIST = "files/GET_FILE_LIST";

export const getFileList = createAction(GET_FILE_LIST)<Array<number>>();
