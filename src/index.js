import React from 'react';
import {StatusBar, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {color} from './styles/theme';
import Router from './config/routes';

// Hide StatusBar on Android as it overlaps tabs
if (Platform.OS === 'android') StatusBar.setHidden(true);

const Root = ({store, persistor}) => (
    <Provider store={store}>
        <PersistGate
            persistor={persistor}
        >
        <Router/>

        </PersistGate>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.shape({}).isRequired,
    persistor: PropTypes.shape({}).isRequired,
};

export default Root;

