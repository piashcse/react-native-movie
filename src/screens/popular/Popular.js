import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getPopularMovieList} from '../../redux/actions';
import Loading from '../../components/loading/Loading';
import MovieList from '../../components/movielist/MovieList';
import styles from './PopularStyle'


const Popular = ({navigation}) => {
    //communicate with redux
    const movieListState = useSelector(state => state.popularMovieReducer);
    const isLoading = useSelector(state => state.popularMovieReducer.isLoading);
    const dispatch = useDispatch();

    // Api call
    useEffect(() => {
        dispatch(getPopularMovieList({}))
    }, [])

    // main view with loading while api call is going one
    return isLoading ? <Loading/> : <MovieList movies={movieListState.movieList}/>;
}
export default Popular