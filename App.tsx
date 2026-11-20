/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider } from 'react-i18next';
import { PaperProvider } from 'react-native-paper';
import { store } from './src/store/store.ts';
import Navigation from './src/navigation/AppNavigation.tsx';
import NetworkConnection from './src/utils/networkConnection.tsx';
import ApiErrorSnackbar from './src/components/api-error-snackbar/ApiErrorSnackbar.tsx';
import ErrorBoundary from './src/components/error-boundary/ErrorBoundary.tsx';
import { i18nLocale } from './src/localization/i18nLocale.ts';

const App = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <PaperProvider>
        <I18nextProvider i18n={i18nLocale}>
          <SafeAreaProvider>
            <Navigation />
            <NetworkConnection />
            <ApiErrorSnackbar />
          </SafeAreaProvider>
        </I18nextProvider>
      </PaperProvider>
    </Provider>
  </ErrorBoundary>
);

export default App;
