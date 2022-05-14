import {SIMILAR_MOVIE} from '../../constants';

const initialState = {
    movie: {}, isLoading: false,
};
const similarMovieReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIMILAR_MOVIE.SIMILAR_MOVIE_START:
            return {
                ...state, isLoading: true,
            };
        case SIMILAR_MOVIE.SIMILAR_MOVIE_SUCCESS:
            return {
                ...state, movie: action.result, movieList: action.result?.results, isLoading: false,
            };
        case SIMILAR_MOVIE.SIMILAR_MOVIE_FAILURE:
            return {
                ...state, isLoading: false,
            };
        default:
            return state;
    }
}

export default similarMovieReducer
