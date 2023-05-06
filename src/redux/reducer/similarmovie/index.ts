import {createSlice} from '@reduxjs/toolkit'

const similarMovieState = createSlice({
    name: 'similarMovie', initialState: {
        movie: {}, movieList: [], isLoading: false,
    }, reducers: {
        getSimilarMovie: (state, action) => {
            state.isLoading = true
        }, similarMovieSuccess: (state, action) => {
            state.movie = action.payload;
            state.movieList = [...state.movieList, ...action.payload?.results];
            state.isLoading = false
        }, similarMovieFailure: (state) => {
            state.isLoading = false
        }
    }
});
export const {getSimilarMovie, similarMovieSuccess, similarMovieFailure} = similarMovieState.actions;
export default similarMovieState.reducer

