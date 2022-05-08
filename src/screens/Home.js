import React, {useEffect} from 'react';
import {View, Image, FlatList} from "react-native";
import {useSelector, useDispatch} from 'react-redux';
import {getMovieList} from '../redux/actions';
import styles from "./HomeStyle";
import {Constants} from '../appconstants/AppConstants'
import Loading from "../components/Loading";


const Home = ({navigation}) => {
    //communicate with redux
    const movieListState = useSelector(state => state.movieListReducer);
    const isLoading = useSelector(state => state.movieListReducer.isLoading);
    const dispatch = useDispatch();

    // Api call
    useEffect(() => {
        dispatch(getMovieList({}))
    }, [])

    // movie items for movie list
    const movieItem = ({item}) => {
        return (<View style={styles.movieItemContainer}>
            <Image
                style={styles.imageView}
                source={{
                    uri: `${Constants.IMAGE_URL}${item.poster_path}`,
                }}/>
        </View>)
    };
    // main view with loading while api call is going one
    return isLoading ? <Loading/> : <View style={styles.mainView}>
        <FlatList
            style={styles.flatListContainer}
            data={movieListState.movieList}
            renderItem={movieItem}
            numColumns={2}
            keyExtractor={(item, index) => index}
        />
    </View>;
}
export default Home