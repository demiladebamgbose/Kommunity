/**
 * Created by jolaadeadewale on 08/10/2017.
 */


import * as types from '../actions/actionTypes';

const initialState = {
    events: [],
    sponsors: []
};

export default function eventReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_EVENTS:
            return {
                ...state,
                events: action.event
            };

        case types.GET_SPONSORED:
            return {
                ...state,
                sponsors: action.sponsor
            };

        default:
            return state;
    }
}