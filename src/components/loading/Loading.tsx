import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import styles from './Loading.style.ts';
import { COLOR } from '../../constant/Colors';

const Loading = () => {
  return (
    <View style={styles.containerLoading}>
      <View style={styles.containerIndicator}>
        <ActivityIndicator size={'large'} color={COLOR.primaryColor} />
        <Text style={styles.loadingTextStyle}>Loading...</Text>
      </View>
    </View>
  );
};

const FooterLoading = () => {
  return <ActivityIndicator size={'large'} color={COLOR.primaryColor} />;
};

export { Loading, FooterLoading };
