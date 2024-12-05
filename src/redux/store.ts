import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { movieApi } from './query/RTKQuery.ts';
import { setupListeners } from '@reduxjs/toolkit/query';

const configurationAppStore = () => {
  const store = configureStore({
    reducer: {
      [movieApi.reducerPath]: movieApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([logger, movieApi.middleware]),
    devTools: process.env.NODE_ENV === 'development',
  });
  setupListeners(store.dispatch);
  return store;
};
export default configurationAppStore;
