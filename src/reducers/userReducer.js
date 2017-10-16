/**
 * Created by jolaadeadewale on 23/07/2017.
 */
import * as types from '../actions/actionTypes';

const initialState = {
    presentUser: {},
    allUsers: {},
    searchUsers: [],
    likedFiles: [],
    userProfile: {},
    messageStatus: '',
    passwordMessage: ''
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

        case types.LIKE_USER_FILE:
            return {
                ...state, likedFiles: action.data
            };

        case types.UNLIKE_USER_FILE:
            return {
                ...state, likedFiles: action.data
            };

        case types.PREVIOUSLY_LIKED_FILE:
            return {
                ...state, likedFiles: action.data
            };

        case types.USER_FOLLOW:
            return {
                ...state, presentUser: action.user
            };

        case types.UNFOLLOW_USER:
            return {
                ...state, presentUser: action.user
            };

        case types.FIND_ONE_SEARCH:
            return {
                ...state, userProfile: action.user
            };

        case types.SEND_MESSAGE_USER:
            return {
                ...state, messageStatus: action.data
            };

        case types.RESET_PASSWORD:
            return {
                ...state, passwordMessage: action.data
            };

        case types.EDIT_USER:
            return {
                ...state, presentUser: action.data
            };

        default:
            return state;
    }
}
