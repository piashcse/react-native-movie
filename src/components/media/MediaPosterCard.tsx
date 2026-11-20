import React, { memo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import PosterImage from './PosterImage.tsx';

interface MediaPosterCardProps {
  title?: string;
  posterPath?: string | null;
  onPress: () => void;
  accessibilityLabel: string;
  variant?: 'poster' | 'thumbnail';
}

const MediaPosterCard = ({
  title,
  posterPath,
  onPress,
  accessibilityLabel,
  variant = 'poster',
}: MediaPosterCardProps) => (
  <Pressable
    style={styles.container}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel}
  >
    <PosterImage
      path={posterPath}
      size={variant === 'poster' ? 'w342' : 'w185'}
      style={variant === 'poster' ? styles.poster : styles.thumbnail}
    />
    {title ? (
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    ) : null}
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 4,
  },
  poster: {
    height: 270,
    borderRadius: 18,
    resizeMode: 'cover',
  },
  thumbnail: {
    height: 160,
    width: 120,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  title: {
    marginTop: 4,
    fontSize: 14,
    color: '#222',
  },
});

export default memo(MediaPosterCard);
