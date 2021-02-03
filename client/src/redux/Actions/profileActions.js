import { Axios } from '../../Helpers/Axios';
import { setAlert } from './alertActions';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,

} from '../../redux/types';

// Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await Axios.get('/users/profile/me');
        console.log('profile', res)

        dispatch({
            type: GET_PROFILE,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err.response)
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


// Create or update profile
export const createProfile = (data, history, edit = false) => async (
    dispatch
) => {
    try {
        await Axios.post('users/profile', data);

        dispatch(getCurrentProfile());

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if (!edit) {
            history.push('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add Experience
export const addExperience = (data, history) => async (dispatch) => {
    try {
        const res = await Axios.put('users/profile/experience', data);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data.data
        });

        dispatch(setAlert('Experience Added', 'success'));
        history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
    try {
        const res = await Axios.put('users/profile/education', formData);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data.data
        });

        dispatch(setAlert('Education Added', 'success'));

        history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};


