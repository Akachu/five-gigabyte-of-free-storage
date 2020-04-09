import { createReducer } from 'typesafe-actions';
import { FileManagerAction } from './types';
import { FileManagerState } from './interface';
import {
  REQUEST_FILE_UPLOAD,
  REQUEST_FILE_DOWNLOAD,
  COMPLETE_FILE_REQUEST,
} from './actions';

const initialState: FileManagerState = {
  requests: [],
};

const fileManage = createReducer<FileManagerState, FileManagerAction>(
  initialState,
  {
    [REQUEST_FILE_UPLOAD]: (state, action) => {
      const { requests } = state;
      const newRequest = [...requests, action.payload];

      return {
        ...state,
        requests: newRequest,
      };
    },
    [REQUEST_FILE_DOWNLOAD]: (state, action) => {
      const { requests } = state;
      const newRequest = [...requests, action.payload];

      return {
        ...state,
        requests: newRequest,
      };
    },
    [COMPLETE_FILE_REQUEST]: (state, action) => {
      const { key } = action.payload;
      const { requests } = state;

      const index = requests.findIndex((info) => info.key === key);

      if (index !== -1) {
        requests[index].completed = true;
      }

      return {
        requests,
      };
    },
  },
);

export default fileManage;
