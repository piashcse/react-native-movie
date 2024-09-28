import React, {useEffect, useState} from 'react';
import Loading from '../../components/loading/Loading';
import MovieComponent from '../../components/movielist/MovieComponent.tsx';
import styles from './UpComingStyle'
import {View} from "react-native";
import {useGetUpcomingMovieQuery} from "../../redux/query/RTKQuery.ts";
import {useNavigation} from "@react-navigation/native";
import {MovieItem} from "../../types/MovieItem.ts";

const UpComing = () => {
    const navigation = useNavigation();
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState<Array<MovieItem>>([]);
    const {data = [], error, isLoading, isFetching} = useGetUpcomingMovieQuery(page)
    useEffect(() => {
        if (data && page > 1) {
            setMovies((prevMovies) => [...prevMovies, ...data]);
        }else {
            setMovies(data ?? []);
        }
    }, [page, data.length]);

    const loadMoreMovies = () => {
        if (!isFetching && !isLoading && !error) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    if (isLoading) return <Loading/>;
    return (<View style={styles.mainView}>
        <MovieComponent
            movies={movies}
            loadMoreData={loadMoreMovies}
            onPress={(item) => navigation.navigate('MovieDetail', {movieId: item?.id})}/>
    </View>);
}
export default UpComing
