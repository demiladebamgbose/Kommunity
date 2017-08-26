/**
 * Created by jolaadeadewale on 24/07/2017.
 */

import * as types from '../actions/actionTypes';

const initialState = {
    image: {},
    cloudResponse: {},
    serverResponse: false,
    category: {}
};

export default function uploadReducer(state = initialState, action) {
    switch (action.type) {

        case types.UPLOAD_IMAGE_CAMERA:
            return {...state, image: action.image};

        case types.UPLOAD_FILE_CLOUD:
            return {...state, cloudResponse: action.data};

        case types.SAVE_UPLOAD_SERVER:
            return {...state, serverResponse: action.data};

        case types.ADD_UPLOAD_CATEGORY:
            return {...state, category: action.data};

        default:
            return state;
    }
}