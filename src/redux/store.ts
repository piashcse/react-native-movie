import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { movieApi } from './query/rtkQuery.ts';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apErrorMiddleware } from './apErrorMiddleware.ts';

const configureAppStore = () => {
  const store = configureStore({
    reducer: {
      [movieApi.reducerPath]: movieApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        logger,
        apErrorMiddleware,
        movieApi.middleware,
      ]),
    devTools: process.env.NODE_ENV === 'development',
  });
  setupListeners(store.dispatch);
  return store;
};
export default configureAppStore;
