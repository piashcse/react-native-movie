import {createSlice} from '@reduxjs/toolkit'

const movieDetailState = createSlice({
    name: 'movieDetail', initialState: {
        movieDetail: {}, isLoading: false,
    }, reducers: {
        getMovieDetail: (state, action) => {
            state.isLoading = true
        }, movieDetailSuccess: (state, action) => {
            state.movieDetail = action.payload;
            state.isLoading = false
        }, movieDetailFailure: (state) => {
            state.isLoading = false
        }
    }
});
export const {getMovieDetail, movieDetailSuccess, movieDetailFailure} = movieDetailState.actions;
export default movieDetailState.reducer
