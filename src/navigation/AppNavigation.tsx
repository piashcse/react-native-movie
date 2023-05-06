import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Home from '../screens/home/Home';
import Popular from "../screens/popular/Popular";
import TopRated from "../screens/toprated/TopRated";
import UpComing from "../screens/upcoming/UpComing";
import MovieDetail from "../screens/moviedetail/MovieDetail";
import ArtistDetail from "../screens/artistdetail/ArtistDetail";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
    return (<Tab.Navigator>
        <Tab.Screen name="Home" component={Home} options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (<MaterialIcons name="home" color={color} size={size}/>),
        }}/>
        <Tab.Screen name="Popular" component={Popular} options={{
            tabBarLabel: 'Popular',
            tabBarIcon: ({color, size}) => (<MaterialIcons name="timeline" color={color} size={size}/>),
        }}/>
        <Tab.Screen name="TopRated" component={TopRated} options={{
            tabBarLabel: 'Top Rated',
            tabBarIcon: ({color, size}) => (<MaterialIcons name="star" color={color} size={size}/>),
        }}/>
        <Tab.Screen name="UpComing" component={UpComing} options={{
            tabBarLabel: 'UpComing',
            tabBarIcon: ({color, size}) => (<MaterialIcons name="keyboard-arrow-up" color={color} size={size}/>),
        }}/>
    </Tab.Navigator>)
}
const AppNavigation = () => {
    return (<NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="BottomNavigation" component={BottomNavigation} options={{headerShown: false}}/>
            <Stack.Screen name="MovieDetail" component={MovieDetail} options={{
                title: 'Movie detail'
            }}/>
            <Stack.Screen name="ArtistDetail" component={ArtistDetail} options={{
                title: 'Artist detail'
            }}/>
        </Stack.Navigator>
    </NavigationContainer>);
}

export default AppNavigation;
