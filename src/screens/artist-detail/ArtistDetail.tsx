import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import {
  useArtistDetailQuery,
  useArtistMoviesAndTvSeriesQuery,
} from '../../service/rtk-query/rtkQuery.ts';
import {
  RootStackNavigationProp,
  RootStackParamList,
} from '../../types/navigation/NavigationTypes.ts';
import { Cast } from '../../types/response/ArtistAndCrew.ts';
import SeeMoreText from '../../components/see-more/SeeMoreText.tsx';
import PosterImage from '../../components/media/PosterImage.tsx';
import MediaPosterCard from '../../components/media/MediaPosterCard.tsx';
import { mediaDetailStyles } from '../media-detail/MediaDetail.styles.ts';
import { appColors } from '../../constant/appColors.ts';
import styles from './ArtistDetail.style.ts';

const ArtistDetail = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'ArtistDetail'>>();
  const { personId } = route.params;
  const artistQuery = useArtistDetailQuery(personId);
  const creditsQuery = useArtistMoviesAndTvSeriesQuery(personId);

  const artist = artistQuery.data;
  const credits: Cast[] = creditsQuery.data ?? [];

  const gender =
    artist?.gender === 1
      ? t('common.female')
      : artist?.gender === 2
        ? t('common.male')
        : '-';

  const renderCredit = useCallback(
    (item: Cast) => (
      <MediaPosterCard
        variant="thumbnail"
        posterPath={item.poster_path}
        onPress={() => {
          if (item.media_type === 'movie') {
            navigation.navigate('MovieDetail', { movieId: item.id });
          } else {
            navigation.navigate('TvSeriesDetail', { tvSeriesId: item.id });
          }
        }}
        accessibilityLabel={item.title || item.name}
      />
    ),
    [navigation]
  );

  if (artistQuery.isLoading) {
    return (
      <View style={mediaDetailStyles.centered}>
        <ActivityIndicator size="large" color={appColors.primaryColor} />
        <Text style={mediaDetailStyles.message}>{t('common.loading')}</Text>
      </View>
    );
  }

  if (artistQuery.isError) {
    return (
      <View style={mediaDetailStyles.centered}>
        <Text style={mediaDetailStyles.title}>{t('common.errorTitle')}</Text>
        <Text style={mediaDetailStyles.message}>
          {t('common.errorMessage')}
        </Text>
        <Pressable
          style={mediaDetailStyles.retryButton}
          onPress={() => artistQuery.refetch()}
          accessibilityRole="button"
        >
          <Text style={mediaDetailStyles.retryText}>{t('common.retry')}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.mainView}>
      <View style={styles.secondContainer}>
        <PosterImage
          path={artist?.profile_path}
          size="w342"
          style={styles.imageView}
          accessibilityLabel={artist?.name}
        />
        <View style={styles.artistInfoContainer}>
          <Text style={styles.artistName}>{artist?.name}</Text>
          <View style={styles.otherInfoContainer}>
            <Text style={styles.titleContent}>{t('common.knownFor')}</Text>
            <Text style={styles.titleData}>
              {artist?.known_for_department ?? '-'}
            </Text>
          </View>
          <View style={styles.otherInfoContainer}>
            <Text style={styles.titleContent}>{t('common.gender')}</Text>
            <Text style={styles.titleData}>{gender}</Text>
          </View>
          <View style={styles.otherInfoContainer}>
            <Text style={styles.titleContent}>{t('common.birthday')}</Text>
            <Text style={styles.titleData}>{artist?.birthday ?? '-'}</Text>
          </View>
          <View style={styles.otherInfoContainer}>
            <Text style={styles.titleContent}>{t('common.placeOfBirth')}</Text>
            <Text style={styles.titleData}>
              {artist?.place_of_birth ?? '-'}
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.biography}>{t('common.biography')}</Text>
      <SeeMoreText
        text={artist?.biography ?? ''}
        numberOfLines={3}
        readMoreStyle={styles.seeMoreTextStyle}
      />

      {credits.length > 0 ? (
        <>
          <Text style={styles.description}>
            {t('artist.moviesAndTvSeries')}
          </Text>
          <FlashList
            style={styles.flatListContainer}
            data={credits}
            renderItem={({ item }) => renderCredit(item)}
            keyExtractor={(item) => String(item.id)}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </>
      ) : null}
    </ScrollView>
  );
};

export default ArtistDetail;
