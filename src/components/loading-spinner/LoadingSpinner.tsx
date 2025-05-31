import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './LoadingSpinner.style.ts';
import { useSelector } from 'react-redux';
import { selectGlobalLoading } from '../../utils/common.ts';
import { appColors } from '../../constant/appColors.ts';

const LoadingSpinner = () => {
  const isLoading = useSelector(selectGlobalLoading);
  if (!isLoading) return null;
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={appColors.primaryColor} />
    </View>
  );
};

export default LoadingSpinner;
