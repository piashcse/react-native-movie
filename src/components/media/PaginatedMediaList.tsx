import React, { ReactElement } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useTranslation } from 'react-i18next';
import { appColors } from '../../constant/appColors.ts';

interface PaginatedMediaListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactElement;
  keyExtractor: (item: T) => string;
  numColumns?: number;
  onEndReached: () => void;
  isLoading: boolean;
  isFetchingMore: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  error: string | null;
  onRetry: () => void;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const PaginatedMediaList = <T,>({
  items,
  renderItem,
  keyExtractor,
  numColumns = 2,
  onEndReached,
  isLoading,
  isFetchingMore,
  isRefreshing,
  onRefresh,
  error,
  onRetry,
  contentContainerStyle,
}: PaginatedMediaListProps<T>) => {
  const { t } = useTranslation();

  if (isLoading && items.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={appColors.primaryColor} />
        <Text style={styles.message}>{t('common.loading')}</Text>
      </View>
    );
  }

  if (error && items.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.title}>{t('common.errorTitle')}</Text>
        <Text style={styles.message}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={onRetry}
          accessibilityRole="button"
        >
          <Text style={styles.retryText}>{t('common.retry')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlashList
      data={items}
      renderItem={({ item }) => renderItem(item)}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      contentContainerStyle={contentContainerStyle}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.message}>{t('common.noResults')}</Text>
        </View>
      }
      ListFooterComponent={
        isFetchingMore ? (
          <ActivityIndicator
            style={styles.footer}
            color={appColors.primaryColor}
          />
        ) : error ? (
          <TouchableOpacity
            style={styles.footerRetry}
            onPress={onRetry}
            accessibilityRole="button"
          >
            <Text style={styles.retryText}>{t('common.retry')}</Text>
          </TouchableOpacity>
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  empty: {
    padding: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  message: {
    marginTop: 8,
    color: '#666',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: appColors.primaryColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  retryText: {
    fontWeight: '700',
    color: '#000',
  },
  footer: {
    paddingVertical: 16,
  },
  footerRetry: {
    marginVertical: 16,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: appColors.primaryColor,
    paddingVertical: 10,
  },
});

export default PaginatedMediaList;
