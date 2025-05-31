import React, { useEffect, useState } from 'react';
import MovieItemComponent from '../../../components/movie-item/MovieItemComponent.tsx';
import styles from './PopularMovie.style.ts';
import { View } from 'react-native';
import { useLazyPopularMovieQuery } from '../../../redux/query/rtkQuery.ts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MovieItem } from '../../../types/response/MovieItem.ts';
import { RootStackParam } from '../../../types/navigation/NavigationTypes.ts';

type PopularMovieNavigationProp = NavigationProp<RootStackParam, 'MovieDetail'>;

const PopularMovie = () => {
  const navigation = useNavigation<PopularMovieNavigationProp>();
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Array<MovieItem>>([]);
  const [fetchPopularMovie, { isFetching, error }] = useLazyPopularMovieQuery();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetchPopularMovie({ page }).unwrap();
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

export default PopularMovie;
