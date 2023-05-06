import {createSlice} from '@reduxjs/toolkit'

const artistState = createSlice({
    name: 'artist', initialState: {
        cast: [], crew: [], isLoading: false,
    }, reducers: {
        getArtist: (state, action) => {
            state.isLoading = true
        }, artistSuccess: (state, action) => {
            state.cast = action.payload.cast;
            state.crew = action.payload.crew;
            state.isLoading = false
        }, artistFailure: (state) => {
            state.isLoading = false
        }
    }
});
export const {getArtist, artistSuccess, artistFailure} = artistState.actions;
export default artistState.reducer
