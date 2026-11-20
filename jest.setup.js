import 'react-native-gesture-handler/jestSetup';

jest.mock('redux-logger', () => () => (next) => (action) => next(action));

jest.mock('@react-native-community/netinfo', () =>
  require('@react-native-community/netinfo/jest/netinfo-mock.js')
);

jest.mock('./src/service/axiosInstance', () => ({
  __esModule: true,
  default: jest.fn(() => new Promise(() => {})),
}));

jest.mock('react-native-localize', () => ({
  getLocales: () => [
    {
      countryCode: 'US',
      languageTag: 'en-US',
      languageCode: 'en',
      isRTL: false,
    },
  ],
  findBestLanguageTag: () => ({ languageTag: 'en', isRTL: false }),
}));

jest.mock('react-native-mmkv', () => {
  const store = new Map();

  return {
    createMMKV: () => ({
      set: (key, value) => store.set(key, value),
      getString: (key) => store.get(key),
      getBoolean: (key) => store.get(key),
      getNumber: (key) => store.get(key),
      getBuffer: (key) => store.get(key),
      contains: (key) => store.has(key),
      remove: (key) => store.delete(key),
      getAllKeys: () => [...store.keys()],
      clearAll: () => store.clear(),
    }),
  };
});
