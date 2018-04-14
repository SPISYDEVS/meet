import React, {Component} from 'react';
import {Font, AppLoading} from 'expo';

import {persistor, store} from './src/redux/store';
import Root from './src/index';
import {Provider} from "react-redux";

function cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
}

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            isReady: false,
        }
    }

    static async _loadAssetsAsync() {
        const fontAssets = cacheFonts([

            {RobotoExtraBold: require('./src/assets/fonts/Roboto-Black.ttf')},
            {RobotoBold: require('./src/assets/fonts/Roboto-Bold.ttf')},
            {RobotoMedium: require('./src/assets/fonts/Roboto-Medium.ttf')},
            {RobotoRegular: require('./src/assets/fonts/Roboto-Regular.ttf')},
            {RobotoLight: require('./src/assets/fonts/Roboto-Light.ttf')}
        ]);

        await Promise.all([...fontAssets]);
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={App._loadAssetsAsync}
                    onFinish={() => this.setState({isReady: true})}
                    onError={console.warn}
                />
            );
        }

        return <Root store={store} persistor={persistor}/>;

    }
}