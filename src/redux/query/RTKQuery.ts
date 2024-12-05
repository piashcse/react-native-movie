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

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({
    nowPlayingMovie: builder.query<MovieItem[], number>({
      query: (page) =>
        `movie/now_playing?page=${page}&language=en-US&api_key=${Constants.API_KEY}`,
      transformResponse: (response: MovieResult) => response.results,
    }),
    popularMovie: builder.query<MovieItem[], number>({
      query: (page) =>
        `movie/popular?page=${page}&language=en-US&api_key=${Constants.API_KEY}`,
      transformResponse: (response: MovieResult) => {
        console.log('transform ', response.results);
        return response.results;
      },
    }),
    topRatedMovie: builder.query<MovieItem[], number>({
      query: (page) =>
        `movie/top_rated?page=${page}&language=en-US&api_key=${Constants.API_KEY}`,
      transformResponse: (response: MovieResult) => response.results,
    }),
    upcomingMovie: builder.query<MovieItem[], number>({
      query: (page) =>
        `movie/upcoming?page=${page}&language=en-US&api_key=${Constants.API_KEY}`,
      transformResponse: (response: MovieResult) => response.results,
    }),
    movieDetail: builder.query<MovieDetail, number>({
      query: (movieId) =>
        `movie/${movieId}?api_key=${Constants.API_KEY}&language=en-US`,
      transformResponse: (response: MovieDetail) => response,
    }),
    similarMovie: builder.query<MovieItem[], number>({
      query: (movieId) =>
        `movie/${movieId}/recommendations?api_key=${Constants.API_KEY}&language=en-US`,
      transformResponse: (response: MovieResult) => response.results,
    }),
    artistAndCrew: builder.query<CastAndCrew, number>({
      query: (movieId) =>
        `movie/${movieId}/credits?api_key=${Constants.API_KEY}&language=en-US`,
      transformResponse: (response: CastAndCrew) => response,
    }),
    aristDetail: builder.query<ArtistDetail, number>({
      query: (personId) =>
        `person/${personId}?api_key=${Constants.API_KEY}&language=en-US`,
      transformResponse: (response: ArtistDetail) => response,
    }),
    airingTodayTvSeriesApi: builder.query<TvSeriesItem[], number>({
      query: (page) =>
        `tv/airing_today?page=${page}&language=en-US&api_key=${Constants.API_KEY}`,
      transformResponse: (response: TvSeriesResult) => response.results,
    }),
    onTheAirTvSeriesApi: builder.query<TvSeriesItem[], number>({
      query: (page) =>
        `tv/on_the_air?page=${page}&language=en-US&api_key=${Constants.API_KEY}`,
      transformResponse: (response: TvSeriesResult) => response.results,
    }),
    popularTvSeriesApi: builder.query<TvSeriesItem[], number>({
      query: (page) =>
        `tv/popular?page=${page}&language=en-US&api_key=${Constants.API_KEY}`,
      transformResponse: (response: TvSeriesResult) => response.results,
    }),
    topRatedTvSeriesApi: builder.query<TvSeriesItem[], number>({
      query: (page) =>
        `tv/top_rated?page=${page}&language=en-US&api_key=${Constants.API_KEY}`,
      transformResponse: (response: TvSeriesResult) => response.results,
    }),
    tvSeriesDetailApi: builder.query<TvSeriesDetail, number>({
      query: (tvSeriesId) =>
        `tv/${tvSeriesId}?api_key=${Constants.API_KEY}&language=en-US`,
      transformResponse: (response: TvSeriesDetail) => response,
    }),
    recommendedTvSeriesApi: builder.query<TvSeriesItem[], number>({
      query: (tvSeriesId) =>
        `tv/${tvSeriesId}/recommendations?api_key=${Constants.API_KEY}&language=en-US`,
      transformResponse: (response: TvSeriesResult) => response.results,
    }),
    tvSeriesArtistAndCrewApi: builder.query<CastAndCrew, number>({
      query: (movieId) =>
        `tv/${movieId}/credits?api_key=${Constants.API_KEY}&language=en-US`,
      transformResponse: (response: CastAndCrew) => response,
    }),
    searchMovieTvSeries: builder.query<SearchData[], SearchParams>({
      query: (search: SearchParams) =>
        `search/${search.isMovie ? 'movie' : 'tv'}?query=${
          search.query
        }&api_key=${Constants.API_KEY}&language=en-US`,
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
  useAristDetailQuery,
  useAiringTodayTvSeriesApiQuery,
  useOnTheAirTvSeriesApiQuery,
  usePopularTvSeriesApiQuery,
  useTopRatedTvSeriesApiQuery,
  useTvSeriesDetailApiQuery,
  useRecommendedTvSeriesApiQuery,
  useTvSeriesArtistAndCrewApiQuery,
  useSearchMovieTvSeriesQuery,
} = movieApi;
