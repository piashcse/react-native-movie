/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import configureStore from './src/redux';
import {Provider} from 'react-redux';
import Navigation from './src/navigation/AppNavigation';
import NetworkConnection from "./src/utils/NetworkConnection";

const store = configureStore();
const App = () => {
    return (
        <Provider store={store}>
            <NetworkConnection/>
            <Navigation/>
        </Provider>
    );
};

export default App;
