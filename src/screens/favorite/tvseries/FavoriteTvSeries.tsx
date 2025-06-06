import React, { useState } from 'react';
import styles from './FovoriteTvSeries.style.ts';
import { FlatList, View } from 'react-native';
import { useFavoriteStore } from '../../../zustand-store/favoriteStore.ts';
import FavoriteComponent from '../../../components/favorite/FavoriteComponent.tsx';
import { TvSeriesDetail } from '../../../types/response/TvSeriesDetail.ts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParam } from '../../../types/navigation/NavigationTypes.ts';
import ConfirmationAlert from '../../../components/alert-dialog/ConfirmationAlert.tsx';
import { useLocalization } from '../../../hooks/useLocalization.ts';

type FavoriteTvSeriesNavigationProp = NavigationProp<
  RootStackParam,
  'TvSeriesDetail'
>;

const FavoriteTvSeries = () => {
  const navigation = useNavigation<FavoriteTvSeriesNavigationProp>();
  const { favoriteTvSeries, toggleFavoriteTvSeries } = useFavoriteStore();
  const localization = useLocalization();

  const [visible, setVisible] = useState(false);
  const [tvSeriesToRemove, setTvSeriesToRemove] =
    useState<TvSeriesDetail | null>(null);

  const showDialog = (movie: TvSeriesDetail) => {
    setTvSeriesToRemove(movie);
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
    setTvSeriesToRemove(null);
  };

  const confirmRemoveFavorite = () => {
    if (tvSeriesToRemove) {
      toggleFavoriteTvSeries(tvSeriesToRemove);
    }
    hideDialog();
  };

  const favorite = ({ item }: { item: TvSeriesDetail }) => {
    return (
      <FavoriteComponent
        title={item.name}
        poster_path={item.poster_path}
        onPress={() => {
          navigation.navigate('TvSeriesDetail', { tvSeriesId: item.id });
        }}
        onRemove={() => showDialog(item)}
      />
    );
  };
  return (
    <View style={styles.mainView}>
      <FlatList
        style={styles.flatListStyle}
        data={favoriteTvSeries}
        renderItem={favorite}
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

export default FavoriteTvSeries;
