import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import ShimmerBlock from './ShimmerBlock.tsx';

interface SearchListSkeletonProps {
  count?: number;
}

const SearchListSkeleton = ({ count = 5 }: SearchListSkeletonProps) => {
  const { t } = useTranslation();

  return (
    <View
      style={styles.container}
      accessible
      accessibilityLabel={t('common.loading')}
    >
      {Array.from({ length: count }).map((_, index) => (
        <View key={index} style={styles.row}>
          <ShimmerBlock width={100} height={120} borderRadius={8} />
          <View style={styles.info}>
            <ShimmerBlock width="70%" height={16} />
            <ShimmerBlock width="45%" height={12} style={styles.line} />
            <ShimmerBlock width="35%" height={12} style={styles.line} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  info: {
    flex: 1,
    marginLeft: 10,
    marginTop: 4,
  },
  line: {
    marginTop: 8,
  },
});

export default SearchListSkeleton;
