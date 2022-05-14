import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getPopularMovieList} from '../../redux/actions';
import Loading from '../../components/loading/Loading';
import MovieList from '../../components/movielist/MovieList';
import styles from './PopularStyle'


const Popular = ({navigation}) => {
    //communicate with redux
    const {isLoading, movieList} = useSelector(state => state.popularMovieReducer);
    const dispatch = useDispatch();

    // Api call
    useEffect(() => {
        dispatch(getPopularMovieList({}))
    }, [])

    // main view with loading while api call is going one
    return isLoading ? <Loading/> : <MovieList movies={movieList} onPress={(item) => navigation.navigate('MovieDetail',{movieId:item.id})}/>;
}
export default Popular