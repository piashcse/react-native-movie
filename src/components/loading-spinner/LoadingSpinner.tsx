import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './LoadingSpinner.style.ts';
import { useSelector } from 'react-redux';
import { selectGlobalLoading } from '../../utils/Common.ts';
import { colors } from '../../constant/Colors.ts';

const LoadingSpinner = () => {
  const isLoading = useSelector(selectGlobalLoading);
  if (!isLoading) return null;
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={colors.primaryColor} />
    </View>
  );
};

export default LoadingSpinner;
