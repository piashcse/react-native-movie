import {createSlice} from '@reduxjs/toolkit'

const artistDetailState = createSlice({
    name: 'artistDetail', initialState: {
        artistDetail: {},isLoading: false,
    }, reducers: {
        getArtistDetail: (state, action) => {
            state.isLoading = true
        }, artistDetailSuccess: (state, action) => {
            state.artistDetail = action.payload;
            state.isLoading = false
        }, artistDetailFailure: (state) => {
            state.isLoading = false
        }
    }
});
export const {getArtistDetail, artistDetailSuccess, artistDetailFailure} = artistDetailState.actions;
export default artistDetailState.reducer
