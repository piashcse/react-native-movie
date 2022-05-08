import {combineReducers} from 'redux';
import movieListReducer from './movielist';
import popularMovieReducer from './popularmovie'
import topRatedMovieReducer from "./toprated";
import upComingMovieReducer from './upcoming'

export default combineReducers({
    movieListReducer,
    popularMovieReducer,
    topRatedMovieReducer,
    upComingMovieReducer

});