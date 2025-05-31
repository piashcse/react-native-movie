import React, { useState } from 'react';
import {
  FlatList,
  FlatListProps,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './MovieItem.style.ts';
import { AppConstants } from '../../constant/appConstants.ts';
import { MovieItem } from '../../types/response/MovieItem.ts';
import { SharedElement } from 'react-navigation-shared-element';

interface MovieItemProps
  extends Omit<FlatListProps<MovieItem>, 'data' | 'renderItem'> {
  movies: Array<MovieItem>;
  onPress: (item: MovieItem) => void;
  loadMoreData: () => void;
}

const MovieItemComponent = ({
  movies,
  onPress,
  loadMoreData,
  ...rest
}: MovieItemProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const movieItem = ({ item }: { item: MovieItem }) => {
    return (
      <TouchableOpacity
        style={styles.movieItemContainer}
        onPress={() => onPress(item)}
      >
        <ImageBackground
          imageStyle={styles.backgroundImage}
          source={
            isLoading
              ? require('../../assets/placeholder.jpeg')
              : { uri: `${AppConstants.IMAGE_URL}${item.poster_path}` }
          }
        >
          <SharedElement id={`movie.${item.id}.poster`}>
            <Image
              style={styles.imageView}
              source={{
                uri: `${AppConstants.IMAGE_URL}${item.poster_path}`,
              }}
              onLoadEnd={() => {
                setIsLoading(false);
              }}
            />
          </SharedElement>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainView}>
      <FlatList
        style={styles.flatListContainer}
        data={movies}
        renderItem={movieItem}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreData}
        {...rest}
      />
    </View>
  );
};

export default MovieItemComponent;
