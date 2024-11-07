import React, { useEffect, useState } from 'react';
import MovieItemComponent from '../../../components/movie-item/MovieItemComponent.tsx';
import styles from './PopularMovie.style.ts';
import { View } from 'react-native';
import { usePopularMovieQuery } from '../../../redux/query/RTKQuery.ts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MovieItem } from '../../../types/MovieItem.ts';
import {
  FooterLoading,
  Loading,
} from '../../../components/loading/Loading.tsx';
import { RootStackParam } from '../../../types/navigation/NavigationTypes.ts';

type PopularMovieNavigationProp = NavigationProp<RootStackParam, 'MovieDetail'>;

const PopularMovie = () => {
  const navigation = useNavigation<PopularMovieNavigationProp>();
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Array<MovieItem>>([]);
  const {
    data = [],
    error,
    isFetching,
    isSuccess,
  } = usePopularMovieQuery(page);

  useEffect(() => {
    if (data.length) {
      setMovies((prevMovies) => (page === 1 ? data : [...prevMovies, ...data]));
    }
  }, [isSuccess]);

  const loadMoreMovies = () => {
    if (!isFetching && !error) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (isFetching && page == 1) return <Loading />;

  return (
    <View style={styles.mainView}>
      <MovieItemComponent
        movies={movies}
        onPress={(item) =>
          navigation.navigate('MovieDetail', { movieId: item.id })
        }
        loadMoreData={loadMoreMovies}
        ListFooterComponent={isFetching && page > 1 ? <FooterLoading /> : null}
      />
    </View>
  );
};
export default PopularMovie;
