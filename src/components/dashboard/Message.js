/**
 * Created by jolaadeadewale on 04/08/2017.
 */
import React from 'react';
import {Image, TouchableHighlight, StyleSheet} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Message = ()=> {

    return (
        <TouchableHighlight style={styles.message}>
            <FontAwesome name="envelope-o" size={18}  />
        </TouchableHighlight>
    )
};

const styles = StyleSheet.create({

    message:{
        marginRight: 15
    }
});

export default Message;