import { createApi } from '@reduxjs/toolkit/query/react';
import { MovieResult } from '../../types/response/MovieResult.ts';
import { MovieItem } from '../../types/response/MovieItem.ts';
import { MovieDetail } from '../../types/response/MovieDetail.ts';
import { Cast, CastAndCrew } from '../../types/response/ArtistAndCrew.ts';
import { ArtistDetail } from '../../types/response/ArtistDetail.ts';
import { TvSeriesResult } from '../../types/response/TvSeriesResult.ts';
import { TvSeriesItem } from '../../types/response/TvSeriesItem.ts';
import { TvSeriesDetail } from '../../types/response/TvSeriesDetail.ts';
import baseQuery from '../baseQuery.ts';
import { Celebrity, CelebrityItem } from '../../types/response/Celebrity.ts';
import { CombinedCredit } from '../../types/response/CombinedCredit.ts';
import {
  PaginatedResult,
  Pagination,
  SearchData,
  SearchParams,
} from '../../types/api.ts';

const toPaginatedResult = <T>(response: {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
}): PaginatedResult<T> => ({
  items: response.results,
  page: response.page,
  totalPages: response.total_pages,
  totalResults: response.total_results,
});

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    nowPlayingMovie: builder.query<PaginatedResult<MovieItem>, Pagination>({
      query: (params: Pagination) => ({
        url: 'movie/now_playing',
        params,
      }),
      transformResponse: (response: MovieResult) => toPaginatedResult(response),
    }),
    popularMovie: builder.query<PaginatedResult<MovieItem>, Pagination>({
      query: (params: Pagination) => ({
        url: 'movie/popular',
        params,
      }),
      transformResponse: (response: MovieResult) => toPaginatedResult(response),
    }),
    topRatedMovie: builder.query<PaginatedResult<MovieItem>, Pagination>({
      query: (params: Pagination) => ({
        url: 'movie/top_rated',
        params,
      }),
      transformResponse: (response: MovieResult) => toPaginatedResult(response),
    }),
    upcomingMovie: builder.query<PaginatedResult<MovieItem>, Pagination>({
      query: (params: Pagination) => ({
        url: 'movie/upcoming',
        params,
      }),
      transformResponse: (response: MovieResult) => toPaginatedResult(response),
    }),
    movieDetail: builder.query<MovieDetail, number>({
      query: (movieId: number) => ({
        url: `movie/${movieId}`,
      }),
    }),
    similarMovie: builder.query<PaginatedResult<MovieItem>, number>({
      query: (movieId: number) => ({
        url: `movie/${movieId}/recommendations`,
      }),
      transformResponse: (response: MovieResult) => toPaginatedResult(response),
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
    airingTodayTvSeries: builder.query<
      PaginatedResult<TvSeriesItem>,
      Pagination
    >({
      query: (params: Pagination) => ({
        url: 'tv/airing_today',
        params,
      }),
      transformResponse: (response: TvSeriesResult) =>
        toPaginatedResult(response),
    }),
    onTheAirTvSeries: builder.query<PaginatedResult<TvSeriesItem>, Pagination>({
      query: (params: Pagination) => ({
        url: 'tv/on_the_air',
        params,
      }),
      transformResponse: (response: TvSeriesResult) =>
        toPaginatedResult(response),
    }),
    popularTvSeries: builder.query<PaginatedResult<TvSeriesItem>, Pagination>({
      query: (params: Pagination) => ({
        url: 'tv/popular',
        params,
      }),
      transformResponse: (response: TvSeriesResult) =>
        toPaginatedResult(response),
    }),
    topRatedTvSeries: builder.query<PaginatedResult<TvSeriesItem>, Pagination>({
      query: (params: Pagination) => ({
        url: 'tv/top_rated',
        params,
      }),
      transformResponse: (response: TvSeriesResult) =>
        toPaginatedResult(response),
    }),
    tvSeriesDetail: builder.query<TvSeriesDetail, number>({
      query: (tvSeriesId: number) => ({
        url: `tv/${tvSeriesId}`,
      }),
    }),
    recommendedTvSeries: builder.query<PaginatedResult<TvSeriesItem>, number>({
      query: (tvSeriesId: number) => ({
        url: `tv/${tvSeriesId}/recommendations`,
      }),
      transformResponse: (response: TvSeriesResult) =>
        toPaginatedResult(response),
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
    searchCelebrity: builder.query<CelebrityItem[], string>({
      query: (query) => ({
        url: `search/person`,
        params: { query },
      }),
      transformResponse: (response: Celebrity) => response.results,
    }),
    popularCelebrity: builder.query<PaginatedResult<CelebrityItem>, Pagination>(
      {
        query: (params: Pagination) => ({
          url: `person/popular`,
          params,
        }),
        transformResponse: (response: Celebrity) => toPaginatedResult(response),
      }
    ),
    trendingCelebrity: builder.query<
      PaginatedResult<CelebrityItem>,
      Pagination
    >({
      query: (params: Pagination) => ({
        url: `trending/person/week`,
        params,
      }),
      transformResponse: (response: Celebrity) => toPaginatedResult(response),
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
  useSearchCelebrityQuery,
  useLazyPopularCelebrityQuery,
  useLazyTrendingCelebrityQuery,
  useLazyArtistMoviesAndTvSeriesQuery,
  useArtistMoviesAndTvSeriesQuery,
} = movieApi;
