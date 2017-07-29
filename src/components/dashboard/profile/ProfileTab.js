/**
 * Created by jolaadeadewale on 29/07/2017.
 */

import React from 'react';
import ProfileGrid from './ProfileGrid';
import ProfileSingleView from './ProfileSingleView';
import ProfileTag from './ProfileTag';

import {
    TabNavigator,
} from 'react-navigation';

const ProfileTab = TabNavigator({

    ProfileGrid: {
        screen: ProfileGrid,
    },
    ProfileSingleVew: {
        screen: ProfileSingleView,
    },

    ProfileTag: {
        screen: ProfileTag,
    }
}, {
    tabBarOptions: {
        activeTintColor: '#000000',
    },
    tabBarPosition: 'top'
});

export default ProfileTab;