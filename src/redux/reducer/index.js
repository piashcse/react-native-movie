import {combineReducers} from 'redux';
import movieListReducer from './movielist';
import popularMovieReducer from './popularmovie'
import topRatedMovieReducer from "./toprated";
import upComingMovieReducer from './upcoming'
import movieDetailReducer from "./moviedetail";
import similarMovieReducer from "./similarmovie";

export default combineReducers({
    movieListReducer,
    popularMovieReducer,
    topRatedMovieReducer,
    upComingMovieReducer,
    movieDetailReducer,
    similarMovieReducer,
});