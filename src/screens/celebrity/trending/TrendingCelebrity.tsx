import React, { useEffect, useState } from 'react';
import styles from './TrendingCelebrity.style.ts';
import { View } from 'react-native';
import { useLazyTrendingCelebrityQuery } from '../../../redux/query/rtkQuery.ts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParam } from '../../../types/navigation/NavigationTypes.ts';
import { CelebrityItem } from '../../../types/response/Celebrity.ts';
import CelebrityItemComponent from '../../../components/celebrity-item/CelebrityItemComponent.tsx';

type TrendingCelebrityNavigationProp = NavigationProp<
  RootStackParam,
  'ArtistDetail'
>;

const TrendingCelebrity = () => {
  const navigation = useNavigation<TrendingCelebrityNavigationProp>();
  const [page, setPage] = useState(1);
  const [celebrities, setCelebrities] = useState<Array<CelebrityItem>>([]);
  const [fetchTrendingMovie, { isFetching, error }] =
    useLazyTrendingCelebrityQuery();

  useEffect(() => {
    const fetchTrendingCelebrities = async () => {
      try {
        const response = await fetchTrendingMovie({ page }).unwrap();
        setCelebrities((prevCelebrities) =>
          page === 1 ? response : [...prevCelebrities, ...response]
        );
      } catch (err) {
        console.error('Failed to fetch celebrities:', err);
      }
    };

    fetchTrendingCelebrities();
  }, [page]);

  const loadMoreCelebrities = () => {
    if (!isFetching && !error) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View style={styles.mainView}>
      <CelebrityItemComponent
        celebrities={celebrities}
        onPress={(item) =>
          navigation.navigate('ArtistDetail', { personId: item.id })
        }
        loadMoreData={loadMoreCelebrities}
      />
    </View>
  );
};

export default TrendingCelebrity;
