import React, { useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { Searchbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import styles from './DynamicSearch.style.ts';
import { CelebrityItem } from '../../types/response/Celebrity.ts';
import { RootStackNavigationProp } from '../../types/navigation/NavigationTypes.ts';
import { SearchData } from '../../types/api.ts';
import {
  useSearchCelebrityQuery,
  useSearchMovieTvSeriesQuery,
} from '../../service/rtk-query/rtkQuery.ts';
import { useDebouncedValue } from '../../hooks/useDebouncedValue.ts';
import PosterImage from '../media/PosterImage.tsx';
import SearchListSkeleton from '../media/SearchListSkeleton.tsx';

const MIN_SEARCH_LENGTH = 2;

const DynamicSearch = ({ isVisible }: { isVisible: boolean }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute();
  const tabName = getFocusedRouteNameFromRoute(route) || 'Movie';
  const isMovie = tabName === 'Movie';
  const isCelebrity = tabName === 'Celebrities';
  const debouncedQuery = useDebouncedValue(searchQuery.trim(), 400);
  const canSearch = debouncedQuery.length >= MIN_SEARCH_LENGTH;

  const movieTvQuery = useSearchMovieTvSeriesQuery(
    {
      query: debouncedQuery,
      isMovie,
    },
    { skip: isCelebrity || !canSearch }
  );

  const celebrityQuery = useSearchCelebrityQuery(debouncedQuery, {
    skip: !isCelebrity || !canSearch,
  });

  const renderMovieTvItem = useCallback(
    (item: SearchData) => {
      const title = 'title' in item ? item.title : item.name;
      const date =
        'release_date' in item ? item.release_date : item.first_air_date;

      return (
        <Pressable
          style={styles.itemListContainer}
          onPress={() => {
            if (isMovie) {
              navigation.navigate('MovieDetail', { movieId: item.id });
            } else {
              navigation.navigate('TvSeriesDetail', { tvSeriesId: item.id });
            }
          }}
          accessibilityRole="button"
          accessibilityLabel={title}
        >
          <PosterImage
            path={item.poster_path}
            size="w185"
            style={styles.imageView}
            accessibilityLabel={title}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.titleStyle}>{title}</Text>
            <Text>{date}</Text>
            <Text>
              {t('common.rating')}: {item.vote_average}
            </Text>
          </View>
        </Pressable>
      );
    },
    [isMovie, navigation, t]
  );

  const renderCelebrityItem = useCallback(
    (item: CelebrityItem) => (
      <Pressable
        style={styles.itemListContainer}
        onPress={() =>
          navigation.navigate('ArtistDetail', { personId: item.id })
        }
        accessibilityRole="button"
        accessibilityLabel={item.name}
      >
        <PosterImage
          path={item.profile_path}
          size="w185"
          style={styles.imageView}
          accessibilityLabel={item.name}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>{item.name}</Text>
          <Text>
            {t('common.popularity')}: {item.popularity.toFixed(1)}
          </Text>
          <Text>
            {t('common.knownFor')}: {item.known_for_department}
          </Text>
        </View>
      </Pressable>
    ),
    [navigation, t]
  );

  if (!isVisible) {
    return null;
  }

  const activeQuery = isCelebrity ? celebrityQuery : movieTvQuery;
  const data = isCelebrity ? celebrityQuery.data : movieTvQuery.data;
  const isInitialLoading = activeQuery.isFetching && !data?.length;

  return (
    <View style={styles.rootView}>
      <Searchbar
        style={styles.searchBarContainer}
        placeholder={t('common.search')}
        onChangeText={setSearchQuery}
        value={searchQuery}
        accessibilityLabel={t('common.search')}
      />
      {isInitialLoading ? (
        <SearchListSkeleton />
      ) : isCelebrity ? (
        <FlashList
          style={styles.flatListContainer}
          data={celebrityQuery.data ?? []}
          renderItem={({ item }) => renderCelebrityItem(item)}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={
            canSearch ? (
              <Text style={styles.emptyText}>{t('common.noResults')}</Text>
            ) : null
          }
        />
      ) : (
        <FlashList
          style={styles.flatListContainer}
          data={movieTvQuery.data ?? []}
          renderItem={({ item }) => renderMovieTvItem(item)}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={
            canSearch ? (
              <Text style={styles.emptyText}>{t('common.noResults')}</Text>
            ) : null
          }
        />
      )}
    </View>
  );
};

export default DynamicSearch;
