/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import configureStore from './src/redux/store.ts';
import { Provider } from 'react-redux';
import Navigation from './src/navigation/AppNavigation';
import NetworkConnection from './src/utils/NetworkConnection';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';

const store = configureStore();
const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaProvider>
          <Navigation />
          <NetworkConnection />
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
