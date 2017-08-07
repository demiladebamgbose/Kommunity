/**
 * Created by jolaadeadewale on 04/08/2017.
 */
import React from 'react';
import {Image, TouchableHighlight, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Notification = ()=> {

    return (
        <TouchableHighlight style={styles.message}>
            <Ionicons name="ios-notifications-outline" size={23}  />
        </TouchableHighlight>
    )
};

const styles = StyleSheet.create({

    message:{
        marginLeft: 15
    }
});

export default Notification;