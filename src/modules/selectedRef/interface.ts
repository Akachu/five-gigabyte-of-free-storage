import { storage } from "firebase";

export interface SelectedRefState {
  ref: storage.Reference | null;
}