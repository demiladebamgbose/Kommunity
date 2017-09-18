import React from 'react';
import Home from './Home';
import Search from './Search';
import Camera from './Camera';
import Activity from './Activity';
import Profile from './Profile';
import MessageIcon from './Message';
import Notification from './Notification';
import Pusher from 'pusher-js/react-native';
import {Alert, Modal} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as messageActions from '../../actions/messageActions';

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

let property = {};

class Land extends React.Component {

    constructor(props){
        super(props);
        property = this;
    }

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
        this.props.action.previousMessages(user).then( response => {
            console.log(this.props.messageScreen, 'returned from retrieving conversation');
        });

        this.props.action.getConversationList(user).then(response => {
            console.log(this.props.messageScreen, 'returned after convo list');
        })
    }

    componentDidMount(){
        var pusher = new Pusher('1dbaf5cd35a87b7793b5', {
            cluster: 'eu',
            encrypted: true
        });

        var channel = pusher.subscribe(this.props.user._id);


        channel.bind('my-event', function(data) {
            if(property.props.messageScreen.isShowing) {
                property.props.action.sendNewMessage(data).then(response => {
                    console.log('Message has returned', property.props.message);
                });
            }else{
                console.log('send to previous message as the user is not in ' +
                    'message screen');
            }


        });
    }

    render () {
        return (
            <LandingPage screenProps={{ rootNavigation: this.props.navigation }} />
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