import {Constants} from "../appconstants/AppConstants";

export const ApiUrls = {
    BASE_URL: 'https://api.themoviedb.org/3/',
    MOVIE_LIST: `movie/now_playing?api_key=${Constants.API_KEY}&language=en-US`,
    POPULAR_MOVIE_LIST: `movie/popular?api_key=${Constants.API_KEY}&language=en-US`,
    TOP_RATED_MOVIE_LIST: `movie/top_rated?api_key=${Constants.API_KEY}&language=en-US`,
    UP_COMING_MOVIE_LIST: `movie/upcoming?api_key=${Constants.API_KEY}&language=en-US`
};