import React, { useCallback } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import {
  useArtistAndCrewQuery,
  useMovieDetailQuery,
  useRecommendedTvSeriesQuery,
  useSimilarMovieQuery,
  useTvSeriesArtistAndCrewQuery,
  useTvSeriesDetailQuery,
} from '../../service/rtk-query/rtkQuery.ts';
import { useFavoriteStore } from '../../store/zustand/favoriteStore.ts';
import { RootStackNavigationProp } from '../../types/navigation/NavigationTypes.ts';
import { MovieItem } from '../../types/response/MovieItem.ts';
import { TvSeriesItem } from '../../types/response/TvSeriesItem.ts';
import { Cast } from '../../types/response/ArtistAndCrew.ts';
import SeeMoreText from '../../components/see-more/SeeMoreText.tsx';
import PosterImage from '../../components/media/PosterImage.tsx';
import MediaPosterCard from '../../components/media/MediaPosterCard.tsx';
import HorizontalList from '../../components/media/HorizontalList.tsx';
import DetailSkeleton from '../../components/media/DetailSkeleton.tsx';
import { mediaDetailStyles as styles } from './MediaDetail.styles.ts';

type MediaKind = 'movie' | 'tv';

interface MediaDetailProps {
  kind: MediaKind;
  id: number;
}

const MediaDetail = ({ kind, id }: MediaDetailProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation<RootStackNavigationProp>();
  const isMovie = kind === 'movie';

  const movieDetailQuery = useMovieDetailQuery(id, { skip: !isMovie });
  const tvDetailQuery = useTvSeriesDetailQuery(id, { skip: isMovie });
  const movieSimilarQuery = useSimilarMovieQuery(id, { skip: !isMovie });
  const tvSimilarQuery = useRecommendedTvSeriesQuery(id, { skip: isMovie });
  const movieCreditsQuery = useArtistAndCrewQuery(id, { skip: !isMovie });
  const tvCreditsQuery = useTvSeriesArtistAndCrewQuery(id, { skip: isMovie });

  const toggleFavoriteMovie = useFavoriteStore(
    (state) => state.toggleFavoriteMovie
  );
  const toggleFavoriteTvSeries = useFavoriteStore(
    (state) => state.toggleFavoriteTvSeries
  );
  const isFavorite = useFavoriteStore(
    useCallback(
      (state) =>
        isMovie ? state.isFavoriteMovie(id) : state.isFavoriteTvSeries(id),
      [id, isMovie]
    )
  );

  const detailQuery = isMovie ? movieDetailQuery : tvDetailQuery;
  const similarQuery = isMovie ? movieSimilarQuery : tvSimilarQuery;
  const creditsQuery = isMovie ? movieCreditsQuery : tvCreditsQuery;

  const movie = movieDetailQuery.data;
  const tvSeries = tvDetailQuery.data;
  const title = isMovie ? movie?.title : tvSeries?.name;
  const posterPath = isMovie ? movie?.poster_path : tvSeries?.poster_path;
  const backdropPath = isMovie ? movie?.backdrop_path : tvSeries?.backdrop_path;
  const rating = (
    isMovie ? movie?.vote_average : tvSeries?.vote_average
  )?.toFixed(1);
  const language = isMovie
    ? movie?.original_language
    : tvSeries?.original_language;
  const releaseDate = isMovie ? movie?.release_date : tvSeries?.first_air_date;
  const durationLabel = isMovie
    ? t('common.duration')
    : t('common.numberOfEpisodes');
  const durationValue = isMovie
    ? `${movie?.runtime ?? '-'} ${t('common.min')}`
    : `${tvSeries?.number_of_episodes ?? '-'}`;
  const similarItems: Array<MovieItem | TvSeriesItem> =
    similarQuery.data?.items ?? [];
  const cast: Cast[] = creditsQuery.data?.cast ?? [];

  const onToggleFavorite = () => {
    if (isMovie && movie) {
      toggleFavoriteMovie(movie);
    } else if (!isMovie && tvSeries) {
      toggleFavoriteTvSeries(tvSeries);
    }
  };

  const onRetry = () => {
    detailQuery.refetch();
    similarQuery.refetch();
    creditsQuery.refetch();
  };

  const renderSimilarItem = useCallback(
    (item: MovieItem | TvSeriesItem) => {
      const itemTitle = 'title' in item ? item.title : item.name;

      return (
        <MediaPosterCard
          variant="thumbnail"
          posterPath={item.poster_path}
          onPress={() => {
            if (isMovie) {
              navigation.navigate('MovieDetail', { movieId: item.id });
            } else {
              navigation.navigate('TvSeriesDetail', { tvSeriesId: item.id });
            }
          }}
          accessibilityLabel={itemTitle}
        />
      );
    },
    [isMovie, navigation]
  );

  const renderCastItem = useCallback(
    (person: Cast) => (
      <Pressable
        style={styles.castContainer}
        onPress={() =>
          navigation.navigate('ArtistDetail', { personId: person.id })
        }
        accessibilityRole="button"
        accessibilityLabel={person.name}
      >
        <PosterImage
          path={person.profile_path}
          size="w185"
          style={styles.castImage}
          accessibilityLabel={person.name}
        />
        <Text style={styles.castName} numberOfLines={1}>
          {person.name}
        </Text>
      </Pressable>
    ),
    [navigation]
  );

  if (detailQuery.isLoading) {
    return <DetailSkeleton variant="media" />;
  }

  if (detailQuery.isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>{t('common.errorTitle')}</Text>
        <Text style={styles.message}>{t('common.errorMessage')}</Text>
        <Pressable
          style={styles.retryButton}
          onPress={onRetry}
          accessibilityRole="button"
        >
          <Text style={styles.retryText}>{t('common.retry')}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.backdropContainer}>
        <PosterImage
          path={backdropPath}
          size="w780"
          style={styles.backdrop}
          accessibilityLabel={title}
        />
        <Pressable
          style={styles.favoriteContainer}
          onPress={onToggleFavorite}
          accessibilityRole="button"
          accessibilityLabel={t('favorite.title')}
        >
          <MaterialIcons
            name={isFavorite ? 'favorite' : 'favorite-border'}
            size={24}
            color={isFavorite ? 'red' : 'grey'}
          />
        </Pressable>
      </View>

      <View style={styles.posterRow}>
        <PosterImage
          path={posterPath}
          size="w342"
          style={styles.poster}
          accessibilityLabel={title}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.factsRow}>
            <View style={styles.fact}>
              <Text style={styles.factLabel}>{t('common.language')}</Text>
              <Text style={styles.factValue}>{language ?? '-'}</Text>
            </View>
            <View style={styles.fact}>
              <Text style={styles.factLabel}>{t('common.rating')}</Text>
              <Text style={styles.factValue}>{rating ?? '-'}</Text>
            </View>
          </View>
          <View style={styles.factsRow}>
            <View style={styles.fact}>
              <Text style={styles.factLabel}>{durationLabel}</Text>
              <Text style={styles.factValue}>{durationValue}</Text>
            </View>
            <View style={styles.fact}>
              <Text style={styles.factLabel}>{t('common.releaseDate')}</Text>
              <Text style={styles.factValue}>{releaseDate ?? '-'}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>{t('common.description')}</Text>
        <SeeMoreText
          text={(isMovie ? movie?.overview : tvSeries?.overview) ?? ''}
          readMoreStyle={styles.seeMore}
          numberOfLines={2}
        />

        {similarItems.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>{t('common.similar')}</Text>
            <HorizontalList
              data={similarItems}
              renderItem={renderSimilarItem}
              keyExtractor={(item) => String(item.id)}
            />
          </>
        ) : null}

        {cast.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>{t('common.artists')}</Text>
            <HorizontalList
              data={cast}
              renderItem={renderCastItem}
              keyExtractor={(item) => String(item.id)}
            />
          </>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default MediaDetail;
