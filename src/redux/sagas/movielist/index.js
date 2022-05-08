import {takeEvery, call, put} from 'redux-saga/effects';
import AxiosService from '../../../networks/AxiosService';
import {ApiUrls} from '../../../networks/ApiUrls';
import {MOVIE_LIST, POPULAR_MOVIE_LIST, TOP_RATED_MOVIE_LIST, UP_COMING_MOVIE_LIST} from "../../constants";

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
        const response = yield call(AxiosService.getServiceData, ApiUrls.POPULAR_MOVIE_LIST, action.requestBody,);
        const result = response.data;
        yield put({type: POPULAR_MOVIE_LIST.POPULAR_MOVIE_LIST_SUCCESS, result});
    } catch (error) {
        yield put({type: POPULAR_MOVIE_LIST.POPULAR_MOVIE_LIST_FAILURE});
    }
}

function* topRatedMovieListApi(action) {
    try {
        const response = yield call(AxiosService.getServiceData, ApiUrls.TOP_RATED_MOVIE_LIST, action.requestBody,);
        const result = response.data;
        yield put({type: TOP_RATED_MOVIE_LIST.TOP_RATED_MOVIE_LIST_SUCCESS, result});
    } catch (error) {
        yield put({type: TOP_RATED_MOVIE_LIST.TOP_RATED_MOVIE_LIST_FAILURE});
    }
}

function* upComingMovieListApi(action) {
    try {
        const response = yield call(AxiosService.getServiceData, ApiUrls.UP_COMING_MOVIE_LIST, action.requestBody,);
        const result = response.data;
        yield put({type: UP_COMING_MOVIE_LIST.UP_COMING_MOVIE_LIST_SUCCESS, result});
    } catch (error) {
        yield put({type: UP_COMING_MOVIE_LIST.UP_COMING_MOVIE_LIST_FAILURE});
    }
}
const moveListSagas = [takeEvery(MOVIE_LIST.MOVIE_LIST_START, movieListApi), takeEvery(POPULAR_MOVIE_LIST.POPULAR_MOVIE_LIST_START, popularMovieListApi), takeEvery(TOP_RATED_MOVIE_LIST.TOP_RATED_MOVIE_LIST_START, topRatedMovieListApi), takeEvery(UP_COMING_MOVIE_LIST.UP_COMING_MOVIE_LIST_START, upComingMovieListApi)];
export default moveListSagas