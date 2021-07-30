import axios from 'axios';
import qs from 'qs';

const DEV = true;
axios.defaults.withCredentials = true;

// for test
const client = axios.create({
    baseURL: DEV === true ? 'http://localhost:5050' : 'api_server',
    headers: {
        post: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        // WithCredentials: true,
    },
    paramsSerializer(params) {
        return qs.stringify(params, { indices: false });
    },
});

client.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

// 인터셉터 설정
client.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const { config } = error;

        if (error && error.request) {
            if (error.request.status === 403) {
                return null;
            }
        }

        return error;
    },
);

export default client;
