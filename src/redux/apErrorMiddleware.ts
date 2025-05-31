import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { useApiErrorStore } from '../zustand-store/apiErrorStore.ts';

interface ErrorResponse {
  status: number;
  data: {
    message?: string;
    error?: string;
  };
}

export const apErrorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const error = action.payload as ErrorResponse;
    const errorMessage =
      error.data?.message ||
      error.data?.error ||
      'Something went wrong. Please try again.';
    if (errorMessage !== 'Invalid token')
      useApiErrorStore.getState().showError(errorMessage);
  }

  return next(action);
};
