import {createSlice} from '@reduxjs/toolkit'

const topRatedMovieState = createSlice({
    name: 'topRatedMovie', initialState: {
        movie: {}, movieList: [], isLoading: false,
    }, reducers: {
        getTopRatedMovie: (state, action) => {
            state.isLoading = true
        }, topRatedMovieSuccess: (state, action) => {
            state.movie = action.payload;
            state.movieList = [...state.movieList, ...action.payload?.results];
            state.isLoading = false
        }, topRatedMovieFailure: (state) => {
            state.isLoading = false
        }
    }
});
export const {getTopRatedMovie, topRatedMovieSuccess, topRatedMovieFailure} = topRatedMovieState.actions;
export default topRatedMovieState.reducer

