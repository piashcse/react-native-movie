import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Loading from '../../components/loading/Loading';
import MovieList from '../../components/movielist/MovieList';
import styles from './TopRatedStyle'
import {View} from "react-native";
import {getTopRatedMovie} from "../../redux/reducer/toprated";
import {useGetPopularMovieQuery, useGetTopRatedMovieQuery} from "../../redux/query/RTKQuery.ts";

const TopRated = ({navigation}) => {
    const { data = [], error, isLoading } = useGetTopRatedMovieQuery('1')
    const [pageNumber, setPageNumber] = useState(1)
    const dispatch = useDispatch();

    // Api call
    useEffect(() => {
        dispatch(getTopRatedMovie({page: pageNumber}))
    }, [pageNumber])

    // main view with loading while api call is going on
    return (<View style={styles.mainView}>
        <MovieList
            movies={data}
            loadMoreData={() => {
                setPageNumber( pageNumber + 1)
            }}
            onPress={(item) => navigation.navigate('MovieDetail', {movieId: item.id})}/>
        {isLoading && <Loading/>}
    </View>);
}
export default TopRated
