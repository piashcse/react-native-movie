import {takeEvery, call, put} from 'redux-saga/effects';
import AxiosService from '../../../networks/AxiosService';
import {ApiUrls} from '../../../networks/ApiUrls';
import {getMovieList, movieListSuccess, movieListFailure} from './../../reducer/movielist'
import {movieDetailSuccess, movieDetailFailure, getMovieDetail} from './../../reducer/moviedetail'
import {getPopularMovie, popularMovieSuccess, popularMovieFailure} from './../../reducer/popularmovie'
import {getTopRatedMovie, topRatedMovieSuccess, topRatedMovieFailure} from './../../reducer/toprated'
import {getUpComingMovie, upcomingMovieSuccess, upComingMovieFailure} from './../../reducer/upcoming'
import {getSimilarMovie, similarMovieSuccess, similarMovieFailure} from './../../reducer/similarmovie'

function* movieListApi(action) {
    try {
        const response = yield call(AxiosService.getServiceData, ApiUrls.MOVIE_LIST, action.payload.page);
        const result = response.data;
        yield put(movieListSuccess(result));
    } catch (error) {
        yield put(movieListFailure());
    }
}

function* popularMovieListApi(action) {
    try {
        const response = yield call(AxiosService.getServiceData, ApiUrls.POPULAR_MOVIE_LIST, action.payload.page);
        const result = response.data;
        yield put(popularMovieSuccess(result));
    } catch (error) {
        yield put(popularMovieFailure());
    }
}

function* topRatedMovieListApi(action) {
    try {
        const response = yield call(AxiosService.getServiceData, ApiUrls.TOP_RATED_MOVIE_LIST, action.payload.movieId);
        const result = response.data;
        yield put(topRatedMovieSuccess(result));
    } catch (error) {
        yield put(topRatedMovieFailure());
    }
}

function* upComingMovieListApi(action) {
    try {
        const response = yield call(AxiosService.getServiceData, ApiUrls.UP_COMING_MOVIE_LIST, action.payload.movieId);
        const result = response.data;
        yield put(upcomingMovieSuccess(result));
    } catch (error) {
        yield put(upComingMovieFailure());
    }
}

function* movieDetailApi(action) {
    try {
        const response = yield call(AxiosService.getServiceData, ApiUrls.MOVIE_DETAIL(action.payload.movieId), {});
        const result = response.data;
        yield put(movieDetailSuccess(result));
    } catch (error) {
        yield put(movieDetailFailure());
    }
}

function* similarMovieApi(action) {
    try {
        const response = yield call(AxiosService.getServiceData, ApiUrls.SIMILAR_MOVIE(action.payload.movieId));
        const result = response.data;
        yield put(similarMovieSuccess(result));
    } catch (error) {
        yield put(similarMovieFailure());
    }
}

const combineSagas = [takeEvery(getMovieList.type, movieListApi), takeEvery(getPopularMovie.type, popularMovieListApi), takeEvery(getTopRatedMovie.type, topRatedMovieListApi), takeEvery(getUpComingMovie.type, upComingMovieListApi), takeEvery(getMovieDetail.type, movieDetailApi), takeEvery(getSimilarMovie.type, similarMovieApi)];
export default combineSagas