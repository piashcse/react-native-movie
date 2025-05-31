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
import NetworkConnection from './src/utils/networkConnection.tsx';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider } from 'react-i18next';
import { PaperProvider } from 'react-native-paper';
import i18n from 'i18next';
import LoadingSpinner from './src/components/loading-spinner/LoadingSpinner.tsx';

const store = configureStore();
const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <I18nextProvider i18n={i18n}>
          <SafeAreaProvider>
            <Navigation />
            <NetworkConnection />
            <LoadingSpinner />
          </SafeAreaProvider>
        </I18nextProvider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
