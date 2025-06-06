import React from 'react';
import styles from './MovieDetail.style.ts';
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppConstants } from '../../../constant/appConstants.ts';
import {
  useArtistAndCrewQuery,
  useMovieDetailQuery,
  useSimilarMovieQuery,
} from '../../../redux/query/rtkQuery.ts';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { MovieItem } from '../../../types/response/MovieItem.ts';
import { Cast } from '../../../types/response/ArtistAndCrew.ts';
import { RootStackParam } from '../../../types/navigation/NavigationTypes.ts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFavoriteStore } from '../../../zustand-store/favoriteStore.ts';
import SeeMoreText from '../../../components/see-more/SeeMoreText.tsx';
import { SharedElement } from 'react-navigation-shared-element';
import { useLocalization } from '../../../hooks/useLocalization.ts';

type RouteParams = {
  movieId: string;
};
type MovieDetailNavigationProp = NavigationProp<RootStackParam, 'MovieDetail'>;
const MovieDetail = () => {
  const localization = useLocalization();
  const navigation = useNavigation<MovieDetailNavigationProp>();
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const { movieId } = route.params;
  const { data: movieDetail } = useMovieDetailQuery(Number(movieId));
  const { data: similarMovies } = useSimilarMovieQuery(Number(movieId));
  const { data: castAndCrew } = useArtistAndCrewQuery(Number(movieId));
  const { toggleFavoriteMovie, isFavoriteMovie } = useFavoriteStore();

  const onPressFavorite = () => {
    if (movieDetail) {
      toggleFavoriteMovie(movieDetail);
    }
  };

  const recommendedMovieItem = ({ item }: { item: MovieItem }) => {
    return (
      <TouchableOpacity
        style={styles.movieItemContainer}
        onPress={() => navigation.navigate('MovieDetail', { movieId: item.id })}
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
  const artistItem = ({ item }: { item: Cast }) => {
    return (
      <TouchableOpacity
        style={styles.movieItemContainer}
        onPress={() => {
          navigation.navigate('ArtistDetail', { personId: item.id });
        }}
      >
        <SharedElement id={item.id.toString()}>
          <Image
            style={styles.artistImageView}
            source={{
              uri: `${AppConstants.IMAGE_URL}${item.profile_path}`,
            }}
          />
          <Text style={styles.artistTitleStyle} numberOfLines={1}>
            {item.name}
          </Text>
        </SharedElement>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.mainView}>
      <View>
        <View style={styles.backdropImageView}>
          <SharedElement id={`movie.${movieId}.poster`}>
            <ImageBackground
              style={styles.backdropImageView}
              source={{
                uri: `${AppConstants.IMAGE_URL}${movieDetail?.backdrop_path}`,
              }}
              blurRadius={1.56}
            />
          </SharedElement>
          <TouchableOpacity
            style={styles.favoriteContainer}
            onPress={onPressFavorite}
          >
            <MaterialIcons
              name={'favorite'}
              size={24}
              color={isFavoriteMovie(Number(movieId)) ? 'red' : 'grey'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.posterImageContainer}>
          <Image
            style={styles.posterImageView}
            source={{
              uri: `${AppConstants.IMAGE_URL}${movieDetail?.poster_path}`,
            }}
            resizeMode={'stretch'}
          />
          <View style={styles.secondContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {movieDetail?.title}
            </Text>
            <View>
              <View style={styles.titleAndInfoContainer}>
                <View style={styles.fourthContainer}>
                  <Text style={styles.infoTitle}>{localization.LANGUAGE}</Text>
                  <Text style={styles.infoTitleData}>
                    {movieDetail?.original_language}
                  </Text>
                </View>
                <View style={styles.fourthContainer}>
                  <Text style={styles.infoTitle}>{localization.RATING}</Text>
                  <Text style={styles.infoTitleData}>
                    {movieDetail?.vote_average?.toFixed(1)}
                  </Text>
                </View>
              </View>
              <View style={styles.infoContainer}>
                <View style={styles.fourthContainer}>
                  <Text style={styles.infoTitle}>{localization.DURATION}</Text>
                  <Text style={styles.infoTitleData}>
                    {movieDetail?.runtime} {localization.MIN}
                  </Text>
                </View>
                <View style={styles.fourthContainer}>
                  <Text style={styles.infoTitle}>
                    {localization.RELEASE_DATE}
                  </Text>
                  <Text style={styles.infoTitleData}>
                    {movieDetail?.release_date}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.description}>{localization.DESCRIPTION}</Text>
        <SeeMoreText
          text={movieDetail?.overview ?? ''}
          readMoreStyle={styles.seeMoreTextStyle}
          numberOfLines={2}
        />
        {similarMovies?.length && (
          <Text style={styles.description}>{localization.SIMILAR}</Text>
        )}
        <FlatList
          style={styles.flatListContainer}
          data={similarMovies}
          renderItem={recommendedMovieItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        {castAndCrew?.cast?.length && (
          <Text style={styles.description}>{localization.ARTIST}</Text>
        )}
        <FlatList
          style={styles.flatListContainer}
          data={castAndCrew?.cast}
          renderItem={artistItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};
export default MovieDetail;
