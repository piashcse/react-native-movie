import {takeEvery, call, put} from 'redux-saga/effects';
import AxiosService from '../../../networks/AxiosService';
import {ApiUrls} from '../../../networks/ApiUrls';
import {getMovieList, movieListSuccess, movieListFailure} from '../../reducer/movielist'
import {movieDetailSuccess, movieDetailFailure, getMovieDetail} from '../../reducer/moviedetail'
import {getPopularMovie, popularMovieSuccess, popularMovieFailure} from '../../reducer/popularmovie'
import {getTopRatedMovie, topRatedMovieSuccess, topRatedMovieFailure} from '../../reducer/toprated'
import {getUpComingMovie, upcomingMovieSuccess, upComingMovieFailure} from '../../reducer/upcoming'
import {getSimilarMovie, similarMovieSuccess, similarMovieFailure} from '../../reducer/similarmovie'
import {getArtist, artistSuccess, artistFailure} from '../../reducer/artist'
import {getArtistDetail, artistDetailSuccess, artistDetailFailure} from '../../reducer/artistdetail'

function* movieListApi(action: any) {
    try {
        console.log('>> List >> ', action);
        const response = yield call(AxiosService.getServiceData, ApiUrls.MOVIE_LIST, action.payload);
        const result = response.data;
        yield put(movieListSuccess(result));
    } catch (error) {
        yield put(movieListFailure());
    }
}

function* popularMovieListApi(action: any) {
    try {
        const response = yield call(AxiosService.getServiceData, ApiUrls.POPULAR_MOVIE_LIST, action.payload);
        const result = response.data;
        yield put(popularMovieSuccess(result));
    } catch (error) {
        yield put(popularMovieFailure());
    }
}

function* topRatedMovieListApi(action: any) {
    try {
        const response = yield call(AxiosService.getServiceData, ApiUrls.TOP_RATED_MOVIE_LIST, action.payload);
        const result = response.data;
        yield put(topRatedMovieSuccess(result));
    } catch (error) {
        yield put(topRatedMovieFailure());
    }
}

function* upComingMovieListApi(action: any) {
    try {
        const response = yield call(AxiosService.getServiceData, ApiUrls.UP_COMING_MOVIE_LIST, action.payload);
        const result = response.data;
        yield put(upcomingMovieSuccess(result));
    } catch (error) {
        yield put(upComingMovieFailure());
    }
}

function* movieDetailApi(action: any) {
    try {
        const response = yield call(AxiosService.getServiceData, ApiUrls.MOVIE_DETAIL(action.payload.movieId), {});
        const result = response.data;
        yield put(movieDetailSuccess(result));
    } catch (error) {
        yield put(movieDetailFailure());
    }
}

function* similarMovieApi(action: any) {
    try {
        const response = yield call(AxiosService.getServiceData, ApiUrls.SIMILAR_MOVIE(action.payload.movieId), {});
        const result = response.data;
        yield put(similarMovieSuccess(result));
    } catch (error) {
        yield put(similarMovieFailure());
    }
}

function* artistApi(action: any) {
    try {
        const response = yield call(AxiosService.getServiceData, ApiUrls.ARTIST(action.payload.movieId), {});
        const result = response.data;
        yield put(artistSuccess(result));
    } catch (error) {
        yield put(artistFailure());
    }
}

function* artistDetailApi(action: any) {
    try {
        const response = yield call(AxiosService.getServiceData, ApiUrls.ARTIST_DETAIL(action.payload.personId), {});
        const result = response.data;
        yield put(artistDetailSuccess(result));
    } catch (error) {
        yield put(artistDetailFailure());
    }
}

const combineSagas = [takeEvery(getMovieList.type, movieListApi), takeEvery(getPopularMovie.type, popularMovieListApi), takeEvery(getTopRatedMovie.type, topRatedMovieListApi), takeEvery(getUpComingMovie.type, upComingMovieListApi), takeEvery(getMovieDetail.type, movieDetailApi), takeEvery(getSimilarMovie.type, similarMovieApi), takeEvery(getArtist.type, artistApi), takeEvery(getArtistDetail.type, artistDetailApi)];
export default combineSagas
