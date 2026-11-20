import { StyleSheet } from 'react-native';
import { appColors } from '../../constant/appColors.ts';

export const mediaDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  message: {
    marginTop: 8,
    color: '#666',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: appColors.primaryColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  retryText: {
    fontWeight: '700',
    color: '#000',
  },
  backdropContainer: {
    height: 260,
  },
  backdrop: {
    height: 260,
    width: '100%',
    resizeMode: 'cover',
    opacity: 0.96,
  },
  favoriteContainer: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  posterRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: -70,
  },
  poster: {
    height: 180,
    width: 130,
    marginLeft: 12,
    borderRadius: 14,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 8,
    marginTop: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: appColors.black,
  },
  factsRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  fact: {
    flex: 1,
  },
  factLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: appColors.black,
  },
  factValue: {
    fontSize: 12,
    color: appColors.black,
  },
  content: {
    marginHorizontal: 8,
    paddingBottom: 24,
  },
  sectionTitle: {
    marginTop: 8,
    fontSize: 19,
    fontWeight: 'bold',
    color: appColors.black,
  },
  seeMore: {
    color: appColors.primaryColor,
  },
  castContainer: {
    width: 88,
    margin: 4,
    alignItems: 'center',
  },
  castImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: appColors.inputTextBorderColor,
    resizeMode: 'cover',
  },
  castName: {
    width: 84,
    marginTop: 2,
    fontSize: 10,
    textAlign: 'center',
    color: appColors.subTitleColor,
  },
});
