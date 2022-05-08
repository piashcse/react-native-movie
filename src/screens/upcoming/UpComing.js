import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUpComingMovieList} from '../../redux/actions';
import Loading from '../../components/loading/Loading';
import MovieList from '../../components/movielist/MovieList';
import styles from './UpComingStyle'

const UpComing = ({navigation}) => {
    //communicate with redux
    const movieListState = useSelector(state => state.upComingMovieReducer);
    const isLoading = useSelector(state => state.upComingMovieReducer.isLoading);
    const dispatch = useDispatch();

    // Api call
    useEffect(() => {
        dispatch(getUpComingMovieList({}))
    }, [])

    // main view with loading while api call is going one
    return isLoading ? <Loading/> : <MovieList movies={movieListState.movieList}/>;
}
export default UpComing