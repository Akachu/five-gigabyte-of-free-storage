import { createAction } from 'typesafe-actions';
import { storage } from 'firebase';

export const SET_SELECTED_REF = 'selectedFile/SET_FILE';

export const setSelectedRef = createAction(
  SET_SELECTED_REF,
)<storage.Reference | null>();
