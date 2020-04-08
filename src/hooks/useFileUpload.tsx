import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { storage } from 'firebase';
import { RootState } from '../modules';
import { requestFileUpload, completeFileUpload } from '../modules/fileUpload';
import { refreshFileList } from '../modules/files';

export function useFileUpload() {
  const uploading = useSelector(
    (state: RootState) => state.fileUpload.uploading,
  );

  const completed = useSelector(
    (state: RootState) => state.fileUpload.completed,
  );

  const dispatch = useDispatch();

  const uploadFile = useCallback(
    (ref: storage.Reference, file: File) => {
      return dispatch(
        requestFileUpload({
          ref,
          file,
        }),
      );
    },
    [dispatch],
  );

  const completeUploadFile = useCallback(
    (key: string) => {
      dispatch(completeFileUpload(key));
      dispatch(refreshFileList());
    },
    [dispatch],
  );

  return { uploadFile, completeUploadFile, uploading, completed };
}
