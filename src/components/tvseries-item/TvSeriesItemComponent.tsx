import React, { useState } from 'react';
import {
  FlatList,
  Image,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatListProps,
} from 'react-native';
import styles from './TvSeriesItem.style.ts';
import { Constants } from '../../constant/AppConstants';
import { TvSeriesItem } from '../../types/TvSeriesItem.ts';

interface TvSeriesItemProps
  extends Omit<FlatListProps<TvSeriesItem>, 'data' | 'renderItem'> {
  tvSeries: Array<TvSeriesItem>;
  onPress: (item: TvSeriesItem) => void;
  loadMoreData: () => void;
}

const MovieItemComponent = ({
  tvSeries,
  onPress,
  loadMoreData,
  ...rest
}: TvSeriesItemProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const TvSeriesItem = ({ item }: { item: TvSeriesItem }) => {
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
              : { uri: `${Constants.IMAGE_URL}${item.poster_path}` }
          }
        >
          <Image
            style={styles.imageView}
            source={{
              uri: `${Constants.IMAGE_URL}${item.poster_path}`,
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
      <FlatList
        style={styles.flatListContainer}
        data={tvSeries}
        renderItem={TvSeriesItem}
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
