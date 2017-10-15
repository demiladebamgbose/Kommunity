/**
 * Created by jolaadeadewale on 14/10/2017.
 */
import React from 'react';
import Settings from './SettingsList';
import Profile from '../../Profile';
import {Text} from 'react-native';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';

import {
    StackNavigator,
} from 'react-navigation';

const Back = () => {
    return (
        <Text>Back</Text>
    )
};

class Set extends React.Component {
    constructor(props){
        super(props);
    }

    static navigationOptions = {
        tabBarLabel: 'Profile',
        // Note: By default the icon is only shown on iOS
        tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-person-outline" size={20} />
        ),
        headerLeft: (
            <Back/>
        ),
    };

    render () {
        return (
            <Setting screenProps={{ rootNavigation: this.props.screenProps.rootNavigation }}  />
        )
    }
}

const Setting = StackNavigator(
    {
        Main: {screen: Profile},
        Settings: { screen: Settings }
    },
    {
        headerMode: 'none'
    }
);

export default Set;