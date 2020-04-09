import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type FileManagerAction = ActionType<typeof actions>;
