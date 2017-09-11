/**
 * Created by jolaadeadewale on 10/09/2017.
 */
import * as types from '../actions/actionTypes';

const initialState = {
    pendingMessages: {},
    previousMessages: [],
    currentMessage : {},
    userPreviousMessage: [],
    newMessage: {},
    isShowing: false
};

export default function messageReducer(state = initialState, action) {
    switch (action.type){
        case types.NEW_USER_MESSAGE:
            return {
                ...state, newMessage: action.data
            };

        default:
            return state;
    }
}