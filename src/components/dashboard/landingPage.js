import React from 'react';
import Home from './Home';
import Search from './Search';
import Camera from './Camera';
import Activity from './Activity';
import Profile from './profile/settings';
import MessageIcon from './Message';
import Notification from './Notification';
import Pusher from 'pusher-js/react-native';
import {Alert, Modal, AppState, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as messageActions from '../../actions/messageActions';
import { Permissions, Notifications, Constants } from 'expo';
const PUSH_ENDPOINT = `${Constants.manifest.infoPlist.url}api/v1/push-token`;
import {MessageBar, MessageBarManager} from 'react-native-message-bar';
const soundObject = new Expo.Audio.Sound();

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
        activeTintColor: '#000000'
    },
});


let property = {};


class Land extends React.Component {

    state = {
        appState: AppState.currentState
    };

    constructor(props){
        super(props);
        property = this;
    }

    registerForPushNotificationsAsync = async () => {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS

        let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);

        // Stop here if the user did not grant permissions
        if (status !== 'granted') {
            return;
        }

        // Get the token that uniquely identifies this device
        let token = await Notifications.getExpoPushTokenAsync();

        // POST the token to our backend so we can use it to send pushes from there
        return fetch(PUSH_ENDPOINT, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: {
                    value: token,
                },
                _id: this.props.user._id
            }),
        });
    };

    static navigationOptions = ({ navigation }) => ({
        title: 'Kommunity',
        headerTitleStyle: {
            fontFamily: 'Noteworthy-Bold',
            fontSize: 31
        },
        headerRight: (
            <MessageIcon screenProps={{ rootNavigation: navigation, parent: property }} />
        ),
        headerLeft: (
            <Notification/>
        ),
    });




    componentWillMount() {
        let user = this.props.user;
       /* registerForPushNotification(user.username).then(data => {
            Alert.alert('a', data)
        }); */
        this.registerForPushNotificationsAsync();


        this._notificationSubscription = Notifications.addListener(this._handleNotification);


        console.log('sent push notifction')
        this.props.action.previousMessages(user).then( response => {
            console.log(this.props.messageScreen, 'returned from retrieving conversation');
        });

        this.props.action.getConversationList(user).then(response => {
            console.log(this.props.messageScreen, 'returned after convo list');
        });

    }


    _handleNotification = async (notification) => {

        if(this.state.appState === 'active') {
            try {
                await soundObject.loadAsync(require('../../sounds/notification.mp3'));
                await soundObject.playAsync();

                // Your sound is playing
            } catch (error) {
                console.log(error)

            }


            MessageBarManager.showAlert({
                title: notification.data.title,
                titleStyle: { color: 'black', fontSize: 11, fontWeight: 'bold' },
                message: notification.data.message,
                alertType: 'info',
                animationType: 'SlideFromLeft',
                stylesheetInfo : { backgroundColor : '#ADD8E6',
                    strokeColor : '#ADD8E6',
                     color: 'black',
                    fontSize: 8,
                    borderRadius: 15,
                    viewTopInset : 8, // Default is 0
                    viewLeftInset : 6, // Default is 0
                    viewRightInset : 6,

                },
                messageStyle: { color: 'black', fontSize: 10 },
                duration: 5000
                // See Properties section for full customization
                // Or check `index.ios.js` or `index.android.js` for a complete example
            });
        }
    };

    componentDidMount(){
        var pusher = new Pusher('1dbaf5cd35a87b7793b5', {
            cluster: 'eu',
            encrypted: true
        });

        AppState.addEventListener('change', this._handleAppStateChange);

        MessageBarManager.registerMessageBar(this.refs.alert);

        var channel = pusher.subscribe(this.props.user._id);


        channel.bind('my-event', function(data) {
            console.log('Data that entered first is ', data);
            if(property.props.messageScreen.isShowing
                    && (property.props.messageScreen.currentUser
                    ==  data.message.userId)) {

                let id= data.message.userId;
                property.props.action.sendNewMessage(data).then(response => {
                    console.log('Message has returned', property.props.message);
                });
            }else{
                console.log('send to previous message as the user is not in ' +
                    'message screen');
            }


        });
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!')
        }
        this.setState({appState: nextAppState});
    };

    componentWillUnmount() {
        // Remove the alert located on this master page from the manager
        AppState.removeEventListener('change', this._handleAppStateChange);

        MessageBarManager.unregisterMessageBar();
    }

    render () {
        return (
            <View style={{flex: 1}}>
            <LandingPage screenProps={{ rootNavigation: this.props.navigation }} />
                <MessageBar  ref="alert" />
            </View>

        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.user.presentUser,
        message: state.messages.newMessage,
        messageScreen: state.messages
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(messageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Land);