import axios from 'axios';
import * as AxiosLogger from 'axios-logger';

const axiosInstance = axios.create({
  timeout: 15000,
  headers: {
    Accept: 'application/json',
  },
});

if (__DEV__) {
  axiosInstance.interceptors.request.use(AxiosLogger.requestLogger);
  axiosInstance.interceptors.response.use(AxiosLogger.responseLogger);
  axiosInstance.interceptors.request.use((config) => {
    if (config.params) {
      const params = { ...config.params };
      if (params.api_key) {
        params.api_key = '***';
      }
      console.debug('API Query Params:', params);
    }
    return config;
  }, AxiosLogger.errorLogger);
}

export default axiosInstance;
