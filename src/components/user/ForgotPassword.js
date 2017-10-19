/**
 * Created by jolaadeadewale on 15/10/2017.
 */

import React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Text, Dimensions} from 'react-native';
import ForgotPasswordIndex from './forgotPassword';
import {
    StackNavigator
} from 'react-navigation';

const ForgotPassword = StackNavigator({

    PasswordTab: {
        screen: ForgotPasswordIndex
    }
},{
    headerMode: 'none'
});

export default ForgotPassword;
