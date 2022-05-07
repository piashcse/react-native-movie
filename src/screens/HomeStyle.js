import {StyleSheet, Dimensions} from 'react-native';
import {COLOR} from '../appconstants/Colors';

let width = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({
    mainView: {
        flex: 1, flexDirection: 'column'
    }, flatListContainer: {
        flex: 1, marginHorizontal: 4
    }, imageView: {
        height: 280, width: width / 2, margin: 4, borderRadius: 18, resizeMode: 'cover'
    }, divider: {
        backgroundColor: COLOR.suggestionContainerColor, height: 0.5,
    },
});
export default styles;