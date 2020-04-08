import { storage } from 'firebase';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {
  REQUEST_FILE_LIST,
  requestFileList,
  setFileList,
  REFRESH_FILE_LIST,
} from './actions';
import { FileInfo } from './interface';

async function fetchFileMetadata(fileList: Array<storage.Reference>) {
  const promiseList = fileList.map((file) => file.getMetadata());

  const metadataList: Array<any> = await Promise.all(promiseList);

  const fileDataList: Array<FileInfo> = metadataList.map((row) => ({
    ref: row.ref,
    name: row.name,
    type: row.contentType,
    createdAt: new Date(row.timeCreated),
    updatedAt: new Date(row.updated),
    size: row.size,
  }));

  return fileDataList;
}

function* fetchFileList(action: ReturnType<typeof requestFileList>) {
  const { payload } = action;

  try {
    yield put(showLoading());
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
    yield put(hideLoading());
  }
}

function* refreshFileList() {
  const getRef = (state: any) => state.files.ref;

  try {
    const ref: storage.Reference = yield select(getRef);
    yield put(requestFileList(ref));
  } catch (err) {
    console.error(err);
  }
}

export default function* watcher() {
  yield takeLatest(REQUEST_FILE_LIST, fetchFileList);
  yield takeLatest(REFRESH_FILE_LIST, refreshFileList);
}
