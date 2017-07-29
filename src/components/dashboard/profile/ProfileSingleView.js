/**
 * Created by jolaadeadewale on 29/07/2017.
 */

import React from 'react';
import {View, Text, Image} from 'react-native';

class ProfileSingleView extends React.Component {

    constructor(props){
        super(props);
    }

    static navigationOptions = {
        tabBarLabel: '',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../../images/lines.png')}
            />
        ),
    };

    render () {
        return (
            <View>
                <Text>Profile Single View</Text>
            </View>
        )
    }
}

export default ProfileSingleView;