/**
 * Created by jolaadeadewale on 04/08/2017.
 */
import React from 'react';
import {Image, TouchableHighlight} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Message = ()=> {

    return (
        <TouchableHighlight>
            <Ionicons name="envelope" size={25}  />
        </TouchableHighlight>
    )
};

export default Message;