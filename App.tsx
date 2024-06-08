/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { RootComponent } from './src/pages';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Toast from 'react-native-toast-message';
import { enableFreeze, enableScreens } from 'react-native-screens';

function App(): React.JSX.Element {
    enableFreeze(true);
    enableScreens(false);
    return (
        <Provider store={store}>
            <RootComponent />
            <Toast />
        </Provider>
    );
}

export default App;
