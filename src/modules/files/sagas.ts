import { storage } from 'firebase';
import {
  call,
  put,
  // delay,
  takeLatest,
  // cancelled
} from 'redux-saga/effects';
import { REQUEST_FILE_LIST, requestFileList, setFileList } from './actions';
import { FileInfo } from './types';

async function fetchFileMetadata(fileList: Array<storage.Reference>) {
  const promiseList = fileList.map(file => file.getMetadata());

  const metadataList: Array<any> = await Promise.all(promiseList);

  const fileDataList: Array<FileInfo> = metadataList.map(row => ({
    ref: row.ref,
    name: row.name,
    type: row.contentType,
    createdAt: new Date(row.timeCreated),
    updatedAt: new Date(row.updated),
    size: row.size,
  }));

  console.log(fileDataList);

  return fileDataList;
}

function* fetchFileList(action: ReturnType<typeof requestFileList>) {
  const { payload } = action;

  try {
    const result: storage.ListResult = yield call(() => payload.list());
    const folderList = result.prefixes;
    const fileRefList = result.items;

    const fileList: Array<FileInfo> = yield fetchFileMetadata(fileRefList);

    yield put(
      setFileList({ ref: payload, folderList, fileList, loading: false }),
    );
  } catch (err) {
    console.error(err);
  } finally {
    // 
  }
}

export default function* watcher() {
  yield takeLatest(REQUEST_FILE_LIST, fetchFileList);
}
