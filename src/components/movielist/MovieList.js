import React from 'react';
import {FlatList, Image, View} from "react-native";
import styles from "./MovieListStyle";
import {Constants} from "../../appconstants/AppConstants";


const MovieList = ({movies}) => {
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
    return (<View style={styles.mainView}>
        <FlatList
            style={styles.flatListContainer}
            data={movies}
            renderItem={movieItem}
            numColumns={2}
            keyExtractor={(item, index) => index}
        />
    </View>);
}

export default MovieList