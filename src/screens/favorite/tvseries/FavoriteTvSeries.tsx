import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useFavoriteStore } from '../../../store/zustand/favoriteStore.ts';
import FavoriteComponent from '../../../components/favorite/FavoriteComponent.tsx';
import ConfirmationAlert from '../../../components/alert-dialog/ConfirmationAlert.tsx';
import { RootStackNavigationProp } from '../../../types/navigation/NavigationTypes.ts';
import { FavoriteTvSeries as FavoriteTvSeriesType } from '../../../types/favorite.ts';
import { screenStyles } from '../../../styles/screenStyles.ts';

const FavoriteTvSeries = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<RootStackNavigationProp>();
  const favoriteTvSeries = useFavoriteStore((state) => state.favoriteTvSeries);
  const removeFavoriteTvSeries = useFavoriteStore(
    (state) => state.removeFavoriteTvSeries
  );

  const [tvSeriesToRemove, setTvSeriesToRemove] = useState<number | null>(null);

  const confirmRemoveFavorite = () => {
    if (tvSeriesToRemove !== null) {
      removeFavoriteTvSeries(tvSeriesToRemove);
    }
    setTvSeriesToRemove(null);
  };

  const renderItem = useCallback(
    (item: FavoriteTvSeriesType) => (
      <FavoriteComponent
        title={item.name}
        posterPath={item.poster_path}
        onPress={() =>
          navigation.navigate('TvSeriesDetail', { tvSeriesId: item.id })
        }
        onRemove={() => setTvSeriesToRemove(item.id)}
        removeLabel={t('favorite.title')}
      />
    ),
    [navigation, t]
  );

  return (
    <View style={screenStyles.container}>
      <FlashList
        style={screenStyles.list}
        data={favoriteTvSeries}
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
        visible={tvSeriesToRemove !== null}
        title={t('favorite.title')}
        message={t('favorite.message')}
        onConfirm={confirmRemoveFavorite}
        onCancel={() => setTvSeriesToRemove(null)}
      />
    </View>
  );
};

export default FavoriteTvSeries;
