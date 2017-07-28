import React from 'react';
import Home from './Home';
import Search from './Search';
import Camera from './Camera';
import Activity from './Activity';
import Profile from './Profile';

import {
    TabNavigator,
} from 'react-navigation';

const LandingPage = TabNavigator({

    HomeTab: {
        screen: Home,
    },
    Search: {
        screen: Search,
    },

    Camera: {
        screen: Camera,
    },
    Activity: {
        screen: Activity
    },
    Profile: {
        screen: Profile
    }
}, {
    tabBarOptions: {
        activeTintColor: '#000000',
    },
});

export default LandingPage;