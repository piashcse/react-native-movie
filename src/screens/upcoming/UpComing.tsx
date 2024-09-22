import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Loading from '../../components/loading/Loading';
import MovieList from '../../components/movielist/MovieList';
import styles from './UpComingStyle'
import {View} from "react-native";
import {getUpComingMovie} from "../../redux/reducer/upcoming";
import {useGetTopRatedMovieQuery, useGetUpcomingMovieQuery} from "../../redux/query/RTKQuery.ts";

const UpComing = ({navigation}) => {
    const { data = [], error, isLoading } = useGetUpcomingMovieQuery('1')
    const [pageNumber, setPageNumber] = useState(1)
    const dispatch = useDispatch();

    // Api call
    useEffect(() => {
        dispatch(getUpComingMovie({page: pageNumber}))
    }, [pageNumber])

    // main view with loading while api call is going on
    return (<View style={styles.mainView}>
        <MovieList
            movies={data}
            loadMoreData={() => {
                setPageNumber( pageNumber + 1)
            }}
            onPress={(item) => navigation.navigate('MovieDetail', {movieId: item?.id})}/>
        {isLoading && <Loading/>}
    </View>);
}
export default UpComing
