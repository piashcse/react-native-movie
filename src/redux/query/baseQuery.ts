import { AxiosError, AxiosRequestConfig } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { AppConstants } from '../../constant/appConstants.ts';
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
const axiosBaseQuery =
  (
    { baseUrl }: AxiosBaseQueryArgs = { baseUrl: AppConstants.BASE_URL }
  ): BaseQueryFn<AxiosQueryParams, unknown, unknown> =>
  async ({ url, method = 'GET', data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params: {
          ...params,
          api_key: AppConstants.API_KEY, // Add API key here
        },
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      return {
        error: {
          status: error.response?.status || 500,
          data: error.response?.data || error.message,
        },
      };
    }
  };

export default axiosBaseQuery;
