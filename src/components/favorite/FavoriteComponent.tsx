import React, { useState } from 'react';
import styles from './FavoriteComponent.style.ts';
import { Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import { AppConstants } from '../../constant/appConstants.ts';
import { Text } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export interface FavoriteProps {
  title: string;
  poster_path: string;
  onPress: () => void;
  onRemove: () => void;
}

const FavoriteComponent = (props: FavoriteProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <TouchableOpacity style={styles.mainView} onPress={props.onPress}>
      <ImageBackground
        imageStyle={styles.imageView}
        style={styles.imageView}
        source={
          isLoading
            ? require('../../assets/placeholder.jpeg')
            : { uri: `${AppConstants.IMAGE_URL}${props.poster_path}` }
        }
      >
        <Image
          style={styles.imageView}
          source={{ uri: `${AppConstants.IMAGE_URL}${props.poster_path}` }}
          onLoadEnd={() => setIsLoading(false)}
        />
        <TouchableOpacity style={styles.removeIcon} onPress={props.onRemove}>
          <MaterialIcons name="delete" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.overlay}>
          <Text style={styles.titleText}>{props.title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default FavoriteComponent;
