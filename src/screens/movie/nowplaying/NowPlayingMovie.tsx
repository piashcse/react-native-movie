import React, { useEffect, useState } from 'react';
import MovieItemComponent from '../../../components/movie-item/MovieItemComponent.tsx';
import { View } from 'react-native';
import styles from './NowPlayingMovie.style.ts';
import { useLazyNowPlayingMovieQuery } from '../../../redux/query/rtkQuery.ts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { MovieItem } from '../../../types/response/MovieItem.ts';
import { RootStackParam } from '../../../types/navigation/NavigationTypes.ts';

type NowPlayingMovieNavigationProp = NavigationProp<
  RootStackParam,
  'MovieDetail'
>;

const NowPlayingMovie = () => {
  const navigation = useNavigation<NowPlayingMovieNavigationProp>();
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Array<MovieItem>>([]);
  const [fetchNowPlayingMovie, { isFetching, error }] =
    useLazyNowPlayingMovieQuery();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetchNowPlayingMovie({ page }).unwrap();
        setMovies((prevMovies) => [...prevMovies, ...response]);
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

export default NowPlayingMovie;
