import { StyleSheet } from 'react-native';
import { colors } from '../constant/Colors.ts';

const styles = StyleSheet.create({
  rootView: {
    flexGrow: 1,
  },
  favStyle: {
    bottom: 64,
    right: 16,
    position: 'absolute',
  },
  tabBarIndicatorStyle: {
    backgroundColor: colors.tabIndicatorColor,
    height: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    width: '8%',
    marginLeft: '12%',
  },
  tabBarLabelStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
export default styles;
