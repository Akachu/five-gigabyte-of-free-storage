import { storage } from 'firebase';

export interface FileManagerState {
  requests: FileRequestInfo[];
}

export enum FileRequestType {
  DOWNLOAD,
  UPLOAD,
}

export interface FileRequestInfo {
  type: FileRequestType;
  key: string;
  ref: storage.Reference;
  time: Date;
  file?: File;
  completed: boolean;
}

export interface ReqeustCompleteInfo {
  type: FileRequestType;
  key: string;
}
