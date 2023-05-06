import {all} from 'redux-saga/effects';
import combineSagas from "./movielist";

export default function* rootSaga() {
    yield all([...combineSagas]);
}