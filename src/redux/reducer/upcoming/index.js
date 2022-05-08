import {UP_COMING_MOVIE_LIST} from '../../constants';

const initialState = {
    movie: {}, isLoading: false,
};
const upComingMovieReducer = (state = initialState, action) => {
    switch (action.type) {
        case UP_COMING_MOVIE_LIST.UP_COMING_MOVIE_LIST_START:
            return {
                ...state, movie: {}, movieList: [], isLoading: true,
            };
        case UP_COMING_MOVIE_LIST.UP_COMING_MOVIE_LIST_SUCCESS:
            return {
                ...state, movie: action.result, movieList: action.result?.results, isLoading: false,
            };
        case UP_COMING_MOVIE_LIST.UP_COMING_MOVIE_LIST_FAILURE:
            return {
                ...state, movie: {}, movieList: [], isLoading: false,
            };
        default:
            return state;
    }
}

export default upComingMovieReducer
