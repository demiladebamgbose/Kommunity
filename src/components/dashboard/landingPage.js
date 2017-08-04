import React from 'react';
import Home from './Home';
import Search from './Search';
import Camera from './Camera';
import Activity from './Activity';
import Profile from './Profile';
import MessageIcon from './Message';
import Notification from './Notification';

import {
    TabNavigator,
} from 'react-navigation';

import {TouchableHighlight} from 'react-native';



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

class Land extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Kommunity',
        headerTitleStyle: {
            fontFamily: 'Noteworthy-Bold',
            fontSize: 31
        },
        headerRight: (
            <MessageIcon/>
        ),
        headerLeft: (
            <Notification/>
        ),
    });

    render () {
        return (
            <LandingPage/>
        )
    }
}

export default Land;