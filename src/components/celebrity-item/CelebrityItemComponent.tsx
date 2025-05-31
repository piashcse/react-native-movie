import React, { useState } from 'react';
import {
  FlatList,
  FlatListProps,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './Celebrity.style.ts';
import { AppConstants } from '../../constant/appConstants.ts';
import { SharedElement } from 'react-navigation-shared-element';
import { CelebrityItem } from '../../types/response/Celebrity.ts';

interface CelebrityItemProps
  extends Omit<FlatListProps<CelebrityItem>, 'data' | 'renderItem'> {
  celebrities: Array<CelebrityItem>;
  onPress: (item: CelebrityItem) => void;
  loadMoreData: () => void;
}

const CelebrityItemComponent = ({
  celebrities,
  onPress,
  loadMoreData,
  ...rest
}: CelebrityItemProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const CelebrityItem = ({ item }: { item: CelebrityItem }) => {
    return (
      <TouchableOpacity
        style={styles.celebrityItemContainer}
        onPress={() => onPress(item)}
      >
        <View>
          <ImageBackground
            imageStyle={styles.backgroundImage}
            source={
              isLoading
                ? require('../../assets/placeholder.jpeg')
                : { uri: `${AppConstants.IMAGE_URL}${item.profile_path}` }
            }
          >
            <SharedElement id={`tvSeries.${item.id}.poster`}>
              <Image
                style={styles.imageView}
                source={{
                  uri: `${AppConstants.IMAGE_URL}${item.profile_path}`,
                }}
                onLoadEnd={() => {
                  setIsLoading(false);
                }}
              />
            </SharedElement>
          </ImageBackground>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.popularity}>
            Popularity: {item.popularity.toFixed(1)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainView}>
      <FlatList
        style={styles.flatListContainer}
        data={celebrities}
        renderItem={CelebrityItem}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreData}
        {...rest}
      />
    </View>
  );
};

export default CelebrityItemComponent;
