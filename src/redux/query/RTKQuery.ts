import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Constants } from '../../constant/AppConstants.ts';
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
const buildQuery = (
  path: string,
  params: Record<string, string | number> = {}
) => {
  const searchParams = new URLSearchParams({
    api_key: Constants.API_KEY,
    language: 'en-US',
    ...params,
  });
  return `${path}?${searchParams.toString()}`;
};

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({
    // Movies
    nowPlayingMovie: builder.query<MovieItem[], number>({
      query: (page) => buildQuery('movie/now_playing', { page }),
      transformResponse: (response: MovieResult) => response.results,
    }),
    popularMovie: builder.query<MovieItem[], number>({
      query: (page) => buildQuery('movie/popular', { page }),
      transformResponse: (response: MovieResult) => response.results,
    }),
    topRatedMovie: builder.query<MovieItem[], number>({
      query: (page) => buildQuery('movie/top_rated', { page }),
      transformResponse: (response: MovieResult) => response.results,
    }),
    upcomingMovie: builder.query<MovieItem[], number>({
      query: (page) => buildQuery('movie/upcoming', { page }),
      transformResponse: (response: MovieResult) => response.results,
    }),
    movieDetail: builder.query<MovieDetail, number>({
      query: (movieId) => buildQuery(`movie/${movieId}`),
    }),
    similarMovie: builder.query<MovieItem[], number>({
      query: (movieId) => buildQuery(`movie/${movieId}/recommendations`),
      transformResponse: (response: MovieResult) => response.results,
    }),
    artistAndCrew: builder.query<CastAndCrew, number>({
      query: (movieId) => buildQuery(`movie/${movieId}/credits`),
    }),
    artistDetail: builder.query<ArtistDetail, number>({
      query: (personId) => buildQuery(`person/${personId}`),
    }),

    // TV Series
    airingTodayTvSeries: builder.query<TvSeriesItem[], number>({
      query: (page) => buildQuery('tv/airing_today', { page }),
      transformResponse: (response: TvSeriesResult) => response.results,
    }),
    onTheAirTvSeries: builder.query<TvSeriesItem[], number>({
      query: (page) => buildQuery('tv/on_the_air', { page }),
      transformResponse: (response: TvSeriesResult) => response.results,
    }),
    popularTvSeries: builder.query<TvSeriesItem[], number>({
      query: (page) => buildQuery('tv/popular', { page }),
      transformResponse: (response: TvSeriesResult) => response.results,
    }),
    topRatedTvSeries: builder.query<TvSeriesItem[], number>({
      query: (page) => buildQuery('tv/top_rated', { page }),
      transformResponse: (response: TvSeriesResult) => response.results,
    }),
    tvSeriesDetail: builder.query<TvSeriesDetail, number>({
      query: (tvSeriesId) => buildQuery(`tv/${tvSeriesId}`),
    }),
    recommendedTvSeries: builder.query<TvSeriesItem[], number>({
      query: (tvSeriesId) => buildQuery(`tv/${tvSeriesId}/recommendations`),
      transformResponse: (response: TvSeriesResult) => response.results,
    }),
    tvSeriesArtistAndCrew: builder.query<CastAndCrew, number>({
      query: (tvSeriesId) => buildQuery(`tv/${tvSeriesId}/credits`),
    }),

    // Search
    searchMovieTvSeries: builder.query<SearchData[], SearchParams>({
      query: ({ isMovie, query }) =>
        buildQuery(`search/${isMovie ? 'movie' : 'tv'}`, { query }),
      transformResponse: (response: MovieResult) =>
        response.results as SearchData[],
    }),
  }),
});

export const {
  useNowPlayingMovieQuery,
  usePopularMovieQuery,
  useTopRatedMovieQuery,
  useUpcomingMovieQuery,
  useMovieDetailQuery,
  useSimilarMovieQuery,
  useArtistAndCrewQuery,
  useArtistDetailQuery,
  useAiringTodayTvSeriesQuery,
  useOnTheAirTvSeriesQuery,
  usePopularTvSeriesQuery,
  useTopRatedTvSeriesQuery,
  useTvSeriesDetailQuery,
  useRecommendedTvSeriesQuery,
  useTvSeriesArtistAndCrewQuery,
  useSearchMovieTvSeriesQuery,
} = movieApi;
