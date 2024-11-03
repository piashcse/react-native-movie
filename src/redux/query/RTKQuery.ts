import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {Constants} from "../../constant/AppConstants.ts";
import {MovieResult} from "../../types/MovieResult.ts";
import {MovieItem} from "../../types/MovieItem.ts";
import {MovieDetail} from "../../types/MovieDetail.ts";
import {CastAndCrew} from "../../types/ArtistAndCrew.ts";
import {ArtistDetail} from "../../types/ArtistDetail.ts";
import {TvSeriesResult} from "../../types/TvSeriesResult.ts";
import {TvSeriesItem} from "../../types/TvSeriesItem.ts";
import {TvSeriesDetail} from "../../types/TvSeriesDetail.ts";
import {SearchData, SearchParams} from "../../components/search/DynamicSearch.tsx";

export const nowPlayingMovieApi = createApi({
    reducerPath: 'nowPlayingMovieApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        nowPlayingMovie: builder.query<MovieItem[], number>({
            query: (page) => `movie/now_playing?page=${page}&language=en-US&api_key=${Constants.API_KEY}`,
            transformResponse: (response: MovieResult) => response.results,
        }),
    }),
})

export const { useNowPlayingMovieQuery } = nowPlayingMovieApi;

export const popularMovieApi = createApi({
    reducerPath: 'popularMovieApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        popularMovie: builder.query<MovieItem[], number>({
            query: (page ) => `movie/popular?page=${page}&language=en-US&api_key=${Constants.API_KEY}`,
            transformResponse: (response: MovieResult) => {
                console.log('transform ', response.results)
                return response.results
            }
        }),
    }),
})


export const {usePopularMovieQuery} = popularMovieApi;

export const topRatedMovieApi = createApi({
    reducerPath: 'topRatedMovieApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        topRatedMovie: builder.query<MovieItem[], number>({
            query: (page) => `movie/top_rated?page=${page}&language=en-US&api_key=${Constants.API_KEY}`,
            transformResponse: (response: MovieResult) => response.results
        }),
    }),
})
export const {useTopRatedMovieQuery} = topRatedMovieApi;


export const upcomingMovieApi = createApi({
    reducerPath: 'upcomingMovieApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        upcomingMovie: builder.query<MovieItem[], number>({
            query: (page) => `movie/upcoming?page=${page}&language=en-US&api_key=${Constants.API_KEY}`,
            transformResponse: (response: MovieResult) => response.results
        }),
    }),
})

export const {useUpcomingMovieQuery} = upcomingMovieApi;

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

export const airingTodayTvSeriesApi = createApi({
    reducerPath: 'airingTodayTvSeriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        airingTodayTvSeriesApi: builder.query<TvSeriesItem[], number>({
            query: (page) => `tv/airing_today?page=${page}&language=en-US&api_key=${Constants.API_KEY}`,
            transformResponse: (response: TvSeriesResult) => response.results,
        }),
    }),
})

export  const {useAiringTodayTvSeriesApiQuery}  = airingTodayTvSeriesApi

export const onTheAirTvSeriesApi = createApi({
    reducerPath: 'onTheAirTvSeriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        onTheAirTvSeriesApi: builder.query<TvSeriesItem[], number>({
            query: (page) => `tv/on_the_air?page=${page}&language=en-US&api_key=${Constants.API_KEY}`,
            transformResponse: (response: TvSeriesResult) => response.results,
        }),
    }),
})

export const {useOnTheAirTvSeriesApiQuery}= onTheAirTvSeriesApi

export const popularTvSeriesApi = createApi({
    reducerPath: 'popularTvSeriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        popularTvSeriesApi: builder.query<TvSeriesItem[], number>({
            query: (page) => `tv/popular?page=${page}&language=en-US&api_key=${Constants.API_KEY}`,
            transformResponse: (response: TvSeriesResult) => response.results,
        }),
    }),
})

export const {usePopularTvSeriesApiQuery}= popularTvSeriesApi

export const topRatedTvSeriesApi = createApi({
    reducerPath: 'topRatedTvSeriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        topRatedTvSeriesApi: builder.query<TvSeriesItem[], number>({
            query: (page) => `tv/top_rated?page=${page}&language=en-US&api_key=${Constants.API_KEY}`,
            transformResponse: (response: TvSeriesResult) => response.results,
        }),
    }),
})

export const {useTopRatedTvSeriesApiQuery} = topRatedTvSeriesApi

export const tvSeriesDetailApi = createApi({
    reducerPath: 'tvSeriesDetailApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        tvSeriesDetailApi: builder.query<TvSeriesDetail, number>({
            query: (tvSeriesId) => `tv/${tvSeriesId}?api_key=${Constants.API_KEY}&language=en-US`,
            transformResponse: (response: TvSeriesDetail) => response
        }),
    }),
})
export const {useTvSeriesDetailApiQuery} = tvSeriesDetailApi

export const recommendedTvSeriesApi = createApi({
    reducerPath: 'recommendedTvSeriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        recommendedTvSeriesApi: builder.query<TvSeriesItem[], number>({
            query: (tvSeriesId) => `tv/${tvSeriesId}/recommendations?api_key=${Constants.API_KEY}&language=en-US`,
            transformResponse: (response: TvSeriesResult) => response.results
        }),
    }),
})
export const {useRecommendedTvSeriesApiQuery} = recommendedTvSeriesApi

export const tvSeriesArtistAndCrewApi = createApi({
    reducerPath: 'tvSeriesArtistAndCrewApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        tvSeriesArtistAndCrewApi: builder.query<CastAndCrew, number>({
            query: (movieId) => `tv/${movieId}/credits?api_key=${Constants.API_KEY}&language=en-US`,
            transformResponse: (response: CastAndCrew) => response
        }),
    }),
})

export const {useTvSeriesArtistAndCrewApiQuery} = tvSeriesArtistAndCrewApi

export const searchMovieTvSeries = createApi({
    reducerPath: 'searchMovieTvSeries',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
    endpoints: (builder) => ({
        searchMovieTvSeries: builder.query<SearchData[], SearchParams>({
            query: (search : SearchParams) => `search/${search.isMovie? 'movie' : 'tv'}?query=${search.query}&api_key=${Constants.API_KEY}&language=en-US`,
            transformResponse: (response: MovieResult) => response.results as SearchData[]
        }),
    }),
})

export const {useSearchMovieTvSeriesQuery} = searchMovieTvSeries;