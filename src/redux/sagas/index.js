import {all} from 'redux-saga/effects';
import {moveListSagas} from "./movielist";

export default function* rootSaga() {
    yield all([...moveListSagas]);
}