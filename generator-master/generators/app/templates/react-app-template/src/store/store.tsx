import * as React from 'react';
import { CircularProgress } from '@material-ui/core';
import * as storage from 'localforage';
import * as Reader from 'fp-ts/lib/Reader';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import stateReconciler from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import createSagaMiddleware from 'redux-saga';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { IAppStore, IEnvironment, TApplicationStore } from './types';
import sagas from './sagas';
import { rootReducer } from './reducers';
import { DEFAULT_STATE } from './constants';

const whitelist: Array<keyof IAppStore> = [];

// eslint-disable-next-line no-unused-vars
export const storeR: Reader.Reader<IEnvironment, React.FunctionComponent<{}>> = (_env) => {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const persistConfig = {
    key: 'root',
    storage,
    whitelist,
    stateReconciler,
    transforms: [
      createTransform(
        // @ts-ignore
        (store, key: keyof IAppStore) => (whitelist.includes(key) ? TApplicationStore[key].encode(store) : store),
        (raw, key: keyof IAppStore) => (whitelist.includes(key)
          // @ts-ignore
          ? TApplicationStore[key].decode(raw).getOrElse(DEFAULT_STATE[key])
          : raw),
        {},
      ),
    ],
  };
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(
    persistedReducer, DEFAULT_STATE as PersistPartial & IAppStore, composeEnhancers(applyMiddleware(sagaMiddleware)),
  );
  const persistor = persistStore(store);

  sagaMiddleware.run(sagas);

  return ({ children }: { children?: React.ReactNode; }) => (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<CircularProgress variant="indeterminate" />}>
        {children}
      </PersistGate>
    </Provider>
  );
};
