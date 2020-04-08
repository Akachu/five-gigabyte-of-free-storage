import { storage } from 'firebase';

export interface FilesState {
  ref?: storage.Reference;
  loading: boolean;
  folderList?: storage.Reference[];
  fileList?: FileInfo[];
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
