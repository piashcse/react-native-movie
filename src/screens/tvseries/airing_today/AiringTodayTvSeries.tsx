import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLazyAiringTodayTvSeriesQuery } from '../../../service/rtk-query/rtkQuery.ts';
import { usePaginatedQuery } from '../../../hooks/usePaginatedQuery.ts';
import PaginatedMediaList from '../../../components/media/PaginatedMediaList.tsx';
import MediaPosterCard from '../../../components/media/MediaPosterCard.tsx';
import { screenStyles } from '../../../styles/screenStyles.ts';
import { RootStackNavigationProp } from '../../../types/navigation/NavigationTypes.ts';
import { TvSeriesItem } from '../../../types/response/TvSeriesItem.ts';

const getId = (item: TvSeriesItem) => item.id;
const keyExtractor = (item: TvSeriesItem) => String(item.id);

const AiringTodayTvSeries = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [fetchAiringToday] = useLazyAiringTodayTvSeriesQuery();
  const fetchPage = useCallback(
    (page: number) => fetchAiringToday({ page }).unwrap(),
    [fetchAiringToday]
  );
  const list = usePaginatedQuery({ fetchPage, getId });

  const renderItem = useCallback(
    (item: TvSeriesItem) => (
      <MediaPosterCard
        posterPath={item.poster_path}
        onPress={() =>
          navigation.navigate('TvSeriesDetail', { tvSeriesId: item.id })
        }
        accessibilityLabel={item.name}
      />
    ),
    [navigation]
  );

  return (
    <View style={screenStyles.container}>
      <PaginatedMediaList
        items={list.items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={list.loadMore}
        isLoading={list.isLoading}
        isFetchingMore={list.isFetchingMore}
        isRefreshing={list.isRefreshing}
        onRefresh={list.refresh}
        error={list.error}
        onRetry={list.retry}
      />
    </View>
  );
};

export default AiringTodayTvSeries;
