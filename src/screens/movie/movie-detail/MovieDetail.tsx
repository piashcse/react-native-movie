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
import { COLOR } from '../../../constant/Colors.ts';
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
      </TouchableOpacity>
    );
  };

  return isLoading ? (
    <Loading />
  ) : (
    <ScrollView style={styles.mainView}>
      <View style={styles.imageView}>
        <Image
          style={styles.imageView}
          source={{
            uri: `${Constants.IMAGE_URL}${movieDetail?.poster_path}`,
          }}
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
      <View style={styles.secondContainer}>
        <Text style={styles.title}>{movieDetail?.title}</Text>
        <View style={styles.thirdContainer}>
          <View style={styles.fourthContainer}>
            <Text style={styles.infoTitleData}>
              {movieDetail?.original_language}
            </Text>
            <Text style={styles.infoTitle}>Language</Text>
          </View>
          <View style={styles.fourthContainer}>
            <Text style={styles.infoTitleData}>
              {movieDetail?.vote_average}
            </Text>
            <Text style={styles.infoTitle}>Rating</Text>
          </View>
          <View style={styles.fourthContainer}>
            <Text style={styles.infoTitleData}>{movieDetail?.runtime} min</Text>
            <Text style={styles.infoTitle}>Duration</Text>
          </View>
          <View style={styles.fourthContainer}>
            <Text style={styles.infoTitleData}>
              {movieDetail?.release_date}
            </Text>
            <Text style={styles.infoTitle}>Release Date</Text>
          </View>
        </View>
        <Text style={styles.description}>Description</Text>
        <SeeMoreText
          text={movieDetail?.overview ?? ''}
          readMoreStyle={styles.seeMoreTextStyle}
        />
        <Text style={styles.description}>Similar</Text>
        <FlatList
          style={styles.flatListContainer}
          data={similarMovies}
          renderItem={recommendedMovieItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
        <Text style={styles.description}>Artist</Text>
        <FlatList
          style={styles.flatListContainer}
          data={castAndCrew?.cast}
          renderItem={artistItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
      </View>
    </ScrollView>
  );
};
export default MovieDetail;
