import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLazyTrendingCelebrityQuery } from '../../../service/rtk-query/rtkQuery.ts';
import { usePaginatedQuery } from '../../../hooks/usePaginatedQuery.ts';
import PaginatedMediaList from '../../../components/media/PaginatedMediaList.tsx';
import CelebrityCard from '../../../components/media/CelebrityCard.tsx';
import { screenStyles } from '../../../styles/screenStyles.ts';
import { RootStackNavigationProp } from '../../../types/navigation/NavigationTypes.ts';
import { CelebrityItem } from '../../../types/response/Celebrity.ts';

const getId = (item: CelebrityItem) => item.id;
const keyExtractor = (item: CelebrityItem) => String(item.id);

const TrendingCelebrity = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [fetchTrending] = useLazyTrendingCelebrityQuery();
  const fetchPage = useCallback(
    (page: number) => fetchTrending({ page }).unwrap(),
    [fetchTrending]
  );
  const list = usePaginatedQuery({ fetchPage, getId });

  const renderItem = useCallback(
    (item: CelebrityItem) => (
      <CelebrityCard
        name={item.name}
        profilePath={item.profile_path}
        popularity={item.popularity}
        onPress={() =>
          navigation.navigate('ArtistDetail', { personId: item.id })
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

export default TrendingCelebrity;
