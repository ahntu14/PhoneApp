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

function App(): React.JSX.Element {
    return (
        <Provider store={store}>
            <RootComponent />
        </Provider>
    );
}

export default App;
