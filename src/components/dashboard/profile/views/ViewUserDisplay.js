import React from 'react';
import { StackNavigator } from 'react-navigation';
import Followers from './Followers';

const ViewDisplay = StackNavigator(
    {
        Followers: {
            screen: Followers
        }
    },
    {
        mode: 'modal',
        headerMode: 'none'
    }
);

class ViewUserDisplay extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.navigation.state.params.id,
            type: this.props.navigation.state.params.type,
            nav:  this.props.navigation.state.params.nav
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

    componentDidMount(){
    }

    render () {
        return (
            <ViewDisplay screenProps={{id: this.state.id, type: this.state.type,
                rootNavigation: this.props.navigation,
                parent: this.props.screenProps, nav: this.state.nav}}
            />
        )
    }
}

export default ViewUserDisplay;
