import React from 'react'
import {Image, Button, Alert} from 'react-native';

class Profile extends React.Component {

    constructor(props){
        super(props);
    }

    static navigationOptions = {
        tabBarLabel: 'User',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../images/avatar.png')}
            />
        ),
    };

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.navigate('Notification')}
                title="Camera"
            />
        );
    }
}

export default Profile;