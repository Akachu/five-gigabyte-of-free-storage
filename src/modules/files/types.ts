import { storage } from 'firebase';
import { ActionType } from 'typesafe-actions';

export type FilesAction = ActionType<typeof import('./actions')>;

export interface FilesState {
  ref: storage.Reference;
  loading: boolean;
  folderList: Array<storage.Reference>;
  fileList: Array<FileInfo>;
}

export interface FileInfo {
  ref: storage.Reference;
  name: string;
  type: FileType;
  createdAt: Date;
  updatedAt: Date;
  size: number;
}

enum FileType {}
