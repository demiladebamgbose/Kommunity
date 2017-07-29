/**
 * Created by jolaadeadewale on 29/07/2017.
 */

import React from 'react';
import {View, Text, Image} from 'react-native';

class ProfileTag extends React.Component {

    constructor(props){
        super(props);
    }

    static navigationOptions = {
        tabBarLabel: 'Home',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../../images/home.png')}
            />
        ),
    };

    render () {
        return (
            <View>
                <Text>Profile Tag</Text>
            </View>
        )
    }
}

export default ProfileTag;