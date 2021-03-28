/**
 * @format
 */
import React from 'react'
import {AppRegistry, Button} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store from "./src/slice/store"
import { Provider } from 'react-redux';

const ReduxApp = ()=>{
    return(
        <Provider store={store}>
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => ReduxApp);
