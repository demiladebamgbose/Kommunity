/**
 * Created by jolaadeadewale on 23/07/2017.
 */

import {combineReducers} from 'redux';
import user from './userReducer';
import upload from './uploadReducer';
import files from './fileReducer';

const rootReducer = combineReducers({
    user,
    upload,
    files
});

export default rootReducer;
