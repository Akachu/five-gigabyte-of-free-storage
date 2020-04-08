import { createReducer } from 'typesafe-actions';
import { FileUploadAction } from './types';
import { FileUploadState } from './interface';
import { REQUEST_FILE_UPLOAD, COMPLETE_FILE_UPLOAD } from './actions';

const initialState: FileUploadState = {
  uploading: [],
  completed: [],
};

const fileUpload = createReducer<FileUploadState, FileUploadAction>(
  initialState,
  {
    [REQUEST_FILE_UPLOAD]: (state, action) => {
      const { uploading, completed } = state;
      const { ref, file } = action.payload;
      const key = `${ref.fullPath}/${file.name}_${Date.now()}`;

      const newUploading = [
        ...uploading,
        {
          ...action.payload,
          key,
        },
      ];

      return {
        completed,
        uploading: newUploading,
      };
    },
    [COMPLETE_FILE_UPLOAD]: (state, action) => {
      const { uploading, completed } = state;
      const key = action.payload;

      let index = -1;

      uploading.some((info, i) => {
        if (info.key === key) {
          index = i;
          return true;
        } else {
          return false;
        }
      });

      if (index === -1) return state;

      completed.push(uploading[index]);
      uploading.splice(index, 1);

      return {
        uploading,
        completed,
      };
    },
  },
);

export default fileUpload;
