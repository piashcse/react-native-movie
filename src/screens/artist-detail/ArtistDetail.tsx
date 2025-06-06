import React, { useEffect } from 'react';
import styles from './ArtistDetail.style.ts';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppConstants } from '../../constant/appConstants.ts';
import {
  useArtistDetailQuery,
  useLazyArtistMoviesAndTvSeriesQuery,
} from '../../redux/query/rtkQuery.ts';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import { useLocalization } from '../../hooks/useLocalization.ts';
import { Cast } from '../../types/response/ArtistAndCrew.ts';
import { RootStackParam } from '../../types/navigation/NavigationTypes.ts';
import SeeMoreText from '../../components/see-more/SeeMoreText.tsx';

type RouteParams = {
  personId: string;
};
type MovieDetailNavigationProp = NavigationProp<RootStackParam, 'MovieDetail'>;

const ArtistDetail = () => {
  const localization = useLocalization();
  const navigation = useNavigation<MovieDetailNavigationProp>();
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const { personId } = route.params;
  const { data: artistDetail } = useArtistDetailQuery(Number(personId));
  const [fetchArtistMovieAndTvSeries, { data: artistData }] =
    useLazyArtistMoviesAndTvSeriesQuery();

  useEffect(() => {
    fetchArtistMovieAndTvSeries(1);
  }, []);

  const artistMovieAndTvSeriesItem = ({ item }: { item: Cast }) => {
    return (
      <TouchableOpacity
        style={styles.movieItemContainer}
        onPress={() => {
          if (item.media_type == 'movie') {
            navigation.navigate('MovieDetail', { movieId: item.id });
          } else {
            navigation.navigate('TvSeriesDetail', { tvSeriesId: item.id });
          }
        }}
      >
        <Image
          style={styles.similarImageView}
          source={{
            uri: `${AppConstants.IMAGE_URL}${item.poster_path}`,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.mainView}>
      <View style={styles.secondContainer}>
        <SharedElement id={personId.toString()}>
          <Image
            style={styles.imageView}
            source={{
              uri: `${AppConstants.IMAGE_URL}${artistDetail?.profile_path}`,
            }}
          />
        </SharedElement>
        <View>
          <View style={styles.artistInfoContainer}>
            <Text style={styles.artistName}>{artistDetail?.name}</Text>
            <View style={styles.otherInfoContainer}>
              <Text style={styles.titleContent}>known for</Text>
              <Text style={styles.titleData}>
                {artistDetail?.known_for_department}
              </Text>
            </View>
            <View style={styles.otherInfoContainer}>
              <Text style={styles.titleContent}>Gender</Text>
              <Text style={styles.titleData}>
                {artistDetail?.gender === 1 ? 'Female' : 'Male'}
              </Text>
            </View>
            <View style={styles.otherInfoContainer}>
              <Text style={styles.titleContent}>Birthday</Text>
              <Text style={styles.titleData}>{artistDetail?.birthday}</Text>
            </View>
            <View style={styles.otherInfoContainer}>
              <Text style={styles.titleContent}>Place of Birth</Text>
              <Text style={styles.titleData}>
                {artistDetail?.place_of_birth}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.biography}>Biography</Text>
      <SeeMoreText
        text={artistDetail?.biography ?? ''}
        numberOfLines={3}
        readMoreStyle={styles.seeMoreTextStyle}
      />
      {artistData?.length && (
        <Text style={styles.description}>
          {localization.ARTIST_TV_SERIES_AND_MOVIES}
        </Text>
      )}
      <FlatList
        style={styles.flatListContainer}
        data={artistData}
        renderItem={artistMovieAndTvSeriesItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
};
export default ArtistDetail;
