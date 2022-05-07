import {MOVIE_LIST} from "../constants";

export const getMovieList = (requestBody) => {
    return {
        type: MOVIE_LIST.MOVIE_LIST_START,
        requestBody
    };
}