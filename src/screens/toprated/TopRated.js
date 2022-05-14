import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getTopRatedMovieList} from '../../redux/actions';
import Loading from '../../components/loading/Loading';
import MovieList from '../../components/movielist/MovieList';
import styles from './TopRatedStyle'


const TopRated = ({navigation}) => {
    //communicate with redux
    const {isLoading, movieList} = useSelector(state => state.topRatedMovieReducer);
    const dispatch = useDispatch();

    // Api call
    useEffect(() => {
        dispatch(getTopRatedMovieList({}))
    }, [])

    // main view with loading while api call is going one
    return isLoading ? <Loading/> : <MovieList movies={movieList} onPress={(item) => navigation.navigate('MovieDetail', {movieId:item.id})}/>;
}
export default TopRated