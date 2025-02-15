import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  FooterLoading,
  Loading,
} from '../../../components/loading/Loading.tsx';
import styles from './AiringTodayTvSeries.style.ts';
import { useLazyAiringTodayTvSeriesQuery } from '../../../redux/query/RTKQuery.ts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TvSeriesItem } from '../../../types/TvSeriesItem.ts';
import TvSeriesItemComponent from '../../../components/tvseries-item/TvSeriesItemComponent.tsx';
import { RootStackParam } from '../../../types/navigation/NavigationTypes.ts';

type AiringTodayTvSeriesNavigationProp = NavigationProp<
  RootStackParam,
  'TvSeriesDetail'
>;

const AiringTodayTvSeries = () => {
  const navigation = useNavigation<AiringTodayTvSeriesNavigationProp>();
  const [page, setPage] = useState(1);
  const [tvSeries, setTvSeries] = useState<Array<TvSeriesItem>>([]);
  const [fetchAiringToday, { isFetching, error }] =
    useLazyAiringTodayTvSeriesQuery();

  useEffect(() => {
    const fetchTvSeries = async () => {
      try {
        const response = await fetchAiringToday({ page }).unwrap();
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

  if (isFetching && page === 1) return <Loading />;

  return (
    <View style={styles.mainView}>
      <TvSeriesItemComponent
        tvSeries={tvSeries}
        onPress={(item) => {
          navigation.navigate('TvSeriesDetail', { tvSeriesId: item.id });
        }}
        loadMoreData={loadMoreTvSeries}
        ListFooterComponent={isFetching && page > 1 ? <FooterLoading /> : null}
      />
    </View>
  );
};

export default AiringTodayTvSeries;
