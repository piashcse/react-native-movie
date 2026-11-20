module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@reduxjs/toolkit|@shopify/flash-list|immer|redux|react-redux|zustand|@react-navigation|react-native-.*|nitro-core)/)',
  ],
};
