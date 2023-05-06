import React from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import styles from './LoadingStyle';
import {COLOR} from '../../appconstants/Colors';

const Loading = () => {
    return (<View style={styles.containerLoading}>
        <View style={styles.containerIndicator}>
            <ActivityIndicator size={'large'} color={COLOR.primaryColor}/>
            <Text style={styles.loadingTextStyle}>Loading...</Text>
        </View>
    </View>);
};

export default Loading