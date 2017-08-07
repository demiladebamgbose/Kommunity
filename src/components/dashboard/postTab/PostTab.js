/**
 * Created by jolaadeadewale on 04/08/2017.
 */
import React from 'react';
import AllPost from './Allpost';
import PrivatePost from './PrivatePost';

import {
    TabNavigator,
} from 'react-navigation';



const PostTab = TabNavigator({

    Public: {
        screen: AllPost ,
    },
    Private: {
        screen: PrivatePost,
    }
}, {
    tabBarOptions: {
        activeTintColor: '#000000',
        showLabel: true
    },
    tabBarPosition: 'top'
});



export default PostTab;