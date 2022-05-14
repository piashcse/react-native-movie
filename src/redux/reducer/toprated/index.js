import {TOP_RATED_MOVIE_LIST} from '../../constants';

const initialState = {
    movie: {}, isLoading: false,
};
const topRatedMovieReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOP_RATED_MOVIE_LIST.TOP_RATED_MOVIE_LIST_START:
            return {
                ...state, isLoading: true,
            };
        case TOP_RATED_MOVIE_LIST.TOP_RATED_MOVIE_LIST_SUCCESS:
            return {
                ...state, movie: action.result, movieList: action.result?.results, isLoading: false,
            };
        case TOP_RATED_MOVIE_LIST.TOP_RATED_MOVIE_LIST_FAILURE:
            return {
                ...state, isLoading: false,
            };
        default:
            return state;
    }
}

export default topRatedMovieReducer
