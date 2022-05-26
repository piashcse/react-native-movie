import React, {useEffect, useState} from "react";
import NetInfo from "@react-native-community/netinfo";
import {View, Button, Image, Text} from "react-native";

const Splash = (props) => {
    const [network, setNetwork] = useState('')
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        unsubscribe()
    }, []);

    function unsubscribe() {
        NetInfo.fetch().then(state => {
            setNetwork(state)
            setTimeout(function () {
                if (state.isConnected) {
                    // any thing you want to load before navigate home screen
                } else {
                    setLoading(false)
                }
            }, 500);
        })
    };


    return (
        <View style={{
            flex: 1,
            backgroundColor: global.bgBody,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Image
                source={Logo}
                style={{
                    width: 150,
                    height: 123,
                }}
            />
            {!network?.isConnected || loading ? <View style={{marginTop: 30}}>

                <Button
                    title="Try Again"
                    onPress={() => {
                        setLoading(true)
                        unsubscribe()
                    }}
                    loading={loading}
                />
            </View> : null}
        </View>
    );
};

export default Splash;