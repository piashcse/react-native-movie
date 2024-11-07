import { configureStore } from '@reduxjs/toolkit';
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
  searchMovieTvSeriesApi,
  similarMovieApi,
  topRatedMovieApi,
  topRatedTvSeriesApi,
  tvSeriesArtistAndCrewApi,
  tvSeriesDetailApi,
  upcomingMovieApi,
} from './query/RTKQuery.ts';
import { setupListeners } from '@reduxjs/toolkit/query';

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
      [searchMovieTvSeriesApi.reducerPath]: searchMovieTvSeriesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        logger,
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
        searchMovieTvSeriesApi.middleware,
      ]),
    devTools: process.env.NODE_ENV === 'development',
  });
  setupListeners(store.dispatch);
  return store;
};
export default configurationAppStore;
