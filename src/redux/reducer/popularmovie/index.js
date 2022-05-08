import {POPULAR_MOVIE_LIST} from '../../constants';

const initialState = {
    movie: {}, isLoading: false,
};
const popularMovieReducer = (state = initialState, action) => {
    switch (action.type) {
        case POPULAR_MOVIE_LIST.POPULAR_MOVIE_LIST_START:
            return {
                ...state, movie: {}, movieList: [], isLoading: true,
            };
        case POPULAR_MOVIE_LIST.POPULAR_MOVIE_LIST_SUCCESS:
            return {
                ...state, movie: action.result, movieList: action.result?.results, isLoading: false,
            };
        case POPULAR_MOVIE_LIST.POPULAR_MOVIE_LIST_FAILURE:
            return {
                ...state, movie: {}, movieList: [], isLoading: false,
            };
        default:
            return state;
    }
}

export default popularMovieReducer
