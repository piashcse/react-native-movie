import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    backgroundColor: 'white',
  },
  searchBarContainer: {
    borderRadius: 0,
  },
  imageView: {
    width: 100,
    height: 120,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  backgroundImage: {
    borderRadius: 8,
  },
  itemListContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  flatListContainer: {
    marginHorizontal: 8,
    maxHeight: 410,
  },
  titleContainer: {
    marginLeft: 8,
  },
  titleStyle: {
    fontSize: 16,
  },
});
export default styles;
