import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getTopRatedMovieList} from '../../redux/actions';
import Loading from '../../components/loading/Loading';
import MovieList from '../../components/movielist/MovieList';
import styles from './TopRatedStyle'
import {View} from "react-native";

let pageNum = 1
const TopRated = ({navigation}) => {
    //communicate with redux
    const {isLoading, movieList} = useSelector(state => state.topRatedMovieReducer);
    const dispatch = useDispatch();

    // Api call
    useEffect(() => {
        dispatch(getTopRatedMovieList({page: pageNum}))
    }, [])

    // main view with loading while api call is going on
    return (<View style={styles.mainView}>
        <MovieList
            movies={movieList}
            loadMoreData={() => {
                dispatch(getTopRatedMovieList({page: ++pageNum}))
            }}
            onPress={(item) => navigation.navigate('MovieDetail', {movieId: item.id})}/>
        {isLoading && <Loading/>}
    </View>);
}
export default TopRated