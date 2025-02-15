import axios from 'axios';
import * as AxiosLogger from 'axios-logger';

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.params) {
      console.log('API Query Params:', config.params); // Log the query params
    }
    // Keep the original logger
    AxiosLogger.requestLogger(config);
    console.log('Authorization header:', config.headers);

    return config;
  },
  AxiosLogger.errorLogger // Handle request errors
);
export default axiosInstance;
