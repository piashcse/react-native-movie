import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { useApiErrorStore } from './zustand/apiErrorStore.ts';

type ErrorPayload = {
  status?: number;
  data?:
    | {
        message?: string;
        error?: string;
        status_message?: string;
      }
    | string;
};

const getErrorMessage = (payload: unknown): string => {
  if (typeof payload === 'string') {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const data = (payload as ErrorPayload).data;
    if (typeof data === 'string') {
      return data;
    }
    if (data?.message || data?.error || data?.status_message) {
      return data.message || data.error || data.status_message || '';
    }
  }

  return 'Something went wrong. Please try again.';
};

export const apiErrorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const errorMessage = getErrorMessage(action.payload);
    if (errorMessage !== 'Invalid token') {
      useApiErrorStore.getState().showError(errorMessage);
    }
  }

  return next(action);
};
