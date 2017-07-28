/**
 * Created by jolaadeadewale on 23/07/2017.
 */
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducers from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

const logger  = (store) => (next) => (action) => {
    if(typeof action !== "function") {
        console.log("dispatching ... ", action);
    }
    return next(action)
};

export default function configureStore(initialState) {
    return createStore(
        rootReducers,
        initialState,
        compose(applyMiddleware(logger, thunk, reduxImmutableStateInvariant()))
    );
}