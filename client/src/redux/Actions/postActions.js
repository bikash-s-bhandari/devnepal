import { Axios } from '../../Helpers/Axios';
import { setAlert } from './alertActions';
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from '../../redux/types';

// Get posts of user
export const getPosts = () => async dispatch => {
    try {
        const res = await Axios.get('/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add post
export const addPost = (text) => async dispatch => {

    try {
        const res = await Axios.post('/posts', { text });

        dispatch({
            type: ADD_POST,
            payload: res.data.data
        });

        dispatch(setAlert('Post Created', 'success'));
    } catch (err) {
        console.log(err.response)
        // dispatch({
        //     type: POST_ERROR,
        //     payload: { msg: err.response.statusText, status: err.response.status }
        // });
    }
};


// Add like
export const addLike = id => async dispatch => {
    try {
        const res = await Axios.put(`/posts/like/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Remove like
export const removeLike = id => async dispatch => {
    try {
        const res = await Axios.put(`/posts/unlike/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete post
export const deletePost = id => async dispatch => {
    try {
        await Axios.delete(`/posts/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id
        });

        dispatch(setAlert('Post Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};



// Get post by id
export const getPostById = id => async dispatch => {
    try {
        const res = await Axios.get(`/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add comment
export const addComment = (postId, data) => async dispatch => {
    try {
        const res = await Axios.post(`/posts/comment/${postId}`, data);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data.data
        });

        dispatch(setAlert('Comment Added', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        await Axios.delete(`/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        });

        dispatch(setAlert('Comment Removed', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
