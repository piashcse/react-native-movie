import React, {useEffect, useState} from 'react';
import Loading from '../../../components/loading/Loading.tsx';
import MovieItemComponent from '../../../components/movie-item/MovieItemComponent.tsx';
import styles from './TopRatedMovie.Style.ts'
import {View} from "react-native";
import { useGetTopRatedMovieQuery} from "../../../redux/query/RTKQuery.ts";
import {useNavigation} from "@react-navigation/native";
import {MovieItem} from "../../../types/MovieItem.ts";

const TopRatedMovie = () => {
    const navigation = useNavigation();
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState<Array<MovieItem>>([]);
    const {data = [], error, isLoading, isFetching, isSuccess} = useGetTopRatedMovieQuery(page);

    useEffect(() => {
        if (data && page > 1) {
            setMovies((prevMovies) => [...prevMovies, ...data]);
        }else {
            setMovies(data ?? []);
        }
    }, [isSuccess]);

    const loadMoreMovies = () => {
        if (!isFetching && !isLoading && !error) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    if (isLoading) return <Loading/>;
    return (<View style={styles.mainView}>
        <MovieItemComponent
            movies={movies}
            loadMoreData={loadMoreMovies}
            onPress={(item) => navigation.navigate('MovieDetail', {movieId: item.id})}/>
        {isLoading && <Loading/>}
    </View>);
}
export default TopRatedMovie
