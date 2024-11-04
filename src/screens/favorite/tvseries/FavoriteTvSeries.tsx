import React from 'react';
import styles from './FovoriteTvSeries.style.ts';
import {FlatList, View} from 'react-native';
import {useFavoriteStore} from '../../../store/FavoriteStore.ts';
import FavoriteComponent from '../../../components/favorite/FavoriteComponent.tsx';
import {TvSeriesDetail} from '../../../types/TvSeriesDetail.ts';

const FavoriteTvSeries = () => {
  const {favoriteTvSeries} = useFavoriteStore();
  const favorite = ({item}: {item: TvSeriesDetail}) => {
    return (
      <FavoriteComponent
        title={item.name}
        poster_path={item.poster_path}
        onPress={() => {}}
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
