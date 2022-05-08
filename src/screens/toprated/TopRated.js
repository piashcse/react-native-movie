import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getTopRatedMovieList} from '../../redux/actions';
import Loading from '../../components/loading/Loading';
import MovieList from '../../components/movielist/MovieList';
import styles from './TopRatedStyle'


const TopRated = ({navigation}) => {
    //communicate with redux
    const movieListState = useSelector(state => state.topRatedMovieReducer);
    const isLoading = useSelector(state => state.topRatedMovieReducer.isLoading);
    const dispatch = useDispatch();

    // Api call
    useEffect(() => {
        dispatch(getTopRatedMovieList({}))
    }, [])

    // main view with loading while api call is going one
    return isLoading ? <Loading/> : <MovieList movies={movieListState.movieList}/>;
}
export default TopRated