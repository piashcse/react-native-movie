import { AxiosError, AxiosRequestConfig } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { env } from '../config/env.ts';
import axiosInstance from './axiosInstance.ts';

type AxiosBaseQueryArgs = {
  baseUrl?: string;
};

type AxiosQueryParams = {
  url: string;
  method?: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  headers?: AxiosRequestConfig['headers'];
};

type ApiError = {
  status: number;
  data: unknown;
};

const axiosBaseQuery =
  ({ baseUrl = env.baseUrl }: AxiosBaseQueryArgs = {}): BaseQueryFn<
    AxiosQueryParams,
    unknown,
    ApiError
  > =>
  async ({ url, method = 'GET', data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params: {
          ...params,
          api_key: env.apiKey,
        },
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      return {
        error: {
          status: error.response?.status ?? 500,
          data: error.response?.data ?? error.message,
        },
      };
    }
  };

export default axiosBaseQuery;
