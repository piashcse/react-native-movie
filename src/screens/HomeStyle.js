import {StyleSheet} from 'react-native';
import {COLOR} from '../appconstants/Colors';

const styles = StyleSheet.create({
    mainView: {
        flex: 1, flexDirection: 'column', backgroundColor: 'white'
    }, flatListContainer: {
        flex: 1, marginHorizontal: 4
    }, movieItemContainer: {flex: 1 / 2, margin: 4}, imageView: {
        height: 270, borderRadius: 18, resizeMode: 'cover'
    }, divider: {
        backgroundColor: COLOR.suggestionContainerColor, height: 0.5,
    },
});
export default styles;