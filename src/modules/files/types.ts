import { storage } from "firebase";
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type FilesAction = ActionType<typeof actions>;

export interface FilesState {
  ref: storage.Reference;
  folderList: Array<storage.Reference>;
  fileList: Array<storage.Reference>;
}
