/**
 * Created by jolaadeadewale on 23/07/2017.
 */
import * as types from '../actions/actionTypes';

const initialState = {
    user: {},
    allUsers: {},
    searchUsers: []
};

export default function userReducer(state = initialState, action) {

    console.log(action);
    switch (action.type) {
        case types.CREATE_USER:
            return action.user;

        case types.LOG_IN_USER:
            return action.user;

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
