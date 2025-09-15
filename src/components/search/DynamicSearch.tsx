import {
  getFocusedRouteNameFromRoute,
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Searchbar, Text } from 'react-native-paper';
import styles from './DynamicSearch.style.ts';
import { AppConstants } from '../../constant/appConstants.ts';
import { CelebrityItem } from '../../types/response/Celebrity.ts';
import { MovieItem } from '../../types/response/MovieItem.ts';
import { RootStackParam } from '../../types/navigation/NavigationTypes.ts';
import { TvSeriesItem } from '../../types/response/TvSeriesItem.ts';
import {
  useSearchCelebrityQuery,
  useSearchMovieTvSeriesQuery,
} from '../../service/rtk-query/rtkQuery.ts';

export type SearchData = MovieItem & TvSeriesItem;

export interface SearchParams {
  query: string;
  isMovie: boolean;
}
type SearchNavigationProp = NavigationProp<RootStackParam, 'SearchNavigation'>;

const DynamicSearch = ({ isVisible }: { isVisible: boolean }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<SearchNavigationProp>();
  const route = useRoute();
  const tabName = getFocusedRouteNameFromRoute(route) || 'Movie';
  const isMovie = tabName === 'Movie';
  const isCelebrity = tabName === 'Celebrities';
  
  const { data: movieTvData = [] } = useSearchMovieTvSeriesQuery(
    {
      query: searchQuery,
      isMovie: isMovie,
    },
    { skip: isCelebrity || !searchQuery }
  );
  
  const { data: celebrityData = [] } = useSearchCelebrityQuery(searchQuery, {
    skip: !isCelebrity || !searchQuery,
  });

  const renderMovieTvItem = ({ item }: { item: SearchData }) => {
    return (
      <TouchableOpacity
        style={styles.itemListContainer}
        onPress={() => {
          if (isMovie) {
            navigation.navigate('MovieDetail', { movieId: item.id });
          } else {
            navigation.navigate('TvSeriesDetail', { tvSeriesId: item.id });
          }
        }}
      >
        <ImageBackground
          style={styles.imageView}
          imageStyle={styles.backgroundImage}
          source={{ uri: `${AppConstants.IMAGE_URL}${item.poster_path}` }}
        >
          <Image
            style={styles.imageView}
            source={{
              uri: `${AppConstants.IMAGE_URL}${item.poster_path}`,
            }}
          />
        </ImageBackground>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>
            {isMovie ? item.title : item.name}
          </Text>
          <Text>{isMovie ? item.release_date : item.first_air_date}</Text>
          <Text>Rating: {isMovie ? item.vote_average : item.vote_average}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCelebrityItem = ({ item }: { item: CelebrityItem }) => {
    return (
      <TouchableOpacity
        style={styles.itemListContainer}
        onPress={() => {
          navigation.navigate('ArtistDetail', { personId: item.id });
        }}
      >
        <ImageBackground
          style={styles.imageView}
          imageStyle={styles.backgroundImage}
          source={{ uri: `${AppConstants.IMAGE_URL}${item.profile_path}` }}
        >
          <Image
            style={styles.imageView}
            source={{
              uri: `${AppConstants.IMAGE_URL}${item.profile_path}`,
            }}
          />
        </ImageBackground>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>{item.name}</Text>
          <Text>Popularity: {item.popularity.toFixed(1)}</Text>
          <Text>Known for: {item.known_for_department}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return isVisible ? (
    <View style={styles.rootView}>
      <Searchbar
        style={styles.searchBarContainer}
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      {isCelebrity ? (
        <FlashList
          style={styles.flatListContainer}
          data={celebrityData}
          renderItem={renderCelebrityItem}
          keyExtractor={(item: CelebrityItem) => item.id.toString()}
        />
      ) : (
        <FlashList
          style={styles.flatListContainer}
          data={movieTvData}
          renderItem={renderMovieTvItem}
          keyExtractor={(item: SearchData) => item.id.toString()}
        />
      )}
    </View>
  ) : null;
};

export default DynamicSearch;
