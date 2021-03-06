import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, SET_USER, AUTH_ERROR, LOGOUT_USER } from '../types'
import { setAlert } from './alertActions'
import { Axios, setAuthToken } from '../../Helpers/Axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const config = {
    headers: {
        "Content-Type": "application/json"
    }
}
export const registerUser = ({ name, email, password, confirmPassword }) => async (dispatch) => {

    const body = JSON.stringify({ name, email, password, confirmPassword })

    try {
        const res = await Axios.post('/users/register', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data

        });

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL,


        });


    }





}

export const loginUser = (body) => (dispatch) => {

    Axios.post('/users/login', body, config)
        .then((res) => {

            const token = `Bearer ${res.data.token}`;
            setAuthToken(token)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.data
            })
            dispatch(getUserData());



        })
        .catch((err) => {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
            }
            dispatch({
                type: LOGIN_FAIL,


            });

        });
}

export const getUserData = () => (dispatch) => {
    Axios.get('/auth')
        .then(res => {
            console.log('fuck')
            cookies.set('user', res.data.data)
            dispatch({
                type: SET_USER,
                payload: res.data.data

            });

        }).catch(err => {

            dispatch({
                type: AUTH_ERROR
            })

        });


}

export const logoutUser = () => (dispatch) => {
    delete Axios.defaults.headers.common['Authorization']//deleting the entry
    cookies.remove('token');
    cookies.remove('user');
    dispatch({
        type: LOGOUT_USER

    });




};