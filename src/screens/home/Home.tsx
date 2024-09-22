import React, {useEffect, useState} from 'react';
import { useDispatch} from 'react-redux';
import Loading from '../../components/loading/Loading';
import MovieList from '../../components/movielist/MovieList';
import {View} from 'react-native';
import styles from './HomeStyle'
import {useGetNowPlayingMovieQuery} from "../../redux/query/RTKQuery.ts";


const Home = ({navigation}) => {
    const [pageNumber, setPageNumber] = useState(1)
    const { data: movies = [], error, isLoading } = useGetNowPlayingMovieQuery(pageNumber.toString())
    const dispatch = useDispatch();

    // Api call
    /*useEffect(() => {
        dispatch(getMovieList({page: pageNumber}))
    }, [pageNumber])*/

    return (<View style={styles.mainView}>
        <MovieList
            movies={movies}
            loadMoreData={() => {
                setPageNumber(pageNumber + 1)
            }}
            onPress={(item) => navigation.navigate('MovieDetail', {movieId: item.id})}/>
        {isLoading && <Loading/>}
    </View>);
}
export default Home
