import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getPopularMovieList} from '../../redux/actions';
import Loading from '../../components/loading/Loading';
import MovieList from '../../components/movielist/MovieList';
import styles from './PopularStyle'
import {View} from "react-native";

let pageNum = 1
const Popular = ({navigation}) => {
    //communicate with redux
    const {isLoading, movieList} = useSelector(state => state.popularMovieReducer);
    const dispatch = useDispatch();

    // Api call
    useEffect(() => {
        dispatch(getPopularMovieList({page: pageNum}))
    }, [])

    // main view with loading while api call is going on
    return (<View style={styles.mainView}>
        <MovieList
            movies={movieList}
            loadMoreData={() => {
                dispatch(getPopularMovieList({page: ++pageNum}))
            }}
            onPress={(item) => navigation.navigate('MovieDetail', {movieId: item.id})}/>
        {isLoading && <Loading/>}
    </View>);
}
export default Popular