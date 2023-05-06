import {Constants} from "../appconstants/AppConstants";

const BASE_URL = 'https://api.themoviedb.org/3/';
const MOVIE_LIST = `movie/now_playing?api_key=${Constants.API_KEY}&language=en-US`;
const POPULAR_MOVIE_LIST = `movie/popular?api_key=${Constants.API_KEY}&language=en-US`;
const TOP_RATED_MOVIE_LIST = `movie/top_rated?api_key=${Constants.API_KEY}&language=en-US`;
const UP_COMING_MOVIE_LIST = `movie/upcoming?api_key=${Constants.API_KEY}&language=en-US`;
const MOVIE_DETAIL = (movieId: number) => `movie/${movieId}?api_key=${Constants.API_KEY}&language=en-US`
const SIMILAR_MOVIE = (movieId: number) => `movie/${movieId}/recommendations?api_key=${Constants.API_KEY}&language=en-US`
const ARTIST = (movieId: number) => `movie/${movieId}/credits?api_key=${Constants.API_KEY}&language=en-US`
const ARTIST_DETAIL = (personId: number) => `person/${personId}?api_key=${Constants.API_KEY}&language=en-US`
export const ApiUrls = {
    BASE_URL,
    MOVIE_LIST,
    POPULAR_MOVIE_LIST,
    TOP_RATED_MOVIE_LIST,
    UP_COMING_MOVIE_LIST,
    MOVIE_DETAIL,
    SIMILAR_MOVIE,
    ARTIST,
    ARTIST_DETAIL
};
