import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type FileUploadAction = ActionType<typeof actions>;
