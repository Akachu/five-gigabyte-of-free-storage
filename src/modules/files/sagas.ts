import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { ItemsAction } from "./types";
import { GET_FILE_LIST } from "./actions";

function* fetchItemsList(action: ItemsAction) {
	try {
		action.payload
		yield put({type: GET_FILE_LIST})
	} 
}

function* itemsSaga() {
	yield takeLatest(GET_FILE_LIST, fetchItemsList);
}