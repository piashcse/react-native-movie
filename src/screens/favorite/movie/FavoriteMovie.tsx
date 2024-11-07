import React from 'react';
import { FlatList, View } from 'react-native';
import styles from './FavoriteMovie.style.ts';
import { useFavoriteStore } from '../../../store/FavoriteStore.ts';
import FavoriteComponent from '../../../components/favorite/FavoriteComponent.tsx';
import { MovieDetail } from '../../../types/MovieDetail.ts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParam } from '../../../types/navigation/NavigationTypes.ts';

type FavoriteMovieNavigationProp = NavigationProp<
  RootStackParam,
  'MovieDetail'
>;
const FavoriteMovie = () => {
  const navigation = useNavigation<FavoriteMovieNavigationProp>();
  const { favoriteMovies, toggleFavoriteMovie } = useFavoriteStore();
  const favorite = ({ item }: { item: MovieDetail }) => {
    return (
      <FavoriteComponent
        title={item.title}
        poster_path={item.poster_path}
        onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
        onRemove={() => {
          toggleFavoriteMovie(item);
        }}
      />
    );
  };
  return (
    <View style={styles.mainView}>
      <FlatList
        style={styles.flatListStyle}
        data={favoriteMovies}
        renderItem={favorite}
      />
    </View>
  );
};
export default FavoriteMovie;
