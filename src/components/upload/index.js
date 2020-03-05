import React from 'react'
import { StackNavigator } from 'react-navigation';
import Upload from './Upload';
import CategoryUpload from './CategoryUpload';

const UploadView = StackNavigator(
    {
        Main: {
            screen: Upload,
        },
        Category: {
            screen: CategoryUpload
        }
    },
    {
        mode: 'modal',
        headerMode: 'none'
    }
);

export default UploadView;