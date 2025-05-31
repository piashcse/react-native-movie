import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import styles from './OnTheAirTvSeries.style.ts';
import { useLazyOnTheAirTvSeriesQuery } from '../../../redux/query/rtkQuery.ts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TvSeriesItem } from '../../../types/response/TvSeriesItem.ts';
import TvSeriesItemComponent from '../../../components/tvseries-item/TvSeriesItemComponent.tsx';
import { RootStackParam } from '../../../types/navigation/NavigationTypes.ts';

type OnTheAirTvNavigationProp = NavigationProp<
  RootStackParam,
  'TvSeriesDetail'
>;

const OnTheAirTvSeries = () => {
  const navigation = useNavigation<OnTheAirTvNavigationProp>();
  const [page, setPage] = useState(1);
  const [tvSeries, setTvSeries] = useState<Array<TvSeriesItem>>([]);
  const [fetchOnTheAirTvSeries, { isFetching, error }] =
    useLazyOnTheAirTvSeriesQuery();

  useEffect(() => {
    const fetchTvSeries = async () => {
      try {
        const response = await fetchOnTheAirTvSeries({ page }).unwrap();
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

export default OnTheAirTvSeries;
