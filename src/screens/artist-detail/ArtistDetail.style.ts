import { StyleSheet } from 'react-native';
import { colors } from '../../constant/Colors';

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
  title: {
    fontSize: 20,
    color: colors.black,
    fontWeight: 'bold',
  },
  thirdContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  infoTitle: { fontSize: 12 },
  infoTitleData: { fontSize: 14, color: colors.black, fontWeight: 'bold' },
  fourthContainer: {
    flex: 1,
  },
  description: {
    marginTop: 8,
    fontSize: 19,
    color: colors.black,
    fontWeight: 'bold',
  },
  flatListContainer: {
    flex: 1,
    marginTop: 4,
  },
  movieItemContainer: { margin: 4 },
  similarImageView: {
    height: 150,
    width: 120,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  artistImageView: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginHorizontal: 4,
    borderWidth: 1.5,
    borderColor: colors.inputTextBorderColor,
    resizeMode: 'cover',
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
    color: colors.black,
  },
  biography: {
    fontSize: 24,
    marginTop: 16,
    marginBottom: 8,
    color: colors.black,
  },
});
export default styles;
