import axios from 'axios'
export const Axios = axios.create({
    baseURL: 'http://localhost:5000/api',


});

export const setAuthToken = (token) => {
    if (token) {

        Axios.defaults.headers.common['Authorization'] = token;

    } else {
        delete Axios.defaults.headers.common['Authorization'];

    }

}