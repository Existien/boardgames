import { all } from "redux-saga/effects";
import { fetchCollectionSaga } from "./fetchCollectionSaga";

export default function* rootSaga() {
  yield all([fetchCollectionSaga()]);
}
