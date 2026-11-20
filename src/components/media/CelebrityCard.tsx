import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import PosterImage from './PosterImage.tsx';

interface CelebrityCardProps {
  name: string;
  profilePath?: string | null;
  popularity: number;
  onPress: () => void;
  accessibilityLabel: string;
}

const CelebrityCard = ({
  name,
  profilePath,
  popularity,
  onPress,
  accessibilityLabel,
}: CelebrityCardProps) => {
  const { t } = useTranslation();

  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <View>
        <PosterImage path={profilePath} size="w342" style={styles.image} />
        <Text style={styles.title} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.popularity}>
          {t('common.popularity')}: {popularity.toFixed(1)}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 4,
  },
  image: {
    height: 250,
    borderRadius: 18,
    resizeMode: 'cover',
  },
  title: {
    paddingTop: 4,
    fontSize: 16,
  },
  popularity: {
    color: 'gray',
    fontSize: 14,
  },
});

export default memo(CelebrityCard);
