import React, {useEffect, useState} from 'react';
import {Text, View, Image, FlatList, useWindowDimensions} from "react-native";
import {useSelector, useDispatch} from 'react-redux';
import {getMovieList} from '../redux/actions';
import styles from "./HomeStyle";
import {Constants} from '../components/AppConstants'


const Home = ({navigation}) => {
    const {height, width} = useWindowDimensions();
    //communicate with redux
    const movieListState = useSelector(state => state.movieListReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMovieList({}))
    }, [])

    const movieItem = ({item}) => {
        return (<View>
            <Image
                style={styles.imageView}
                source={{
                    uri: `${Constants.IMAGE_URL}${item.poster_path}`,
                }}/>
        </View>)
    };
    return (<View style={styles.mainView}>
        <FlatList
            style={styles.flatListContainer}
            data={movieListState.movieList}
            renderItem={movieItem}
            numColumns={2}
            keyExtractor={(item, index) => index}
        />
    </View>)
}
export default Home