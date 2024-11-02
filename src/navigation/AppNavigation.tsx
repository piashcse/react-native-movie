import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import NowPlayingMovie from '../screens/movie/nowplaying/NowPlayingMovie.tsx';
import PopularMovie from "../screens/movie/popular/PopularMovie.tsx";
import TopRatedMovie from "../screens/movie/toprated/TopRatedMovie.tsx";
import UpComingMovie from "../screens/movie/upcoming/UpComingMovie.tsx";
import MovieDetail from "../screens/movie/movie-detail/MovieDetail";
import ArtistDetail from "../screens/artist-detail/ArtistDetail";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {COLOR} from "../constant/Colors.ts";
import AiringTodayTvSeries from "../screens/tvseries/airing_today/AiringTodayTvSeries.tsx";
import OnTheAirTvSeries from "../screens/tvseries/on_the_air/OnTheAirTvSeries.tsx";
import PopularTvSeries from "../screens/tvseries/popular/PopularTvSeries.tsx";
import UpComingTvSeries from "../screens/tvseries/top_rated/TopRatedTvSeries.tsx";
import TvSeriesDetail from "../screens/tvseries/tvseries-detail/TvSeriesDetail.tsx";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const MovieBottomTab = createBottomTabNavigator();
const TvSeriesBottomTab = createBottomTabNavigator();

const TabView = () => {
   return (
        <Tab.Navigator screenOptions={{
            tabBarIndicatorStyle: {
                backgroundColor: COLOR.tabIndicatorColor,
                height: 3,
                borderRadius: 2,
                width: '20%',
                left: '15%'
            },
            tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: 'bold',
            },
        }}>
            <Tab.Screen name="Movie" options={{title: 'Movie' }} component={MovieBottomNavigation} />
            <Tab.Screen name="Tv Series" options={{title: 'Tv Series' }} component={TvSeriesBottomNavigation} />
        </Tab.Navigator>
    );
}

const MovieBottomNavigation = () => {
    return (<MovieBottomTab.Navigator>
        <MovieBottomTab.Screen name="NowPlaying" component={NowPlayingMovie} options={{
            tabBarLabel: 'NowPlaying',
            headerShown: false,
            tabBarIcon: ({color, size}) => (<MaterialIcons name="movie" color={color} size={size}/>),
        }}/>
        <MovieBottomTab.Screen name="Popular" component={PopularMovie} options={{
            tabBarLabel: 'Popular',
            headerShown: false,
            tabBarIcon: ({color, size}) => (<MaterialIcons name="favorite" color={color} size={size}/>),
        }}/>
        <MovieBottomTab.Screen name="TopRated" component={TopRatedMovie} options={{
            tabBarLabel: 'Top Rated',
            headerShown: false,
            tabBarIcon: ({color, size}) => (<MaterialIcons name="star" color={color} size={size}/>),
        }}/>
        <MovieBottomTab.Screen name="UpComing" component={UpComingMovie} options={{
            tabBarLabel: 'UpComing',
            headerShown: false,
            tabBarIcon: ({color, size}) => (<MaterialIcons name="keyboard-arrow-up" color={color} size={size}/>),
        }}/>
    </MovieBottomTab.Navigator>)
}
const TvSeriesBottomNavigation = () => {
    return (<TvSeriesBottomTab.Navigator>
        <TvSeriesBottomTab.Screen name="AiringTodayTvSeries" component={AiringTodayTvSeries} options={{
            tabBarLabel: 'AiringToday',
            headerShown: false,
            tabBarIcon: ({color, size}) => (<MaterialIcons name="movie" color={color} size={size}/>),
        }} />
        <TvSeriesBottomTab.Screen name="OnTheAirTvSeries" component={OnTheAirTvSeries} options={{
            tabBarLabel: 'OnTheAir',
            headerShown: false,
            tabBarIcon: ({color, size}) => (<MaterialIcons name="timeline" color={color} size={size}/>),
        }}/>
        <TvSeriesBottomTab.Screen name="PopularTvSeries" component={PopularTvSeries} options={{
            tabBarLabel: 'Popular',
            headerShown: false,
            tabBarIcon: ({color, size}) => (<MaterialIcons name="favorite" color={color} size={size}/>),
        }}/>
        <TvSeriesBottomTab.Screen name="TopRatedTvSeries" component={UpComingTvSeries} options={{
            tabBarLabel: 'TopRated ',
            headerShown: false,
            tabBarIcon: ({color, size}) => (<MaterialIcons name="star" color={color} size={size}/>),
        }}/>
    </TvSeriesBottomTab.Navigator>)
}
const AppNavigation = () => {
    return (<NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="tab" component={TabView} options={{headerShown: false}}/>
            <Stack.Screen name="MovieDetail" component={MovieDetail} options={{
                title: 'Movie detail'
            }}/>
            <Stack.Screen name="ArtistDetail" component={ArtistDetail} options={{
                title: 'Artist detail'
            }}/>
            <Stack.Screen name="TvSeriesDetail" component={TvSeriesDetail} options={{
                title: 'TvSeries detail'
            }}/>
        </Stack.Navigator>
    </NavigationContainer>);
}

export default AppNavigation;
