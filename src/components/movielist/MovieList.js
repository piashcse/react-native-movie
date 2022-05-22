import React,{useRef} from 'react';
import {FlatList, Image, View, TouchableOpacity} from "react-native";
import styles from "./MovieListStyle";
import {Constants} from "../../appconstants/AppConstants";


const MovieList = ({movies, onPress, loadMoreData}) => {
    // movie items for movie list
    const movieItem = ({item}) => {
        return (<TouchableOpacity style={styles.movieItemContainer} onPress={() => onPress(item)}>
            <Image
                style={styles.imageView}
                source={{
                    uri: `${Constants.IMAGE_URL}${item.poster_path}`,
                }}/>
        </TouchableOpacity>)
    };
    // main view with loading while api call is going one
    return (<View style={styles.mainView}>
        <FlatList
            style={styles.flatListContainer}
            data={movies}
            extraData={movies}
            renderItem={movieItem}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.2}
            onEndReached={() => loadMoreData()}
        />
    </View>);
}

export default MovieList