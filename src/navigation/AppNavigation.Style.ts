import {StyleSheet} from 'react-native';
import {COLOR} from "../constant/Colors.ts";
const styles = StyleSheet.create({
    rootView:{
        flexGrow: 1
    },
    favStyle: {
        bottom: 64,
        right: 16,
        position: 'absolute',
    },
    tabBarIndicatorStyle:{
        backgroundColor: COLOR.tabIndicatorColor,
        height: 3,
        borderRadius: 3,
        width: '15%',
        marginLeft:'18%'
    },
    tabBarLabelStyle: {
        fontSize: 14,
        fontWeight: 'bold',
    }
});
export default styles;
