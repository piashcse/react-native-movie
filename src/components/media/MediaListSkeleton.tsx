import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import ShimmerBlock from './ShimmerBlock.tsx';

interface MediaListSkeletonProps {
  count?: number;
  numColumns?: number;
  itemHeight?: number;
}

const MediaListSkeleton = ({
  count = 4,
  numColumns = 2,
  itemHeight = 260,
}: MediaListSkeletonProps) => {
  const { t } = useTranslation();
  const itemWidth = `${100 / numColumns}%` as const;

  return (
    <View
      style={styles.grid}
      accessible
      accessibilityLabel={t('common.loading')}
    >
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={[styles.card, { width: itemWidth }]}>
          <ShimmerBlock height={itemHeight} borderRadius={18} />
          <ShimmerBlock
            height={12}
            width="70%"
            borderRadius={4}
            style={styles.caption}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
  },
  card: {
    padding: 4,
  },
  caption: {
    marginTop: 8,
  },
});

export default MediaListSkeleton;
