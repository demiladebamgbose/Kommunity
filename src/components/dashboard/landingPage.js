import React from 'react';
import Home from './Home';
import Search from './Search';
import Camera from './Camera';
import Activity from './Activity';
import Profile from './Profile';
import MessageIcon from './Message';
import Notification from './Notification';
import Pusher from 'pusher-js/react-native';
import {Alert} from 'react-native';

Pusher.logToConsole = true;

import {
    TabNavigator
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

    componentDidMount(){
        var pusher = new Pusher('1dbaf5cd35a87b7793b5', {
            cluster: 'eu',
            encrypted: true
        });

        var channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function(data) {
            Alert.alert(
                data.message
        )});
    }

    render () {
        return (
            <LandingPage screenProps={{ rootNavigation: this.props.navigation }} />
        )
    }
}

export default Land;