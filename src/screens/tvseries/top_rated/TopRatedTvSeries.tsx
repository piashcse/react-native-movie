import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import styles from './TopRatedTvSeries.style.ts';
import { useLazyTopRatedTvSeriesQuery } from '../../../redux/query/rtkQuery.ts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TvSeriesItem } from '../../../types/response/TvSeriesItem.ts';
import TvSeriesItemComponent from '../../../components/tvseries-item/TvSeriesItemComponent.tsx';
import { RootStackParam } from '../../../types/navigation/NavigationTypes.ts';

type TopRatedTvSeriesNavigationProp = NavigationProp<
  RootStackParam,
  'TvSeriesDetail'
>;

const TopRatedTvSeries = () => {
  const navigation = useNavigation<TopRatedTvSeriesNavigationProp>();
  const [page, setPage] = useState(1);
  const [tvSeries, setTvSeries] = useState<Array<TvSeriesItem>>([]);
  const [fetchTopRatedTvSeries, { isFetching, error }] =
    useLazyTopRatedTvSeriesQuery();

  useEffect(() => {
    const fetchTvSeries = async () => {
      try {
        const response = await fetchTopRatedTvSeries({ page }).unwrap();
        setTvSeries((prevTvSeries) =>
          page === 1 ? response : [...prevTvSeries, ...response]
        );
      } catch (err) {
        console.error('Failed to fetch TV series:', err);
      }
    };

    fetchTvSeries();
  }, [page]);

  const loadMoreTvSeries = () => {
    if (!isFetching && !error) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View style={styles.mainView}>
      <TvSeriesItemComponent
        tvSeries={tvSeries}
        onPress={(item) => {
          navigation.navigate('TvSeriesDetail', { tvSeriesId: item.id });
        }}
        loadMoreData={loadMoreTvSeries}
      />
    </View>
  );
};

export default TopRatedTvSeries;
