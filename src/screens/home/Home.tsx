import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Loading from '../../components/loading/Loading';
import MovieList from '../../components/movielist/MovieList';
import {View} from 'react-native';
import styles from './HomeStyle'
import {getMovieList} from "../../redux/reducer/movielist";

let pageNum = 1
const Home = ({navigation}) => {
    //communicate with redux
    const {isLoading, movieList} = useSelector(state => state.movieListReducer);
    const dispatch = useDispatch();

    // Api call
    useEffect(() => {
        dispatch(getMovieList({page: pageNum}))
    }, [])

    return (<View style={styles.mainView}>
        <MovieList
            movies={movieList}
            loadMoreData={() => {
                dispatch(getMovieList({page: ++pageNum}))
            }}
            onPress={(item) => navigation.navigate('MovieDetail', {movieId: item.id})}/>
        {isLoading && <Loading/>}
    </View>);
}
export default Home
