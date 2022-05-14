import {MOVIE_DETAIL} from '../../constants';

const initialState = {
    movieDetail: {}, isLoading: false,
};
const movieDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVIE_DETAIL.MOVIE_DETAIL_START:
            return {
                ...state, isLoading: true,
            };
        case MOVIE_DETAIL.MOVIE_DETAIL_SUCCESS:
            return {
                ...state, movieDetail: action.result, isLoading: false,
            };
        case MOVIE_DETAIL.MOVIE_DETAIL_FAILURE:
            return {
                ...state, isLoading: false,
            };
        default:
            return state;
    }
}
export default movieDetailReducer
