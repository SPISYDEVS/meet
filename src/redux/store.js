/* global window */
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
import thunk from 'redux-thunk';
import reducers from './reducers';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise-middleware';

// Redux Persist config
const config = {
  key: 'root',
  storage,
  blacklist: ['status'],
};

const reducer = persistCombineReducers(config, reducers);


const configureStore = () => {
  const store = createStore(
    reducer,
    applyMiddleware(promise(), thunk, createLogger()),
  );

  const persistor = persistStore(
    store,
    null,
    () => { store.getState(); },
  );

  return { persistor, store };
};

export const {persistor, store} = configureStore();
