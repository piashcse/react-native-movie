import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import logger from 'redux-logger';
import {
    artistAndCrewApi,
    artistDetailApi,
    movieDetailApi,
    nowPlayingMovieApi,
    popularMovieApi,
    similarMovieApi,
    topRatedMovieApi,
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
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([...middleware, logger,
            nowPlayingMovieApi.middleware,
            popularMovieApi.middleware,
            topRatedMovieApi.middleware,
            upcomingMovieApi.middleware,
            movieDetailApi.middleware,
            similarMovieApi.middleware,
            artistAndCrewApi.middleware,
            artistDetailApi.middleware
        ]),
        devTools: process.env.NODE_ENV === 'development'
    })
    setupListeners(store.dispatch)
    sagaMiddleware.run(rootSaga);
    return store
}
export default configurationAppStore


