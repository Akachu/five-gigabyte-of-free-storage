import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { storage } from 'firebase';
import { RootState } from '../modules';
import { requestFileList, refreshFileList } from '../modules/files';

export function useFiles() {
  const fileList = useSelector((state: RootState) => state.files.fileList);
  const folderList = useSelector((state: RootState) => state.files.folderList);
  const isLoading = useSelector((state: RootState) => state.files.loading);
  const ref = useSelector((state: RootState) => state.files.ref);
  const dispatch = useDispatch();
  const refresh = useCallback(() => dispatch(refreshFileList()), [dispatch]);

  const setRef = useCallback(
    (newRef: storage.Reference) => dispatch(requestFileList(newRef)),
    [dispatch],
  );

  return { folderList, fileList, refresh, ref, setRef, isLoading };
}
