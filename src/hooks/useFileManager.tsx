import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { storage } from 'firebase';
import { RootState } from '../modules';
import {
  requestFileUpload,
  completeFileRequest,
  FileRequestType,
  requestFileDownload,
} from '../modules/fileManager';
import { refreshFileList } from '../modules/files';

export function useFileManager() {
  const requests = useSelector(
    (state: RootState) => state.fileManager.requests,
  );

  const dispatch = useDispatch();

  const getKey = () => {
    const arr = new Uint32Array(1);
    return `${Date.now()}-${window.crypto.getRandomValues(arr)}`;
  };

  const downloadFile = useCallback(
    (ref: storage.Reference) =>
      dispatch(
        requestFileDownload({
          ref,
          key: `d_${getKey()}`,
          time: new Date(),
          type: FileRequestType.DOWNLOAD,
          completed: false,
        }),
      ),
    [dispatch],
  );

  const uploadFile = useCallback(
    (ref: storage.Reference, file: File) =>
      dispatch(
        requestFileUpload({
          ref,
          key: `u_${getKey()}`,
          file,
          time: new Date(),
          type: FileRequestType.UPLOAD,
          completed: false,
        }),
      ),
    [dispatch],
  );

  const completeRequst = useCallback(
    (key: string, type: FileRequestType) => {
      dispatch(completeFileRequest({ key, type }));
      dispatch(refreshFileList());
    },
    [dispatch],
  );

  return {
    uploadFile,
    downloadFile,
    completeRequst,
    requests,
  };
}
