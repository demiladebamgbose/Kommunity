/**
 * Created by jolaadeadewale on 29/07/2017.
 */

import React from 'react';
import ProfileGrid from './ProfileGrid';
import ProfileSingleView from './ProfileSingleView';
import ProfileTag from './ProfileTag'; // we want to remove this

import {
    TabNavigator,
} from 'react-navigation';

const ProfileTab = TabNavigator({

    ProfileGrid: {
        screen: ProfileGrid,
    },
    ProfileSingleVew: {
        screen: ProfileSingleView,
    }
}, {
    tabBarOptions: {
        activeTintColor: '#000000',
        showLabel: false
    },
    tabBarPosition: 'top'
});

export default ProfileTab;