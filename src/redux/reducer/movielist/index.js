import {MOVIE_LIST} from '../../constants';

const initialState = {
    movie: {}, isLoading: false,
};
const movieListReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVIE_LIST.MOVIE_LIST_START:
            return {
                ...state, isLoading: true,
            };
        case MOVIE_LIST.MOVIE_LIST_SUCCESS:
            return {
                ...state, movie: action.result, movieList: action.result?.results, isLoading: false,
            };
        case MOVIE_LIST.MOVIE_LIST_FAILURE:
            return {
                ...state, isLoading: false,
            };
        default:
            return state;
    }
}
export default movieListReducer
