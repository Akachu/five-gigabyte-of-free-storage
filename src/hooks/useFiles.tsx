import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { storage } from 'firebase';
import { RootState } from '../modules';
import { requestFileList } from '../modules/files';

export default function useItemList() {
  const fileList = useSelector((state: RootState) => state.files.fileList);
  const folderList = useSelector((state: RootState) => state.files.folderList);
  const isLoading = useSelector((state: RootState) => state.files.loading);
  const ref = useSelector((state: RootState) => state.files.ref);
  const dispatch = useDispatch();

  const setRef = useCallback(
    (newRef: storage.Reference) => dispatch(requestFileList(newRef)),
    [dispatch],
  );

  return { folderList, fileList, ref, setRef, isLoading };
}
