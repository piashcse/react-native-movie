import {createSlice} from '@reduxjs/toolkit'
const popularMovieState = createSlice({
    name: 'popularMovie', initialState: {
        movie: {}, movieList: [], isLoading: false,
    }, reducers: {
        getPopularMovie: (state, action) => {
            state.isLoading = true
        }, popularMovieSuccess: (state, action) => {
            state.movie = action.payload;
            state.movieList = [...state.movieList, ...action.payload?.results];
            state.isLoading = false
        }, popularMovieFailure: (state) => {
            state.isLoading = false
        }
    }
});
export const {getPopularMovie, popularMovieSuccess, popularMovieFailure} = popularMovieState.actions;
export default popularMovieState.reducer

