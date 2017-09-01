/**
 * Created by jolaadeadewale on 01/09/2017.
 */
import React from 'react';
import { StackNavigator } from 'react-navigation';
import UserLikes from './UserLikes';

const UserLikesIndex = StackNavigator(
    {
        Main: {
            screen: UserLikes,
        },
    },
    {
        mode: 'modal',
        headerMode: 'none'
    }
);


class UserLikeDisplay extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id: this.props.navigation.state.params.userLikes
        };
    }

    static navigationOptions = ({ navigation }) => ({
        title: 'Kommunity',
        headerTitleStyle: {
            fontFamily: 'Noteworthy-Bold',
            fontSize: 31
        },
        headerBackTitle: 'User Profile'
    });


    render () {
        return (
            <UserLikesIndex screenProps={{id: this.state.id}} />
        )
    }
}


export default UserLikeDisplay;