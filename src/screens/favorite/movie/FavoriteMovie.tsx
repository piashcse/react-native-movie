import React from 'react';
import {FlatList, View} from 'react-native';
import styles from './FavoriteMovie.style.ts';
import {useFavoriteStore} from '../../../store/FavoriteStore.ts';
import FavoriteComponent from '../../../components/favorite/FavoriteComponent.tsx';
import {MovieDetail} from '../../../types/MovieDetail.ts';

const FavoriteMovie = () => {
  const {favoriteMovies} = useFavoriteStore();
  const favorite = ({item}: {item: MovieDetail}) => {
    return (
      <FavoriteComponent
        title={item.title}
        poster_path={item.poster_path}
        onPress={() => {}}
      />
    );
  };
  return (
    <View style={styles.mainView}>
      <FlatList style={styles.flatListStyle} data={favoriteMovies} renderItem={favorite} />
    </View>
  );
};
export default FavoriteMovie;
