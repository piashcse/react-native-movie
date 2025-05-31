import React, { useEffect, useState } from 'react';
import styles from './PopularCelebrity.style.ts';
import { View } from 'react-native';
import { useLazyPopularCelebrityQuery } from '../../../redux/query/rtkQuery.ts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParam } from '../../../types/navigation/NavigationTypes.ts';
import { CelebrityItem } from '../../../types/response/Celebrity.ts';
import CelebrityItemComponent from '../../../components/celebrity-item/CelebrityItemComponent.tsx';

type PopularCelebrityNavigationProp = NavigationProp<
  RootStackParam,
  'ArtistDetail'
>;

const PopularCelebrity = () => {
  const navigation = useNavigation<PopularCelebrityNavigationProp>();
  const [page, setPage] = useState(1);
  const [celebrities, setCelebrities] = useState<Array<CelebrityItem>>([]);
  const [fetchPopularMovie, { isFetching, error }] =
    useLazyPopularCelebrityQuery();

  useEffect(() => {
    const fetchPopularCelebrities = async () => {
      try {
        const response = await fetchPopularMovie({ page }).unwrap();
        setCelebrities((prevCelebrities) =>
          page === 1 ? response : [...prevCelebrities, ...response]
        );
      } catch (err) {
        console.error('Failed to fetch celebrities:', err);
      }
    };

    fetchPopularCelebrities();
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

export default PopularCelebrity;
