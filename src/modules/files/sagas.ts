import { 
  call, 
  put, 
  // delay, 
  takeLatest, 
  // cancelled 
} from "redux-saga/effects";
import { REQUEST_FILE_LIST, requestFileList, setFileList } from "./actions";
import { storage } from "firebase";

function* fetchFileList(action: ReturnType<typeof requestFileList>) {
  const payload: storage.Reference = action.payload;
  try {
    // yield delay(1200);
    const result: storage.ListResult = yield call(() => payload.list());
    const folderList = result.prefixes;
    const fileList = result.items;
    console.log(folderList, fileList);
    yield put(setFileList({ ref: payload, folderList, fileList }));
  } catch (err) {
    console.error(err);
  } finally {
  }
}

export default function* watcher() {
  yield takeLatest(REQUEST_FILE_LIST, fetchFileList);
}
