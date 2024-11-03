import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import logger from 'redux-logger';
import {
    airingTodayTvSeriesApi,
    artistAndCrewApi,
    artistDetailApi,
    movieDetailApi,
    nowPlayingMovieApi,
    onTheAirTvSeriesApi,
    popularMovieApi,
    popularTvSeriesApi,
    recommendedTvSeriesApi,
    searchMovieTvSeries,
    similarMovieApi,
    topRatedMovieApi,
    topRatedTvSeriesApi,
    tvSeriesArtistAndCrewApi,
    tvSeriesDetailApi,
    upcomingMovieApi
} from './query/RTKQuery.ts'
import {setupListeners} from "@reduxjs/toolkit/query";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const configurationAppStore = () => {
    const store = configureStore({
        reducer: {
            [nowPlayingMovieApi.reducerPath]: nowPlayingMovieApi.reducer,
            [popularMovieApi.reducerPath]: popularMovieApi.reducer,
            [topRatedMovieApi.reducerPath]: topRatedMovieApi.reducer,
            [upcomingMovieApi.reducerPath]: upcomingMovieApi.reducer,
            [movieDetailApi.reducerPath]: movieDetailApi.reducer,
            [similarMovieApi.reducerPath]: similarMovieApi.reducer,
            [artistAndCrewApi.reducerPath]: artistAndCrewApi.reducer,
            [artistDetailApi.reducerPath]: artistDetailApi.reducer,
            [airingTodayTvSeriesApi.reducerPath]: airingTodayTvSeriesApi.reducer,
            [onTheAirTvSeriesApi.reducerPath]: onTheAirTvSeriesApi.reducer,
            [popularTvSeriesApi.reducerPath]: popularTvSeriesApi.reducer,
            [topRatedTvSeriesApi.reducerPath]: topRatedTvSeriesApi.reducer,
            [tvSeriesDetailApi.reducerPath]: tvSeriesDetailApi.reducer,
            [recommendedTvSeriesApi.reducerPath]: recommendedTvSeriesApi.reducer,
            [tvSeriesArtistAndCrewApi.reducerPath]: tvSeriesArtistAndCrewApi.reducer,
            [searchMovieTvSeries.reducerPath]: searchMovieTvSeries.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([...middleware, logger,
            nowPlayingMovieApi.middleware,
            popularMovieApi.middleware,
            topRatedMovieApi.middleware,
            upcomingMovieApi.middleware,
            movieDetailApi.middleware,
            similarMovieApi.middleware,
            artistAndCrewApi.middleware,
            artistDetailApi.middleware,
            airingTodayTvSeriesApi.middleware,
            onTheAirTvSeriesApi.middleware,
            popularTvSeriesApi.middleware,
            topRatedTvSeriesApi.middleware,
            recommendedTvSeriesApi.middleware,
            tvSeriesDetailApi.middleware,
            tvSeriesArtistAndCrewApi.middleware,
            searchMovieTvSeries.middleware,
        ]),
        devTools: process.env.NODE_ENV === 'development'
    })
    setupListeners(store.dispatch)
    sagaMiddleware.run(rootSaga);
    return store
}
export default configurationAppStore


