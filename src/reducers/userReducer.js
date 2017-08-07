/**
 * Created by jolaadeadewale on 23/07/2017.
 */
import * as types from '../actions/actionTypes';

const initialState = {
    presentUser: {},
    allUsers: {},
    searchUsers: []
};

export default function userReducer(state = initialState, action) {

    switch (action.type) {
        case types.CREATE_USER:
            return {...state, presentUser: action.user};

        case types.LOG_IN_USER:
            return {...state, presentUser: action.user};

        case types.FETCH_ALL_USERS:
            return {
                ...state, allUsers: action.user
            };

        case types.SEARCH_USER:
            return {
                ...state, searchUsers: action
            };

        default:
            return state;
    }
}
