import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import styles from './Loading.style.ts';
import { colors } from '../../constant/Colors';

const Loading = () => {
  return (
    <View style={styles.containerLoading}>
      <View style={styles.containerIndicator}>
        <ActivityIndicator size={'large'} color={colors.primaryColor} />
        <Text style={styles.loadingTextStyle}>Loading...</Text>
      </View>
    </View>
  );
};

const FooterLoading = () => {
  return <ActivityIndicator size={'large'} color={colors.primaryColor} />;
};

export { Loading, FooterLoading };
