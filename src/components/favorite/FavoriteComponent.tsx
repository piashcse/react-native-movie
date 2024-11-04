import React, {useState} from 'react';
import styles from './FavoriteComponent.style.ts';
import {Image, ImageBackground, TouchableOpacity, View} from 'react-native';
import {Constants} from '../../constant/AppConstants.ts';
import {Text} from 'react-native-paper';

export  interface FavoriteProps {
  title: string;
  poster_path: string;
  onPress: () => void;
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
                        : { uri: `${Constants.IMAGE_URL}${props.poster_path}` }
                }
            >
                <Image
                    style={styles.imageView}
                    source={{ uri: `${Constants.IMAGE_URL}${props.poster_path}` }}
                    onLoadEnd={() => setIsLoading(false)}
                />
                <View style={styles.overlay}>
                    <Text style={styles.titleText}>{props.title}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default FavoriteComponent;
