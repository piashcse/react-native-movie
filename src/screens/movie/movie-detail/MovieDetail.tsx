import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import MediaDetail from '../../media-detail/MediaDetail.tsx';
import { RootStackParamList } from '../../../types/navigation/NavigationTypes.ts';

const MovieDetail = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MovieDetail'>>();

  return <MediaDetail kind="movie" id={route.params.movieId} />;
};

export default MovieDetail;
