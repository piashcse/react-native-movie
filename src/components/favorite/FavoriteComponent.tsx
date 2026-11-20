import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PosterImage from '../media/PosterImage.tsx';

export interface FavoriteProps {
  title: string;
  posterPath?: string | null;
  onPress: () => void;
  onRemove: () => void;
  removeLabel: string;
}

const FavoriteComponent = ({
  title,
  posterPath,
  onPress,
  onRemove,
  removeLabel,
}: FavoriteProps) => (
  <View style={styles.mainView}>
    <PosterImage path={posterPath} size="w342" style={styles.imageView} />
    <Pressable
      style={StyleSheet.absoluteFill}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
    />
    <Pressable
      style={styles.removeIcon}
      onPress={onRemove}
      accessibilityRole="button"
      accessibilityLabel={removeLabel}
    >
      <MaterialIcons name="delete" size={24} color="#000" />
    </Pressable>
    <View style={styles.overlay} pointerEvents="none">
      <Text style={styles.titleText}>{title}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 8,
    borderRadius: 18,
    overflow: 'hidden',
  },
  imageView: {
    height: 270,
    borderRadius: 18,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  titleText: {
    color: '#fff',
    fontWeight: '600',
  },
  removeIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    borderRadius: 24,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default FavoriteComponent;
