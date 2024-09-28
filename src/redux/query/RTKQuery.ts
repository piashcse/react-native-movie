import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {Constants} from "../../appconstants/AppConstants.ts";
import {MovieResult} from "../../types/MovieResult.ts";
import {MovieItem} from "../../types/MovieItem.ts";
import {MovieDetail} from "../../types/MovieDetail.ts";
import {CastAndCrew} from "../../types/ArtistAndCrew.ts";
import {ArtistDetail} from "../../types/ArtistDetail.ts";

export const nowPlayingMovieApi = createApi({
    reducerPath: 'nowPlayingMovieApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        getNowPlayingMovie: builder.query<MovieItem[], number>({
            query: (page) => `movie/now_playing?api_key=${Constants.API_KEY}&language=en-US?page=${page}`,
            transformResponse: (response: MovieResult) => response.results
        }),
    }),
})

export const { useGetNowPlayingMovieQuery } = nowPlayingMovieApi;

export const popularMovieApi = createApi({
    reducerPath: 'popularMovieApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        getPopularMovie: builder.query<MovieItem[], number>({
            query: (page ) => `movie/popular?api_key=${Constants.API_KEY}&language=en-US?page=${page}`,
            transformResponse: (response: MovieResult) => response.results
        }),
    }),
})


export const {useGetPopularMovieQuery} = popularMovieApi;

export const topRatedMovieApi = createApi({
    reducerPath: 'topRatedMovieApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        getTopRatedMovie: builder.query<MovieItem[], number>({
            query: (page) => `movie/top_rated?api_key=${Constants.API_KEY}&language=en-US?page=${page}`,
            transformResponse: (response: MovieResult) => response.results
        }),
    }),
})
export const {useGetTopRatedMovieQuery} = topRatedMovieApi;


export const upcomingMovieApi = createApi({
    reducerPath: 'upcomingMovieApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        getUpcomingMovie: builder.query<MovieItem[], number>({
            query: (page) => `movie/upcoming?api_key=${Constants.API_KEY}&language=en-US?page=${page}`,
            transformResponse: (response: MovieResult) => response.results
        }),
    }),
})

export const {useGetUpcomingMovieQuery} = upcomingMovieApi;

export const movieDetailApi = createApi({
    reducerPath: 'movieDetailApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        getMovieDetail: builder.query<MovieDetail, number>({
            query: (movieId) => `movie/${movieId}?api_key=${Constants.API_KEY}&language=en-US`,
            transformResponse: (response: MovieDetail) => response
        }),
    }),
})

export const {useGetMovieDetailQuery} = movieDetailApi;


export const similarMovieApi = createApi({
    reducerPath: 'similarMovieApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        getSimilarMovie: builder.query<MovieItem[], number>({
            query: (movieId) => `movie/${movieId}/recommendations?api_key=${Constants.API_KEY}&language=en-US`,
            transformResponse: (response: MovieResult) => response.results
        }),
    }),
})
export const {useGetSimilarMovieQuery} = similarMovieApi;

export const artistAndCrewApi = createApi({
    reducerPath: 'artistAndCrewApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        getArtistAndCrew: builder.query<CastAndCrew, number>({
            query: (movieId) => `movie/${movieId}/credits?api_key=${Constants.API_KEY}&language=en-US`,
            transformResponse: (response: CastAndCrew) => response
        }),
    }),
})

export const {useGetArtistAndCrewQuery} = artistAndCrewApi;

export const artistDetailApi = createApi({
    reducerPath: 'artistDetailApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        getAristDetail: builder.query<ArtistDetail, number>({
            query: (personId) => `person/${personId}?api_key=${Constants.API_KEY}&language=en-US`,
            transformResponse: (response: ArtistDetail) => response
        }),
    }),
})

export const {useGetAristDetailQuery} = artistDetailApi;
