import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLazyPopularMovieQuery } from '../../../service/rtk-query/rtkQuery.ts';
import { usePaginatedQuery } from '../../../hooks/usePaginatedQuery.ts';
import PaginatedMediaList from '../../../components/media/PaginatedMediaList.tsx';
import MediaPosterCard from '../../../components/media/MediaPosterCard.tsx';
import { screenStyles } from '../../../styles/screenStyles.ts';
import { RootStackNavigationProp } from '../../../types/navigation/NavigationTypes.ts';
import { MovieItem } from '../../../types/response/MovieItem.ts';

const getId = (item: MovieItem) => item.id;
const keyExtractor = (item: MovieItem) => String(item.id);

const PopularMovie = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [fetchPopular] = useLazyPopularMovieQuery();
  const fetchPage = useCallback(
    (page: number) => fetchPopular({ page }).unwrap(),
    [fetchPopular]
  );
  const list = usePaginatedQuery({ fetchPage, getId });

  const renderItem = useCallback(
    (item: MovieItem) => (
      <MediaPosterCard
        posterPath={item.poster_path}
        onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
        accessibilityLabel={item.title}
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

export default PopularMovie;
