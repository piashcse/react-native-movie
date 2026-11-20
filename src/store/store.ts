import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { movieApi } from '../service/rtk-query/rtkQuery.ts';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiErrorMiddleware } from './apiErrorMiddleware.ts';

export const configureAppStore = () => {
  const store = configureStore({
    reducer: {
      [movieApi.reducerPath]: movieApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      const defaultMiddleware = getDefaultMiddleware();
      return __DEV__
        ? defaultMiddleware.concat(
            logger,
            apiErrorMiddleware,
            movieApi.middleware
          )
        : defaultMiddleware.concat(apiErrorMiddleware, movieApi.middleware);
    },
    devTools: __DEV__,
  });

  setupListeners(store.dispatch);
  return store;
};

export const store = configureAppStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
