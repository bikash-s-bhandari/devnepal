import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, SET_USER, AUTH_ERROR, LOGOUT_USER } from '../types'
import { setAlert } from './alertActions'
// import { guest } from '../../Helpers/Axios'
import axios from 'axios';
import setAuthToken from '../../Utils/setAuthToken'

export const registerUser = ({ name, email, password }) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify({ name, email, password })
    console.log('Body', body)
    try {
        const res = await axios.post('/api/users/register', body, config);
        console.log('Res', res)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data

        });

    } catch (err) {
        console.log('errors', err.response?.data)
        // const errors = err.response.data.errors;
        // if (errors) {
        //     errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
        // }
        // dispatch({
        //     type: REGISTER_FAIL,


        // });


    }





}

export const loginUser = (body) => (dispatch) => {
    axios.defaults.baseURL = "http://localhost:5000"
    axios.post('/api/users/login', body)
        .then((res) => {
            console.log(res.data);
            const token = `Bearer ${res.data.token}`;
            localStorage.setItem('token', `Bearer ${res.data.token}`);//setting token to localstorage
            setAuthToken(token);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            dispatch(getUserData());



        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: LOGIN_FAIL,


            });

        });
}

export const getUserData = () => (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    axios.defaults.baseURL = "http://localhost:5000"

    axios.get('/api/auth')
        .then(res => {
            console.log('user data', res.data);

            dispatch({
                type: SET_USER,
                payload: res.data

            });

        }).catch(err => {
            console.log(err.response);
            dispatch({
                type: AUTH_ERROR
            })

        });


}

export const logoutUser = () => (dispatch) => {
    delete axios.defaults.headers.common['Authorization']//deleting the entry
    dispatch({
        type: LOGOUT_USER

    });




};