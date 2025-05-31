import {
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Searchbar, Text } from 'react-native-paper';
import {
  getFocusedRouteNameFromRoute,
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import styles from './DynamicSearch.style.ts';
import { MovieItem } from '../../types/response/MovieItem.ts';
import { TvSeriesItem } from '../../types/response/TvSeriesItem.ts';
import { useSearchMovieTvSeriesQuery } from '../../redux/query/rtkQuery.ts';
import { AppConstants } from '../../constant/appConstants.ts';
import { RootStackParam } from '../../types/navigation/NavigationTypes.ts';

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
  const { data = [] } = useSearchMovieTvSeriesQuery({
    query: searchQuery,
    isMovie: isMovie,
  });

  const searchItem = ({ item }: { item: SearchData }) => {
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
  return isVisible ? (
    <View style={styles.rootView}>
      <Searchbar
        style={styles.searchBarContainer}
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList
        style={styles.flatListContainer}
        data={data}
        renderItem={searchItem}
      />
    </View>
  ) : null;
};

export default DynamicSearch;
