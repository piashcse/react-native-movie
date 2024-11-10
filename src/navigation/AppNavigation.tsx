import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import NowPlayingMovie from '../screens/movie/nowplaying/NowPlayingMovie.tsx';
import PopularMovie from '../screens/movie/popular/PopularMovie.tsx';
import TopRatedMovie from '../screens/movie/toprated/TopRatedMovie.tsx';
import UpComingMovie from '../screens/movie/upcoming/UpComingMovie.tsx';
import MovieDetail from '../screens/movie/movie-detail/MovieDetail';
import ArtistDetail from '../screens/artist-detail/ArtistDetail';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AiringTodayTvSeries from '../screens/tvseries/airing_today/AiringTodayTvSeries.tsx';
import OnTheAirTvSeries from '../screens/tvseries/on_the_air/OnTheAirTvSeries.tsx';
import PopularTvSeries from '../screens/tvseries/popular/PopularTvSeries.tsx';
import UpComingTvSeries from '../screens/tvseries/top_rated/TopRatedTvSeries.tsx';
import TvSeriesDetail from '../screens/tvseries/tvseries-detail/TvSeriesDetail.tsx';
import { BackHandler, TouchableOpacity, View } from 'react-native';
import { AnimatedFAB } from 'react-native-paper';
import DynamicSearch from '../components/search/DynamicSearch.tsx';
import styles from './AppNavigation.Style.ts';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import FavoriteMovie from '../screens/favorite/movie/FavoriteMovie.tsx';
import FavoriteTvSeries from '../screens/favorite/tvseries/FavoriteTvSeries.tsx';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

//const Stack = createStackNavigator();
const Stack = createSharedElementStackNavigator();
const Tab = createMaterialTopTabNavigator();
const FavoriteTab = createMaterialTopTabNavigator();
const MovieBottomTab = createBottomTabNavigator();
const TvSeriesBottomTab = createBottomTabNavigator();

const PrimaryTabView = () => {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const navigation = useNavigation();

  useFocusEffect(() => {
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
  });

  return (
    <View style={styles.rootView}>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}
      >
        <Tab.Screen
          name="Movie"
          options={{ title: 'Movie' }}
          component={MovieBottomNavigation}
        />
        <Tab.Screen
          name="Tv Series"
          options={{ title: 'Tv Series' }}
          component={TvSeriesBottomNavigation}
        />
      </Tab.Navigator>
      <DynamicSearch isVisible={isSearchBarVisible} />
      <AnimatedFAB
        icon={'movie-search'}
        label={'Label'}
        extended={false}
        onPress={() => setIsSearchBarVisible(!isSearchBarVisible)}
        visible={true}
        animateFrom={'right'}
        iconMode={'static'}
        style={styles.favStyle}
      />
    </View>
  );
};

const FavoriteTavView = () => {
  return (
    <FavoriteTab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: styles.tabBarIndicatorStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
      }}
    >
      <FavoriteTab.Screen
        name={'FavMovie'}
        component={FavoriteMovie}
        options={{
          title: 'Movie',
        }}
      />
      <FavoriteTab.Screen
        name={'FavTvSeries'}
        component={FavoriteTvSeries}
        options={{
          title: 'Tv Series',
        }}
      />
    </FavoriteTab.Navigator>
  );
};
const MovieBottomNavigation = () => {
  return (
    <MovieBottomTab.Navigator>
      <MovieBottomTab.Screen
        name="NowPlaying"
        component={NowPlayingMovie}
        options={{
          tabBarLabel: 'NowPlaying',
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
          tabBarLabel: 'Popular',
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
          tabBarLabel: 'Top Rated',
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
          tabBarLabel: 'UpComing',
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
  return (
    <TvSeriesBottomTab.Navigator>
      <TvSeriesBottomTab.Screen
        name="AiringTodayTvSeries"
        component={AiringTodayTvSeries}
        options={{
          tabBarLabel: 'AiringToday',
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
          tabBarLabel: 'OnTheAir',
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
          tabBarLabel: 'Popular',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite" color={color} size={size} />
          ),
        }}
      />
      <TvSeriesBottomTab.Screen
        name="TopRatedTvSeries"
        component={UpComingTvSeries}
        options={{
          tabBarLabel: 'TopRated ',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="star" color={color} size={size} />
          ),
        }}
      />
    </TvSeriesBottomTab.Navigator>
  );
};
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PrimaryTab"
          component={PrimaryTabView}
          options={({ navigation }) => ({
            title: 'RN Movie',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('FavoriteTab')}
              >
                <MaterialIcons
                  name="favorite"
                  size={24}
                  color="gray"
                  style={{ marginRight: 16 }}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="FavoriteTab"
          component={FavoriteTavView}
          options={{
            title: 'Favorite',
          }}
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetail}
          options={() => ({
            title: 'Movie detail',
            gestureEnabled: false,
            transitionSpec: {
              open: { animation: 'timing', config: { duration: 500 } },
              close: { animation: 'timing', config: { duration: 500 } },
            },
            cardStyleInterpolator: ({ current: { progress } }) => ({
              cardStyle: {
                opacity: progress,
              },
            }),
          })}
        />
        <Stack.Screen
          name="ArtistDetail"
          component={ArtistDetail}
          options={() => ({
            title: 'Artist detail',
            gestureEnabled: false,
            transitionSpec: {
              open: { animation: 'timing', config: { duration: 500 } },
              close: { animation: 'timing', config: { duration: 500 } },
            },
            cardStyleInterpolator: ({ current: { progress } }) => ({
              cardStyle: {
                opacity: progress,
              },
            }),
          })}
        />
        <Stack.Screen
          name="TvSeriesDetail"
          component={TvSeriesDetail}
          options={() => ({
            title: 'Tv Series detail',
            gestureEnabled: false,
            transitionSpec: {
              open: { animation: 'timing', config: { duration: 500 } },
              close: { animation: 'timing', config: { duration: 500 } },
            },
            cardStyleInterpolator: ({ current: { progress } }) => ({
              cardStyle: {
                opacity: progress,
              },
            }),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
