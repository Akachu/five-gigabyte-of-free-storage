import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { storage } from 'firebase';
import { RootState } from '../modules';
import { setSelectedRef as setRef } from '../modules/selectedRef';

export function useSelectedRef() {
  const selectedRef = useSelector((state: RootState) => state.selectedRef.ref);
  const dispatch = useDispatch();

  const setSelectedRef = useCallback(
    (newRef: storage.Reference | null) => dispatch(setRef(newRef)),
    [dispatch],
  );

  return { selectedRef, setSelectedRef };
}
