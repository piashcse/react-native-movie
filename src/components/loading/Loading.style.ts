import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../constant/Colors';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  containerLoading: {
    width,
    height,
    position: 'absolute',
    backgroundColor: colors.loadingBackgroundColor,
    top: 0,
    left: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.transparentColor,
    height: 100,
    width: width / 1.2,
    borderRadius: 2,
  },
  loadingTextStyle: {
    fontSize: 25,
    color: colors.primaryColor,
    marginLeft: 20,
  },
});

export default styles;
