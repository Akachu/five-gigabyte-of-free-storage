import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export  type ItemsAction = ActionType<typeof actions>;

export  interface ItemsState {
  list: Array<number>;
}
