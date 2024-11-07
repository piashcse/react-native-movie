import React from 'react';
import styles from './FovoriteTvSeries.style.ts';
import { FlatList, View } from 'react-native';
import { useFavoriteStore } from '../../../store/FavoriteStore.ts';
import FavoriteComponent from '../../../components/favorite/FavoriteComponent.tsx';
import { TvSeriesDetail } from '../../../types/TvSeriesDetail.ts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParam } from '../../../types/navigation/NavigationTypes.ts';

type FavoriteTvSeriesNavigationProp = NavigationProp<
  RootStackParam,
  'TvSeriesDetail'
>;

const FavoriteTvSeries = () => {
  const navigation = useNavigation<FavoriteTvSeriesNavigationProp>();
  const { favoriteTvSeries, toggleFavoriteTvSeries } = useFavoriteStore();
  const favorite = ({ item }: { item: TvSeriesDetail }) => {
    return (
      <FavoriteComponent
        title={item.name}
        poster_path={item.poster_path}
        onPress={() => {
          navigation.navigate('TvSeriesDetail', { tvSeriesId: item.id });
        }}
        onRemove={() => {
          toggleFavoriteTvSeries(item);
        }}
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
    </View>
  );
};

export default FavoriteTvSeries;
