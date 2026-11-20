import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import ShimmerBlock from './ShimmerBlock.tsx';

interface DetailSkeletonProps {
  variant?: 'media' | 'artist';
}

const DetailSkeleton = ({ variant = 'media' }: DetailSkeletonProps) => {
  const { t } = useTranslation();

  if (variant === 'artist') {
    return (
      <View
        style={styles.artistContainer}
        accessible
        accessibilityLabel={t('common.loading')}
      >
        <View style={styles.artistRow}>
          <ShimmerBlock width={190} height={250} borderRadius={16} />
          <View style={styles.artistInfo}>
            <ShimmerBlock width="70%" height={24} />
            <ShimmerBlock width="55%" height={14} style={styles.line} />
            <ShimmerBlock width="50%" height={14} style={styles.line} />
            <ShimmerBlock width="65%" height={14} style={styles.line} />
            <ShimmerBlock width="60%" height={14} style={styles.line} />
          </View>
        </View>
        <ShimmerBlock width="30%" height={24} style={styles.section} />
        <ShimmerBlock height={14} style={styles.line} />
        <ShimmerBlock width="95%" height={14} style={styles.line} />
        <ShimmerBlock width="80%" height={14} style={styles.line} />
        <ShimmerBlock width="40%" height={22} style={styles.section} />
        <View style={styles.horizontalRow}>
          {[0, 1, 2].map((index) => (
            <ShimmerBlock
              key={index}
              width={120}
              height={160}
              borderRadius={12}
              style={styles.horizontalItem}
            />
          ))}
        </View>
      </View>
    );
  }

  return (
    <View
      style={styles.container}
      accessible
      accessibilityLabel={t('common.loading')}
    >
      <ShimmerBlock height={260} borderRadius={0} />
      <View style={styles.posterRow}>
        <ShimmerBlock width={130} height={180} borderRadius={14} />
        <View style={styles.info}>
          <ShimmerBlock width="75%" height={22} />
          <ShimmerBlock width="45%" height={14} style={styles.line} />
          <ShimmerBlock width="55%" height={14} style={styles.line} />
          <ShimmerBlock width="40%" height={14} style={styles.line} />
        </View>
      </View>
      <View style={styles.content}>
        <ShimmerBlock width="35%" height={22} style={styles.section} />
        <ShimmerBlock height={14} style={styles.line} />
        <ShimmerBlock width="90%" height={14} style={styles.line} />
        <ShimmerBlock width="70%" height={14} style={styles.line} />
        <ShimmerBlock width="30%" height={22} style={styles.section} />
        <View style={styles.horizontalRow}>
          {[0, 1, 2].map((index) => (
            <ShimmerBlock
              key={index}
              width={120}
              height={160}
              borderRadius={12}
              style={styles.horizontalItem}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  posterRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: -70,
    paddingHorizontal: 12,
  },
  info: {
    flex: 1,
    marginLeft: 8,
  },
  content: {
    marginHorizontal: 8,
    marginTop: 16,
  },
  artistContainer: {
    flex: 1,
    padding: 8,
    backgroundColor: '#fff',
  },
  artistRow: {
    flexDirection: 'row',
  },
  artistInfo: {
    flex: 1,
    marginLeft: 16,
    marginTop: 8,
  },
  line: {
    marginTop: 10,
  },
  section: {
    marginTop: 20,
    marginBottom: 4,
  },
  horizontalRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  horizontalItem: {
    marginRight: 8,
  },
});

export default DetailSkeleton;
