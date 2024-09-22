import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Loading from '../../components/loading/Loading';
import MovieList from '../../components/movielist/MovieList';
import styles from './PopularStyle'
import {View} from "react-native";
import {getPopularMovie} from "../../redux/reducer/popularmovie";
import { useGetPopularMovieQuery} from "../../redux/query/RTKQuery.ts";

const Popular = ({navigation}) => {
    const { data = [], error, isLoading } = useGetPopularMovieQuery('1')
    const [pageNumber, setPageNumber] = useState(1)
    const dispatch = useDispatch();

    // Api call
    useEffect(() => {
        dispatch(getPopularMovie({page: pageNumber}))
    }, [pageNumber])

    // main view with loading while api call is going on
    return (<View style={styles.mainView}>
        <MovieList
            movies={data}
            onPress={(item) => navigation.navigate('MovieDetail', {movieId: item.id})}
            loadMoreData={() => {
                setPageNumber(pageNumber + 1)
            }}/>
        {isLoading && <Loading/>}
    </View>);
}
export default Popular
