import React from 'react';
import { Loading } from '../../../components/loading/Loading.tsx';
import styles from './MovieDetail.style.ts';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Constants } from '../../../constant/AppConstants.ts';
import {
  useGetArtistAndCrewQuery,
  useGetMovieDetailQuery,
  useGetSimilarMovieQuery,
} from '../../../redux/query/RTKQuery.ts';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { MovieItem } from '../../../types/MovieItem.ts';
import { Cast } from '../../../types/ArtistAndCrew.ts';
import { RootStackParam } from '../../../types/navigation/NavigationTypes.ts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFavoriteStore } from '../../../local-store/FavoriteStore.ts';
import SeeMoreText from '../../../components/see-more/SeeMoreText.tsx';
import { detailInfo } from '../../../constant/Dictionary.ts';
type RouteParams = {
  movieId: string;
};
type MovieDetailNavigationProp = NavigationProp<RootStackParam, 'MovieDetail'>;
const MovieDetail = () => {
  const navigation = useNavigation<MovieDetailNavigationProp>();
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const { movieId } = route.params;
  const { data: movieDetail, isFetching: isLoadingMovieDetail } =
    useGetMovieDetailQuery(Number(movieId));
  const { data: similarMovies, isFetching: isLoadingSimilarMovies } =
    useGetSimilarMovieQuery(Number(movieId));
  const { data: castAndCrew, isFetching: isLoadingCastAndCrew } =
    useGetArtistAndCrewQuery(Number(movieId));
  const { toggleFavoriteMovie, isFavoriteMovie } = useFavoriteStore();

  const isLoading =
    isLoadingMovieDetail || isLoadingSimilarMovies || isLoadingCastAndCrew;

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
            uri: `${Constants.IMAGE_URL}${item.poster_path}`,
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
        <Image
          style={styles.artistImageView}
          source={{
            uri: `${Constants.IMAGE_URL}${item.profile_path}`,
          }}
        />
        <Text style={styles.artistTitleStyle} numberOfLines={1}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return isLoading ? (
    <Loading />
  ) : (
    <ScrollView style={styles.mainView}>
      <View>
        <View style={styles.backdropImageView}>
          <ImageBackground
            style={styles.backdropImageView}
            source={{
              uri: `${Constants.IMAGE_URL}${movieDetail?.backdrop_path}`,
            }}
            blurRadius={1.56}
          />
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
              uri: `${Constants.IMAGE_URL}${movieDetail?.poster_path}`,
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
                  <Text style={styles.infoTitle}>{detailInfo.language}</Text>
                  <Text style={styles.infoTitleData}>
                    {movieDetail?.original_language}
                  </Text>
                </View>
                <View style={styles.fourthContainer}>
                  <Text style={styles.infoTitle}>{detailInfo.rating}</Text>
                  <Text style={styles.infoTitleData}>
                    {movieDetail?.vote_average?.toFixed(1)}
                  </Text>
                </View>
              </View>
              <View style={styles.infoContainer}>
                <View style={styles.fourthContainer}>
                  <Text style={styles.infoTitle}>{detailInfo.duration}</Text>
                  <Text style={styles.infoTitleData}>
                    {movieDetail?.runtime} {detailInfo.min}
                  </Text>
                </View>
                <View style={styles.fourthContainer}>
                  <Text style={styles.infoTitle}>{detailInfo.releaseDate}</Text>
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
        <Text style={styles.description}>{detailInfo.description}</Text>
        <SeeMoreText
          text={movieDetail?.overview ?? ''}
          readMoreStyle={styles.seeMoreTextStyle}
        />
        {similarMovies?.length && (
          <Text style={styles.description}>{detailInfo.similar}</Text>
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
          <Text style={styles.description}>{detailInfo.artist}</Text>
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
