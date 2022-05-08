import {ApiUrls} from './ApiUrls';
import axios from 'axios';
import {Alert} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

// Singleton class
const AxiosService = {
    async getServiceData(url, parameter) {
        const connectionInfo = await NetInfo.fetch();
        if (connectionInfo.type === 'none') {
            Alert('LOGIN_MODULE.PLEASE_CONNECT_TO_INTERNET');
            throw new Error('Please connect to internet');
        } else {
            let requestHeader;
            requestHeader = {
                'Content-Type': 'application/json',
            };
            return axios.get(ApiUrls.BASE_URL + url, {
                params: parameter, headers: requestHeader,
            });
        }
    },

    async postServiceData(url, body) {
        const connectionInfo = await NetInfo.fetch();
        if (connectionInfo.type === 'none') {
            Alert('LOGIN_MODULE.PLEASE_CONNECT_TO_INTERNET');
            throw new Error('Please connect to internet');
        } else {
            let requestHeader;
            requestHeader = {
                'Content-Type': 'application/json',
            };

            return axios.post(ApiUrls.BASE_URL + url, body, {
                headers: requestHeader,
            });
        }
    },

    // update
    async putServiceData(url, body) {
        const connectionInfo = await NetInfo.fetch();
        if (connectionInfo.type === 'none') {
            Alert('LOGIN_MODULE.PLEASE_CONNECT_TO_INTERNET');
            throw new Error('Please connect to internet');
        } else {
            let requestHeader;
            requestHeader = {
                'Content-Type': 'application/json',
            };

            return axios.put(ApiUrls.BASE_URL + url, body, {
                headers: requestHeader,
            });
        }
    },

    //delete
    async deleteServiceData(url, body) {
        const connectionInfo = await NetInfo.fetch();
        if (connectionInfo.type === 'none') {
            Alert('LOGIN_MODULE.PLEASE_CONNECT_TO_INTERNET');
            throw new Error('Please connect to internet');
        } else {
            let requestHeader;
            let serverUrl = ApiUrls.BASE_URL;
            requestHeader = {
                'Content-Type': 'application/json',
            };
            return axios.delete(serverUrl + url, {
                data: body, headers: requestHeader,
            });
        }
    }
};
export default AxiosService