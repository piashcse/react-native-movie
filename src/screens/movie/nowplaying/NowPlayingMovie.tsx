import React, {useEffect, useState} from 'react';
import MovieItemComponent from '../../../components/movie-item/MovieItemComponent.tsx';
import {View} from 'react-native';
import styles from './NowPlayingMovie.style.ts'
import {useNowPlayingMovieQuery} from "../../../redux/query/RTKQuery.ts";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {MovieItem} from "../../../types/MovieItem.ts";
import {FooterLoading, Loading} from "../../../components/loading/Loading.tsx";
import {RootStackParam} from "../../../types/navigation/NavigationTypes.ts";

type NowPlayingMovieNavigationProp = NavigationProp<RootStackParam, 'MovieDetail'>;

const NowPlayingMovie = () => {
    const navigation = useNavigation<NowPlayingMovieNavigationProp>();
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState<Array<MovieItem>>([]);
    const {data = [], error, isFetching, isSuccess} = useNowPlayingMovieQuery(page)

    useEffect(() => {
        if (data.length) {
            setMovies((prevMovies) => page === 1 ? data : [...prevMovies, ...data]);
        }
    }, [isSuccess]);

    const loadMoreMovies = () => {
        if (!isFetching && !error) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    if (isFetching && page == 1) return <Loading/>;

    return (<View style={styles.mainView}>
        <MovieItemComponent
            movies={movies}
            onPress={(item) => navigation.navigate('MovieDetail', {movieId: item.id})}
            loadMoreData={loadMoreMovies}
            ListFooterComponent={isFetching && page > 1 ? <FooterLoading/> : null}
        />
    </View>);
}
export default NowPlayingMovie
