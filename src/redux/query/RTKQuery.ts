import { createApi } from '@reduxjs/toolkit/query/react';
import { MovieResult } from '../../types/MovieResult.ts';
import { MovieItem } from '../../types/MovieItem.ts';
import { MovieDetail } from '../../types/MovieDetail.ts';
import { CastAndCrew } from '../../types/ArtistAndCrew.ts';
import { ArtistDetail } from '../../types/ArtistDetail.ts';
import { TvSeriesResult } from '../../types/TvSeriesResult.ts';
import { TvSeriesItem } from '../../types/TvSeriesItem.ts';
import { TvSeriesDetail } from '../../types/TvSeriesDetail.ts';
import {
  SearchData,
  SearchParams,
} from '../../components/search/DynamicSearch.tsx';
import baseQuery from './BaseQuery.ts';
import { Pagination } from '../../types/ApiRequest/ApiRequest.ts';
import { Celebrity, CelebrityItem } from '../../types/Celebrity.ts';

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    nowPlayingMovie: builder.query<MovieItem[], Pagination>({
      query: (params: Pagination) => ({
        url: 'movie/now_playing',
        params,
      }),
      transformResponse: (response: MovieResult) => response.results,
    }),
    popularMovie: builder.query<MovieItem[], Pagination>({
      query: (params: Pagination) => ({
        url: 'movie/popular',
        params,
      }),
      transformResponse: (response: MovieResult) => response.results,
    }),
    topRatedMovie: builder.query<MovieItem[], Pagination>({
      query: (params: Pagination) => ({
        url: 'movie/top_rated',
        params,
      }),
      transformResponse: (response: MovieResult) => response.results,
    }),
    upcomingMovie: builder.query<MovieItem[], Pagination>({
      query: (params: Pagination) => ({
        url: 'movie/upcoming',
        params,
      }),
      transformResponse: (response: MovieResult) => response.results,
    }),
    movieDetail: builder.query<MovieDetail, number>({
      query: (movieId: number) => ({
        url: `movie/${movieId}`,
      }),
    }),
    similarMovie: builder.query<MovieItem[], number>({
      query: (movieId: number) => ({
        url: `movie/${movieId}/recommendations`,
      }),
      transformResponse: (response: MovieResult) => response.results,
    }),
    artistAndCrew: builder.query<CastAndCrew, number>({
      query: (movieId: number) => ({
        url: `movie/${movieId}/credits`,
      }),
    }),
    artistDetail: builder.query<ArtistDetail, number>({
      query: (personId: number) => ({
        url: `person/${personId}`,
      }),
    }),

    // TV Series
    airingTodayTvSeries: builder.query<TvSeriesItem[], Pagination>({
      query: (params: Pagination) => ({
        url: 'tv/airing_today',
        params,
      }),
      transformResponse: (response: TvSeriesResult) => response.results,
    }),
    onTheAirTvSeries: builder.query<TvSeriesItem[], Pagination>({
      query: (params: Pagination) => ({
        url: 'tv/on_the_air',
        params,
      }),
      transformResponse: (response: TvSeriesResult) => response.results,
    }),
    popularTvSeries: builder.query<TvSeriesItem[], Pagination>({
      query: (params: Pagination) => ({
        url: 'tv/popular',
        params,
      }),
      transformResponse: (response: TvSeriesResult) => response.results,
    }),
    topRatedTvSeries: builder.query<TvSeriesItem[], Pagination>({
      query: (params: Pagination) => ({
        url: 'tv/top_rated',
        params,
      }),
      transformResponse: (response: TvSeriesResult) => response.results,
    }),
    tvSeriesDetail: builder.query<TvSeriesDetail, number>({
      query: (tvSeriesId: number) => ({
        url: `tv/${tvSeriesId}`,
      }),
    }),
    recommendedTvSeries: builder.query<TvSeriesItem[], number>({
      query: (tvSeriesId: number) => ({
        url: `tv/${tvSeriesId}/recommendations`,
      }),
      transformResponse: (response: TvSeriesResult) => response.results,
    }),
    tvSeriesArtistAndCrew: builder.query<CastAndCrew, number>({
      query: (tvSeriesId: number) => ({
        url: `tv/${tvSeriesId}/credits`,
      }),
    }),

    // Search
    searchMovieTvSeries: builder.query<SearchData[], SearchParams>({
      query: ({ isMovie, query }) => ({
        url: `search/${isMovie ? 'movie' : 'tv'}`,
        params: { query },
      }),
      transformResponse: (response: MovieResult) =>
        response.results as SearchData[],
    }),
    popularCelebrity: builder.query<CelebrityItem[], Pagination>({
      query: (params: Pagination) => ({
        url: `person/popular`,
        params,
      }),
      transformResponse: (response: Celebrity) => response.results,
    }),
    trendingCelebrity: builder.query<CelebrityItem[], Pagination>({
      query: (params: Pagination) => ({
        url: `trending/person/week`,
        params,
      }),
      transformResponse: (response: Celebrity) => response.results,
    }),
  }),
});

export const {
  useLazyNowPlayingMovieQuery,
  useLazyPopularMovieQuery,
  useLazyTopRatedMovieQuery,
  useLazyUpcomingMovieQuery,
  useMovieDetailQuery,
  useSimilarMovieQuery,
  useArtistAndCrewQuery,
  useArtistDetailQuery,
  useLazyAiringTodayTvSeriesQuery,
  useLazyOnTheAirTvSeriesQuery,
  useLazyPopularTvSeriesQuery,
  useLazyTopRatedTvSeriesQuery,
  useRecommendedTvSeriesQuery,
  useTvSeriesArtistAndCrewQuery,
  useTvSeriesDetailQuery,
  useSearchMovieTvSeriesQuery,
  useLazyPopularCelebrityQuery,
  useLazyTrendingCelebrityQuery,
} = movieApi;
