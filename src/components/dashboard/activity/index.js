
import React from 'react'
import {View, Text} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Display from './Display';

const UploadView = StackNavigator(
    {
        Main: {
            screen: Display
        }
    },
    {
        mode: 'modal',
        headerMode: 'none'
    }
);

export default UploadView;