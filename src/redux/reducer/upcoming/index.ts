import {createSlice} from "@reduxjs/toolkit";

const upComingMovieState = createSlice({
    name: 'upComingMovie', initialState: {
        movie: {}, movieList: [], isLoading: false,
    }, reducers: {
        getUpComingMovie: (state, action) => {
            state.isLoading = true
        }, upcomingMovieSuccess: (state, action) => {
            state.movie = action.payload;
            state.movieList = [...state.movieList, ...action.payload?.results];
            state.isLoading = false
        }, upComingMovieFailure: (state) => {
            state.isLoading = false
        }
    }
});
export const {getUpComingMovie, upcomingMovieSuccess, upComingMovieFailure} = upComingMovieState.actions;
export default upComingMovieState.reducer

