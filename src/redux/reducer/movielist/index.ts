import {createSlice} from '@reduxjs/toolkit'

const movieListState = createSlice({
    name: 'movieList', initialState: {
        movie: {}, movieList: [], isLoading: false,
    }, reducers: {
        getMovieList: (state, action) => {
            state.isLoading = true
        }, movieListSuccess: (state, action) => {
            state.movie = action.payload;
            state.movieList = [...state.movieList, ...action.payload?.results];
            state.isLoading = false
        }, movieListFailure: (state) => {
            state.isLoading = false
        }
    }
});
export const {getMovieList, movieListSuccess, movieListFailure} = movieListState.actions;
export default movieListState.reducer
