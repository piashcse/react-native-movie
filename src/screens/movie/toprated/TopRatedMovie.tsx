import React, {useEffect, useState} from 'react';
import {FooterLoading, Loading} from '../../../components/loading/Loading.tsx';
import MovieItemComponent from '../../../components/movie-item/MovieItemComponent.tsx';
import styles from './TopRatedMovie.Style.ts'
import {View} from "react-native";
import { useTopRatedMovieQuery} from "../../../redux/query/RTKQuery.ts";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {MovieItem} from "../../../types/MovieItem.ts";

type RootStackParamList = {
    MovieDetail: { movieId: number };
};
type TopRatedMovieNavigationProp = NavigationProp<RootStackParamList, 'MovieDetail'>;

const TopRatedMovie = () => {
    const navigation = useNavigation<TopRatedMovieNavigationProp>();
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState<Array<MovieItem>>([]);
    const {data = [], error, isLoading, isFetching, isSuccess} = useTopRatedMovieQuery(page);

    useEffect(() => {
        if (data.length) {
            setMovies((prevMovies) => page === 1 ? data : [...prevMovies, ...data]);
        }
    }, [isSuccess]);

    const loadMoreMovies = () => {
        if (!isFetching && !isLoading && !error) {
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
export default TopRatedMovie
