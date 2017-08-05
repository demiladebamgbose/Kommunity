/**
 * Created by jolaadeadewale on 27/07/2017.
 */


import * as types from '../actions/actionTypes';

const initialState = {
    recent: {},
    viewFile: {},
    userFile: {}
};

export default function fileReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_RECENT_FILES:
            return {
                ...state,
                recent: action.files
            };

        case types.FETCH_USER_FILES:
            return {
                ...state,
                userFile: action.files
            };

        case types.FETCH_SINGLE_FILE_VIEW:
            return {...state, viewFile: action.viewFile};

        default:
            return state;
    }
}