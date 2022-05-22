import {UP_COMING_MOVIE_LIST} from '../../constants';

const initialState = {
    movie: {}, movieList: [], isLoading: false,
};
const upComingMovieReducer = (state = initialState, action) => {
    switch (action.type) {
        case UP_COMING_MOVIE_LIST.UP_COMING_MOVIE_LIST_START:
            return {
                ...state, isLoading: true,
            };
        case UP_COMING_MOVIE_LIST.UP_COMING_MOVIE_LIST_SUCCESS:
            return {
                ...state,
                movie: action.result,
                movieList: [...state.movieList, ...action.result?.results],
                isLoading: false,
            };
        case UP_COMING_MOVIE_LIST.UP_COMING_MOVIE_LIST_FAILURE:
            return {
                ...state, isLoading: false,
            };
        default:
            return state;
    }
}

export default upComingMovieReducer
