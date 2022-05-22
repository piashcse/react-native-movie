import {POPULAR_MOVIE_LIST} from '../../constants';

const initialState = {
    movie: {}, movieList: [], isLoading: false,
};
const popularMovieReducer = (state = initialState, action) => {
    switch (action.type) {
        case POPULAR_MOVIE_LIST.POPULAR_MOVIE_LIST_START:
            return {
                ...state, isLoading: true,
            };
        case POPULAR_MOVIE_LIST.POPULAR_MOVIE_LIST_SUCCESS:
            return {
                ...state,
                movie: action.result,
                movieList: [...state.movieList, ...action.result?.results],
                isLoading: false,
            };
        case POPULAR_MOVIE_LIST.POPULAR_MOVIE_LIST_FAILURE:
            return {
                ...state, isLoading: false,
            };
        default:
            return state;
    }
}

export default popularMovieReducer
