import React, {useEffect, useState} from 'react';
import Loading from '../../../components/loading/Loading.tsx';
import MovieItemComponent from '../../../components/movie-item/MovieItemComponent.tsx';
import {View} from 'react-native';
import styles from './NowPlayingMovie.Style.ts'
import {useGetNowPlayingMovieQuery} from "../../../redux/query/RTKQuery.ts";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {MovieItem} from "../../../types/MovieItem.ts";

type RootStackParamList = {
    MovieDetail: { movieId: number };
};
type NowPlayingMovieNavigationProp = NavigationProp<RootStackParamList, 'MovieDetail'>;

const NowPlayingMovie = () => {
    const navigation = useNavigation<NowPlayingMovieNavigationProp>();
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState<Array<MovieItem>>([]);
    const {data = [], error, isLoading, isFetching, isSuccess} = useGetNowPlayingMovieQuery(page)

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
            onPress={(item) => navigation.navigate('MovieDetail', {movieId: item.id})}
            loadMoreData={loadMoreMovies}/>
    </View>);
}
export default NowPlayingMovie
