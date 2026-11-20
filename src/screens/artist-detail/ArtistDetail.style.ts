import { StyleSheet } from 'react-native';
import { appColors } from '../../constant/appColors.ts';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
  },
  imageView: {
    height: 250,
    width: 190,
    resizeMode: 'stretch',
    borderRadius: 16,
  },
  secondContainer: {
    flexDirection: 'row',
  },
  description: {
    marginTop: 8,
    fontSize: 19,
    color: appColors.black,
    fontWeight: 'bold',
  },
  artistInfoContainer: {
    paddingLeft: 16,
  },
  artistName: {
    fontSize: 24,
  },
  otherInfoContainer: {
    marginTop: 8,
  },
  titleContent: {
    fontSize: 13,
  },
  titleData: {
    fontSize: 16,
    color: appColors.black,
  },
  biography: {
    fontSize: 24,
    marginTop: 16,
    marginBottom: 8,
    color: appColors.black,
  },
  seeMoreTextStyle: { color: appColors.primaryColor },
});
export default styles;
