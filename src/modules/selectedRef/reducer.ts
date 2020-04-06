import { createReducer } from 'typesafe-actions';
import { SelectedRefAction } from './types';
import { SelectedRefState } from './interface';
import { SET_SELECTED_REF } from './actions';

const initialState: SelectedRefState = {
  ref: null,
};

const itemList = createReducer<SelectedRefState, SelectedRefAction>(
  initialState,
  {
    [SET_SELECTED_REF]: (state, action) => ({
      ref: action.payload,
    }),
  },
);

export default itemList;
