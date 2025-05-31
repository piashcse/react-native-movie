import { createApi } from '@reduxjs/toolkit/query/react';
import { MovieResult } from '../../types/response/MovieResult.ts';
import { MovieItem } from '../../types/response/MovieItem.ts';
import { MovieDetail } from '../../types/response/MovieDetail.ts';
import { Cast, CastAndCrew } from '../../types/response/ArtistAndCrew.ts';
import { ArtistDetail } from '../../types/response/ArtistDetail.ts';
import { TvSeriesResult } from '../../types/response/TvSeriesResult.ts';
import { TvSeriesItem } from '../../types/response/TvSeriesItem.ts';
import { TvSeriesDetail } from '../../types/response/TvSeriesDetail.ts';
import {
  SearchData,
  SearchParams,
} from '../../components/search/DynamicSearch.tsx';
import baseQuery from './baseQuery.ts';
import { Pagination } from '../../types/ApiRequest/ApiRequest.ts';
import { Celebrity, CelebrityItem } from '../../types/response/Celebrity.ts';
import { CombinedCredit } from '../../types/response/CombinedCredit.ts';

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
    artistMoviesAndTvSeries: builder.query<Cast[], number>({
      query: (personId: number) => ({
        url: `person/${personId}/combined_credits`,
      }),
      transformResponse: (response: CombinedCredit) => response.cast,
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
  useLazyArtistMoviesAndTvSeriesQuery,
} = movieApi;
