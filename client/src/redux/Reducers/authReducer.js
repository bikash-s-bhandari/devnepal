import { REGISTER_SUCCESS, REGISTER_FAIL, SET_USER, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_USER } from '../types'
const initialState = {
    isAuthenticated: false,
    loading: true,
    token: localStorage.getItem('token'),
    user: null
}


export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
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
            localStorage.removeItem('token')
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