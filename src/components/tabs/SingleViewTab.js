/**
 * Created by jolaadeadewale on 28/07/2017.
 */
import React from 'react'
import { StackNavigator } from 'react-navigation';
import SingleView from '../dashboard/helper/singleView';

const SingleViewTab = StackNavigator(
    {
        SingleView: {
            screen: SingleView,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none'
    }
);

export default SingleViewTab;