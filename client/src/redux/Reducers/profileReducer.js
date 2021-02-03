import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,

} from '../../redux/types';

const initialState = {
    profile: null,
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            };

        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null
            };


        default:
            return state;
    }
}


