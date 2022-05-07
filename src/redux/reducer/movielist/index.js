import {MOVIE_LIST} from '../../constants';

const initialState = {
    movie: {},
    isLoading: false,
};
export default function movieListReducer (state = initialState, action) {
    switch (action.type) {
        case MOVIE_LIST.MOVIE_LIST_START:
            return {
                ...state,
                movie: {},
                movieList: [],
                isLoading: true,
            };
        case MOVIE_LIST.MOVIE_LIST_SUCCESS:
            return {
                ...state,
                movie: action.result,
                movieList: action.result?.results,
                isLoading: false,
            };
        case MOVIE_LIST.MOVIE_LIST_FAILURE:
            return {
                ...state,
                movie: {},
                movieList: [],
                isLoading: false,
            };
        default:
            return state;
    }
}
