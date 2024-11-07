import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginTop: 8,
    borderRadius: 18,
    overflow: 'hidden',
  },
  imageView: {
    height: 270,
    borderRadius: 18,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  titleText: {
    color: 'white',
  },
  removeIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 24,
    padding: 8,
  },
});
export default styles;
