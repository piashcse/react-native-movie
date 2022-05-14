import {StyleSheet} from 'react-native';
import {COLOR} from "../../appconstants/Colors";

const styles = StyleSheet.create({
    mainView: {
        flex: 1
    },
    imageView: {
        height: 270, resizeMode: 'stretch'
    },
    secondContainer: {
        flex: 1, paddingHorizontal: 8, marginTop: 8
    },
    title: {
        fontSize: 20, color: COLOR.black, fontWeight: 'bold'
    },
    thirdContainer: {
        flexDirection: 'row', marginTop: 8
    },
    infoTitle: {fontSize: 12},
    infoTitleData: {fontSize: 14, color: COLOR.black, fontWeight: 'bold'},
    fourthContainer: {
        flex: 1
    },
    description: {
        marginTop: 8, fontSize: 19, color: COLOR.black, fontWeight: 'bold'
    },
    flatListContainer: {
        flex: 1, marginTop: 4
    },
    movieItemContainer: {margin: 4},
    similarImageView: {
        height: 150, width: 120, borderRadius: 12, resizeMode: 'cover'
    }
});
export default styles;