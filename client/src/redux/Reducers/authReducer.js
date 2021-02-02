import { REGISTER_SUCCESS, REGISTER_FAIL, SET_USER, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_USER } from '../types'
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const initialState = {
    isAuthenticated: false,
    loading: false,
    token: cookies.get('token'),
    user: null
}


export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_USER:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            };

        case SET_USER:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload

            };

        default:
            return state;




    }


}