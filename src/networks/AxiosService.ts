import {ApiUrls} from './ApiUrls';
import axios from 'axios';

// Singleton class
const AxiosService = {
    async getServiceData(url: string, parameter: any) {
        let requestHeader = {
            'Content-Type': 'application/json',
        };
        return axios.get(ApiUrls.BASE_URL + url, {
            params: parameter, headers: requestHeader,
        });
    },

    async postServiceData(url: string, body: any) {
        let requestHeader = {
            'Content-Type': 'application/json',
        };

        return axios.post(ApiUrls.BASE_URL + url, body, {
            headers: requestHeader,
        });
    },

    // update
    async putServiceData(url: string, body: any) {
        let requestHeader = {
            'Content-Type': 'application/json',
        };

        return axios.put(ApiUrls.BASE_URL + url, body, {
            headers: requestHeader,
        });
    },

    //delete
    async deleteServiceData(url: string, body: any) {
        let serverUrl = ApiUrls.BASE_URL;
        let requestHeader = {
            'Content-Type': 'application/json',
        };
        return axios.delete(serverUrl + url, {
            data: body, headers: requestHeader,
        });
    }
};
export default AxiosService
