import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import MediaDetail from '../../media-detail/MediaDetail.tsx';
import { RootStackParamList } from '../../../types/navigation/NavigationTypes.ts';

const TvSeriesDetail = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'TvSeriesDetail'>>();

  return <MediaDetail kind="tv" id={route.params.tvSeriesId} />;
};

export default TvSeriesDetail;
