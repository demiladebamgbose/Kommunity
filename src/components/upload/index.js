import React from 'react'
import { StackNavigator } from 'react-navigation';
import Upload from './Upload';

const UploadView = StackNavigator(
    {
        Main: {
            screen: Upload,
        }
    },
    {
        mode: 'modal',
    }
);

export default UploadView;