/**
 * Created by jolaadeadewale on 27/07/2017.
 */


import * as types from '../actions/actionTypes';

const initialState = {
    recent: []
};

export default function fileReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_RECENT_FILES:
            return {...state, recent: action.files}

        default:
            return state;
    }
}