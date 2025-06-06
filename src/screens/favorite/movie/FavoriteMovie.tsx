import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import styles from './FavoriteMovie.style.ts';
import { useFavoriteStore } from '../../../zustand-store/favoriteStore.ts';
import FavoriteComponent from '../../../components/favorite/FavoriteComponent.tsx';
import { MovieDetail } from '../../../types/response/MovieDetail.ts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParam } from '../../../types/navigation/NavigationTypes.ts';
import ConfirmationAlert from '../../../components/alert-dialog/ConfirmationAlert.tsx';
import { useLocalization } from '../../../hooks/useLocalization.ts';

type FavoriteMovieNavigationProp = NavigationProp<
  RootStackParam,
  'MovieDetail'
>;

const FavoriteMovie = () => {
  const navigation = useNavigation<FavoriteMovieNavigationProp>();
  const { favoriteMovies, toggleFavoriteMovie } = useFavoriteStore();
  const localization = useLocalization();

  const [visible, setVisible] = useState(false);
  const [movieToRemove, setMovieToRemove] = useState<MovieDetail | null>(null);

  const showDialog = (movie: MovieDetail) => {
    setMovieToRemove(movie);
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
    setMovieToRemove(null);
  };

  const confirmRemoveFavorite = () => {
    if (movieToRemove) {
      toggleFavoriteMovie(movieToRemove);
    }
    hideDialog();
  };

  const favorite = ({ item }: { item: MovieDetail }) => (
    <FavoriteComponent
      title={item.title}
      poster_path={item.poster_path}
      onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
      onRemove={() => showDialog(item)}
    />
  );

  return (
    <View style={styles.mainView}>
      <FlatList
        style={styles.flatListStyle}
        data={favoriteMovies}
        renderItem={favorite}
        keyExtractor={(item) => item.id.toString()} // Ensure a unique key for each item
      />
      <ConfirmationAlert
        visible={visible}
        title={localization.TITLE}
        message={localization.MESSAGE}
        onConfirm={confirmRemoveFavorite}
        onCancel={hideDialog}
      />
    </View>
  );
};

export default FavoriteMovie;
