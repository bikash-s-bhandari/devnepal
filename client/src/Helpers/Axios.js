import axios from 'axios'
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export const Axios = axios.create({
    baseURL: 'http://localhost:5000/api',


});

export const setAuthToken = (token) => {
    if (token) {
        cookies.set('token', token);
        Axios.defaults.headers.common['Authorization'] = token;

    } else {
        cookies.remove('token');
        delete Axios.defaults.headers.common['Authorization'];

    }

}