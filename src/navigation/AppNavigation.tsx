import React, { useCallback, useState } from 'react';
import {
  NavigationContainer,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BackHandler, TouchableOpacity, View } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import NowPlayingMovie from '../screens/movie/nowplaying/NowPlayingMovie.tsx';
import PopularMovie from '../screens/movie/popular/PopularMovie.tsx';
import TopRatedMovie from '../screens/movie/toprated/TopRatedMovie.tsx';
import UpComingMovie from '../screens/movie/upcoming/UpComingMovie.tsx';
import MovieDetail from '../screens/movie/movie-detail/MovieDetail.tsx';
import ArtistDetail from '../screens/artist-detail/ArtistDetail.tsx';
import AiringTodayTvSeries from '../screens/tvseries/airing_today/AiringTodayTvSeries.tsx';
import OnTheAirTvSeries from '../screens/tvseries/on_the_air/OnTheAirTvSeries.tsx';
import PopularTvSeries from '../screens/tvseries/popular/PopularTvSeries.tsx';
import TopRatedTvSeries from '../screens/tvseries/top_rated/TopRatedTvSeries.tsx';
import TvSeriesDetail from '../screens/tvseries/tvseries-detail/TvSeriesDetail.tsx';
import DynamicSearch from '../components/search/DynamicSearch.tsx';
import styles from './AppNavigation.Style.ts';
import FavoriteMovie from '../screens/favorite/movie/FavoriteMovie.tsx';
import FavoriteTvSeries from '../screens/favorite/tvseries/FavoriteTvSeries.tsx';
import PopularCelebrity from '../screens/celebrity/popular/PopularCelebrity.tsx';
import TrendingCelebrity from '../screens/celebrity/trending/TrendingCelebrity.tsx';
import {
  CelebrityTabParamList,
  FavoriteTabParamList,
  MainTabParamList,
  MovieTabParamList,
  RootStackNavigationProp,
  RootStackParamList,
  TvSeriesTabParamList,
} from '../types/navigation/NavigationTypes.ts';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createMaterialTopTabNavigator<MainTabParamList>();
const FavoriteTab = createMaterialTopTabNavigator<FavoriteTabParamList>();
const MovieBottomTab = createBottomTabNavigator<MovieTabParamList>();
const TvSeriesBottomTab = createBottomTabNavigator<TvSeriesTabParamList>();
const CelebrityBottomTab = createBottomTabNavigator<CelebrityTabParamList>();

const detailScreenOptions: StackNavigationOptions = {
  gestureEnabled: false,
  transitionSpec: {
    open: { animation: 'timing', config: { duration: 500 } },
    close: { animation: 'timing', config: { duration: 500 } },
  },
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: { opacity: progress },
  }),
};

const PrimaryTabView = () => {
  const { t } = useTranslation();
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const navigation = useNavigation<RootStackNavigationProp>();

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (isSearchBarVisible) {
          setIsSearchBarVisible(false);
        } else if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          BackHandler.exitApp();
        }
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );
      return () => backHandler.remove();
    }, [isSearchBarVisible, navigation])
  );

  return (
    <View style={styles.rootView}>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          lazy: true,
        }}
      >
        <Tab.Screen
          name="Movie"
          options={{ title: t('navigation.movie') }}
          component={MovieBottomNavigation}
        />
        <Tab.Screen
          name="TV Series"
          options={{ title: t('navigation.tvSeries') }}
          component={TvSeriesBottomNavigation}
        />
        <Tab.Screen
          name="Celebrities"
          options={{ title: t('navigation.celebrities') }}
          component={CelebrityBottomNavigation}
        />
      </Tab.Navigator>
      <DynamicSearch isVisible={isSearchBarVisible} />
      <AnimatedFAB
        icon="movie-search"
        label={t('common.search')}
        extended={false}
        onPress={() => setIsSearchBarVisible((visible) => !visible)}
        visible
        animateFrom="right"
        iconMode="static"
        style={styles.favStyle}
      />
    </View>
  );
};

const FavoriteTabView = () => {
  const { t } = useTranslation();

  return (
    <FavoriteTab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        lazy: true,
      }}
    >
      <FavoriteTab.Screen
        name="FavMovie"
        component={FavoriteMovie}
        options={{ title: t('navigation.movie') }}
      />
      <FavoriteTab.Screen
        name="FavTvSeries"
        component={FavoriteTvSeries}
        options={{ title: t('navigation.tvSeries') }}
      />
    </FavoriteTab.Navigator>
  );
};

const MovieBottomNavigation = () => {
  const { t } = useTranslation();

  return (
    <MovieBottomTab.Navigator>
      <MovieBottomTab.Screen
        name="NowPlaying"
        component={NowPlayingMovie}
        options={{
          tabBarLabel: t('navigation.nowPlaying'),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="movie" color={color} size={size} />
          ),
        }}
      />
      <MovieBottomTab.Screen
        name="Popular"
        component={PopularMovie}
        options={{
          tabBarLabel: t('navigation.popular'),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite" color={color} size={size} />
          ),
        }}
      />
      <MovieBottomTab.Screen
        name="TopRated"
        component={TopRatedMovie}
        options={{
          tabBarLabel: t('navigation.topRated'),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="star" color={color} size={size} />
          ),
        }}
      />
      <MovieBottomTab.Screen
        name="UpComing"
        component={UpComingMovie}
        options={{
          tabBarLabel: t('navigation.upComing'),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="keyboard-arrow-up" color={color} size={size} />
          ),
        }}
      />
    </MovieBottomTab.Navigator>
  );
};

const TvSeriesBottomNavigation = () => {
  const { t } = useTranslation();

  return (
    <TvSeriesBottomTab.Navigator>
      <TvSeriesBottomTab.Screen
        name="AiringTodayTvSeries"
        component={AiringTodayTvSeries}
        options={{
          tabBarLabel: t('navigation.airingToday'),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="movie" color={color} size={size} />
          ),
        }}
      />
      <TvSeriesBottomTab.Screen
        name="OnTheAirTvSeries"
        component={OnTheAirTvSeries}
        options={{
          tabBarLabel: t('navigation.onTheAir'),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="timeline" color={color} size={size} />
          ),
        }}
      />
      <TvSeriesBottomTab.Screen
        name="PopularTvSeries"
        component={PopularTvSeries}
        options={{
          tabBarLabel: t('navigation.popular'),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite" color={color} size={size} />
          ),
        }}
      />
      <TvSeriesBottomTab.Screen
        name="TopRatedTvSeries"
        component={TopRatedTvSeries}
        options={{
          tabBarLabel: t('navigation.topRated'),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="star" color={color} size={size} />
          ),
        }}
      />
    </TvSeriesBottomTab.Navigator>
  );
};

const CelebrityBottomNavigation = () => {
  const { t } = useTranslation();

  return (
    <CelebrityBottomTab.Navigator>
      <CelebrityBottomTab.Screen
        name="Popular"
        component={PopularCelebrity}
        options={{
          tabBarLabel: t('navigation.popular'),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="star" color={color} size={size} />
          ),
        }}
      />
      <CelebrityBottomTab.Screen
        name="Trending"
        component={TrendingCelebrity}
        options={{
          tabBarLabel: t('navigation.trending'),
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="trending-up" color={color} size={size} />
          ),
        }}
      />
    </CelebrityBottomTab.Navigator>
  );
};

const AppNavigation = () => {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PrimaryTab"
          component={PrimaryTabView}
          options={({ navigation }) => ({
            title: t('app.title'),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('FavoriteTab')}
                accessibilityRole="button"
                accessibilityLabel={t('navigation.favorite')}
              >
                <MaterialIcons
                  name="favorite"
                  size={24}
                  color="gray"
                  style={styles.headerIcon}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="FavoriteTab"
          component={FavoriteTabView}
          options={{ title: t('navigation.favorite') }}
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetail}
          options={{
            ...detailScreenOptions,
            title: t('navigation.movieDetail'),
          }}
        />
        <Stack.Screen
          name="ArtistDetail"
          component={ArtistDetail}
          options={{
            ...detailScreenOptions,
            title: t('navigation.artistDetail'),
          }}
        />
        <Stack.Screen
          name="TvSeriesDetail"
          component={TvSeriesDetail}
          options={{
            ...detailScreenOptions,
            title: t('navigation.tvSeriesDetail'),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
