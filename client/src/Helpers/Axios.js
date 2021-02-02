import axios from 'axios'
import Cookies from 'universal-cookie';
import store from '../redux/store';
import { logoutUser } from '../redux/Actions/authActions';
const cookies = new Cookies();
export const Axios = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }


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

/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
**/

Axios.interceptors.response.use(
    res => res,
    err => {
        if (err.response.status === 401) {
            store.dispatch(logoutUser());
        }
        return Promise.reject(err);
    }
);