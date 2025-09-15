import React, { useState } from 'react';
import { Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import { FlashList, FlashListProps } from '@shopify/flash-list';
import styles from './TvSeriesItem.style.ts';
import { AppConstants } from '../../constant/appConstants.ts';
import { TvSeriesItem } from '../../types/response/TvSeriesItem.ts';

interface TvSeriesItemProps
  extends Omit<FlashListProps<TvSeriesItem>, 'data' | 'renderItem'> {
  tvSeries: Array<TvSeriesItem>;
  onPress: (item: TvSeriesItem) => void;
  loadMoreData: () => void;
}

const TvSeriesItemComponent = ({
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

export default TvSeriesItemComponent;
