import React, { useState } from 'react';
import styles from './FovoriteTvSeries.style.ts';
import { FlatList, View } from 'react-native';
import { useFavoriteStore } from '../../../store/FavoriteStore.ts';
import FavoriteComponent from '../../../components/favorite/FavoriteComponent.tsx';
import { TvSeriesDetail } from '../../../types/TvSeriesDetail.ts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParam } from '../../../types/navigation/NavigationTypes.ts';
import ConfirmationAlert from '../../../components/alert-dialog/ConfirmationAlert.tsx';
import { MovieDetail } from '../../../types/MovieDetail.ts';

type FavoriteTvSeriesNavigationProp = NavigationProp<
  RootStackParam,
  'TvSeriesDetail'
>;

const FavoriteTvSeries = () => {
  const navigation = useNavigation<FavoriteTvSeriesNavigationProp>();
  const { favoriteTvSeries, toggleFavoriteTvSeries } = useFavoriteStore();
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
        title={'Remove Favorite'}
        message={'Are you sure you want to remove from your favorites?'}
        onConfirm={confirmRemoveFavorite}
        onCancel={hideDialog}
      />
    </View>
  );
};

export default FavoriteTvSeries;
