import type { NavigatorScreenParams } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

export type MovieTabParamList = {
  NowPlaying: undefined;
  Popular: undefined;
  TopRated: undefined;
  UpComing: undefined;
};

export type TvSeriesTabParamList = {
  AiringTodayTvSeries: undefined;
  OnTheAirTvSeries: undefined;
  PopularTvSeries: undefined;
  TopRatedTvSeries: undefined;
};

export type CelebrityTabParamList = {
  Popular: undefined;
  Trending: undefined;
};

export type MainTabParamList = {
  Movie: NavigatorScreenParams<MovieTabParamList> | undefined;
  'TV Series': NavigatorScreenParams<TvSeriesTabParamList> | undefined;
  Celebrities: NavigatorScreenParams<CelebrityTabParamList> | undefined;
};

export type FavoriteTabParamList = {
  FavMovie: undefined;
  FavTvSeries: undefined;
};

export type RootStackParamList = {
  PrimaryTab: NavigatorScreenParams<MainTabParamList> | undefined;
  FavoriteTab: NavigatorScreenParams<FavoriteTabParamList> | undefined;
  MovieDetail: { movieId: number };
  TvSeriesDetail: { tvSeriesId: number };
  ArtistDetail: { personId: number };
};

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
