import { storage } from 'firebase';

export interface FileUploadState {
  uploading: FileUploadInfo[];
  completed: FileUploadInfo[];
}

export interface FileUploadInfo {
  key?: string;
  ref: storage.Reference;
  file: File;
}
