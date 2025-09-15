import React, { useState } from 'react';
import { Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import { FlashList, FlashListProps } from '@shopify/flash-list';
import styles from './MovieItem.style.ts';
import { AppConstants } from '../../constant/appConstants.ts';
import { MovieItem } from '../../types/response/MovieItem.ts';

interface MovieItemProps
  extends Omit<FlashListProps<MovieItem>, 'data' | 'renderItem'> {
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
          <Image
            style={styles.imageView}
            source={{
              uri: `${AppConstants.IMAGE_URL}${item.poster_path}`,
            }}
            onLoadEnd={() => {
              setIsLoading(false);
            }}
          />
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainView}>
      <FlashList
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
