import { StyleSheet } from 'react-native';
import { appColors } from '../../constant/appColors.ts';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  flatListContainer: {
    marginHorizontal: 4,
    marginTop: 4,
  },
  celebrityItemContainer: {
    flex: 1 / 2,
    margin: 4,
  },
  imageView: {
    height: 250,
    borderRadius: 18,
    resizeMode: 'cover',
  },
  divider: {
    backgroundColor: appColors.suggestionContainerColor,
    height: 0.5,
  },
  backgroundImage: {
    borderRadius: 18,
  },
  title: {
    fontSize: 16,
    paddingTop: 4,
  },
  popularity: {
    fontSize: 14,
    color: 'gray',
  },
});
export default styles;
