import { StyleSheet } from 'react-native';
import { colors } from '../../constant/Colors.ts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: colors.whiteColor,
    opacity: 0.6,
  },
});
export default styles;
