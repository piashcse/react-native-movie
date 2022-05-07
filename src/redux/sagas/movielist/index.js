import {takeEvery, call, put} from 'redux-saga/effects';
import AxiosService from '../../../networks/AxiosService';
import {ApiUrls} from '../../../networks/ApiUrls';
import {MOVIE_LIST} from "../../constants";

function* movieListApi(action) {
    try {
        const response = yield call(AxiosService.getServiceData, ApiUrls.MOVIE_LIST, action.requestBody,);
        const result = response.data;
        yield put({type: MOVIE_LIST.MOVIE_LIST_SUCCESS, result});
    } catch (error) {
        yield put({type: MOVIE_LIST.MOVIE_LIST_FAILURE});
    }
}

function* popularMovieListApi(action) {
    try {
        const response = yield call(AxiosService.getServiceData, ApiUrls.MOVIE_LIST, action.requestBody,);
        const result = response.data;
        yield put({type: MOVIE_LIST.MOVIE_LIST_SUCCESS, result});
    } catch (error) {
        yield put({type: MOVIE_LIST.MOVIE_LIST_FAILURE});
    }
}

export const moveListSagas = [takeEvery(MOVIE_LIST.MOVIE_LIST_START, movieListApi)];