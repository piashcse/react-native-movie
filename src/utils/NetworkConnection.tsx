import React from "react";
import {useNetInfo, NetInfoState} from "@react-native-community/netinfo";
import {View, StyleSheet} from "react-native";
import Snackbar from 'react-native-snackbar';

const checkInternetConnection = () => {
    const internetState: NetInfoState = useNetInfo();

    if (internetState.isConnected === false) {
        return (
            <View style={styles.centered}>
                {Snackbar.show({
                    text: 'Network connection is unavailable',
                    duration: Snackbar.LENGTH_INDEFINITE,
                    action: {
                        text: 'RETRY',
                        textColor: 'green',
                        onPress: () => {
                            /* Do something. */
                        },
                    },
                })}
            </View>
        );
    }
};
const styles = StyleSheet.create({
    centered: {
        alignItems: "center",
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
});


export default checkInternetConnection;
