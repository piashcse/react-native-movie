import React, {useState} from 'react';
import {FlatList, Image, View, TouchableOpacity, ImageBackground} from "react-native";
import styles from "./MovieListStyle";
import {Constants} from "../../appconstants/AppConstants";
import {MovieItem} from "../../types/MovieItem";

interface MovieListProps {
    movies: Array<MovieItem>;
    onPress: (item: MovieItem) => void;
    loadMoreData: () => void
}

const MovieList = (props: MovieListProps) => {
    const {movies, onPress, loadMoreData} = props;
    const [isLoading, setIsLoading] = useState(true)
    // movie items for movie list
    const movieItem = ({item}: { item: MovieItem }) => {
        return (<TouchableOpacity style={styles.movieItemContainer} onPress={() => onPress(item)}>
            <ImageBackground
                imageStyle={{borderRadius: 18}}
                source={isLoading ? require('../../assets/placeholder.jpeg') : {uri: `${Constants.IMAGE_URL}${item.poster_path}`}}
            >
                <Image
                    style={styles.imageView}
                    source={{
                        uri: `${Constants.IMAGE_URL}${item.poster_path}`,
                    }}
                    onLoadEnd={() => {
                        setIsLoading(false)
                    }}
                />
            </ImageBackground>
        </TouchableOpacity>)
    };

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
