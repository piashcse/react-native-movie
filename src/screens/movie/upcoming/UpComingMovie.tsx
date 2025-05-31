import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MovieItemComponent from '../../../components/movie-item/MovieItemComponent.tsx';
import styles from './UpComingMovie.style.ts';
import { useLazyUpcomingMovieQuery } from '../../../redux/query/rtkQuery.ts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MovieItem } from '../../../types/response/MovieItem.ts';
import { RootStackParam } from '../../../types/navigation/NavigationTypes.ts';

type UpComingMovieNavigationProp = NavigationProp<
  RootStackParam,
  'MovieDetail'
>;

const UpComingMovie = () => {
  const navigation = useNavigation<UpComingMovieNavigationProp>();
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Array<MovieItem>>([]);
  const [fetchUpcomingMovie, { isFetching, error }] =
    useLazyUpcomingMovieQuery();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetchUpcomingMovie({ page }).unwrap();
        setMovies((prevMovies) =>
          page === 1 ? response : [...prevMovies, ...response]
        );
      } catch (err) {
        console.error('Failed to fetch movies:', err);
      }
    };

    fetchMovies();
  }, [page]);

  const loadMoreMovies = () => {
    if (!isFetching && !error) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View style={styles.mainView}>
      <MovieItemComponent
        movies={movies}
        onPress={(item) =>
          navigation.navigate('MovieDetail', { movieId: item.id })
        }
        loadMoreData={loadMoreMovies}
      />
    </View>
  );
};

export default UpComingMovie;
