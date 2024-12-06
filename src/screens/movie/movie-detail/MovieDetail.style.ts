import { StyleSheet } from 'react-native';
import { colors } from '../../../constant/Colors.ts';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'white',
  },
  backdropImageView: {
    height: 260,
    resizeMode: 'cover',
    opacity: 0.96,
  },
  posterImageContainer: {
    marginTop: -70,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'flex-end',
    bottom: 0,
  },
  posterImageView: {
    height: 180,
    width: 130,
    bottom: 0,
    marginLeft: 12,
    borderRadius: 14,
  },
  secondContainer: {
    flex: 1,
    paddingHorizontal: 8,
    marginTop: 8,
  },
  title: {
    fontSize: 18,
    color: colors.black,
    fontWeight: 'bold',
  },
  thirdContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  titleAndInfoContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  infoTitle: { fontSize: 13, color: colors.black, fontWeight: '500' },
  infoTitleData: { fontSize: 12 },
  infoContainer: {
    flexDirection: 'row',
  },
  fourthContainer: {
    flex: 1,
  },
  footerContainer: {
    marginHorizontal: 8,
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
    height: 160,
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
  favoriteContainer: {
    position: 'absolute',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 16,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  seeMoreTextStyle: { color: colors.primaryColor },
  artistTitleStyle: {
    flex: 1,
    width: 80,
    fontSize: 10,
    alignSelf: 'center',
    textAlign: 'center',
    color: colors.subTitleColor,
  },
});
export default styles;
