import axios from 'axios';
import * as AxiosLogger from 'axios-logger';

const axiosInstance = axios.create();
if (__DEV__) {
  axiosInstance.interceptors.request.use(AxiosLogger.requestLogger);
  axiosInstance.interceptors.response.use(AxiosLogger.responseLogger);
}
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.params) {
      console.log('API Query Params:', config.params); // Log the query params
    }
    return config;
  },
  AxiosLogger.errorLogger // Handle request errors
);
export default axiosInstance;
