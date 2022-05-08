import {MOVIE_LIST, POPULAR_MOVIE_LIST, TOP_RATED_MOVIE_LIST, UP_COMING_MOVIE_LIST} from "../constants";

export const getMovieList = (requestBody) => {
    return {
        type: MOVIE_LIST.MOVIE_LIST_START, requestBody
    };
}
export const getPopularMovieList = (requestBody) => {
    return {
        type: POPULAR_MOVIE_LIST.POPULAR_MOVIE_LIST_START, requestBody
    };
}
export const getTopRatedMovieList = (requestBody) => {
    return {
        type: TOP_RATED_MOVIE_LIST.TOP_RATED_MOVIE_LIST_START, requestBody
    };
}
export const getUpComingMovieList = (requestBody) => {
    return {
        type: UP_COMING_MOVIE_LIST.UP_COMING_MOVIE_LIST_START, requestBody
    };
}