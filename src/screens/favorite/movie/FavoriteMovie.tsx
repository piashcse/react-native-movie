import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useFavoriteStore } from '../../../store/zustand/favoriteStore.ts';
import FavoriteComponent from '../../../components/favorite/FavoriteComponent.tsx';
import ConfirmationAlert from '../../../components/alert-dialog/ConfirmationAlert.tsx';
import { RootStackNavigationProp } from '../../../types/navigation/NavigationTypes.ts';
import { FavoriteMovie as FavoriteMovieType } from '../../../types/favorite.ts';
import { screenStyles } from '../../../styles/screenStyles.ts';

const FavoriteMovie = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<RootStackNavigationProp>();
  const favoriteMovies = useFavoriteStore((state) => state.favoriteMovies);
  const removeFavoriteMovie = useFavoriteStore(
    (state) => state.removeFavoriteMovie
  );

  const [movieToRemove, setMovieToRemove] = useState<number | null>(null);

  const confirmRemoveFavorite = () => {
    if (movieToRemove !== null) {
      removeFavoriteMovie(movieToRemove);
    }
    setMovieToRemove(null);
  };

  const renderItem = useCallback(
    (item: FavoriteMovieType) => (
      <FavoriteComponent
        title={item.title}
        posterPath={item.poster_path}
        onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
        onRemove={() => setMovieToRemove(item.id)}
        removeLabel={t('favorite.title')}
      />
    ),
    [navigation, t]
  );

  return (
    <View style={screenStyles.container}>
      <FlashList
        style={screenStyles.list}
        data={favoriteMovies}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={
          <View style={screenStyles.empty}>
            <Text style={screenStyles.emptyText}>
              {t('common.emptyFavorites')}
            </Text>
          </View>
        }
      />
      <ConfirmationAlert
        visible={movieToRemove !== null}
        title={t('favorite.title')}
        message={t('favorite.message')}
        onConfirm={confirmRemoveFavorite}
        onCancel={() => setMovieToRemove(null)}
      />
    </View>
  );
};

export default FavoriteMovie;
