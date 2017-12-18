/**
 * Created by jolaadeadewale on 04/08/2017.
 */
import React from 'react';
import {FlatList, View} from 'react-native';

import Grid from '../helper/grid';

class PrivatePost extends React.Component {

    constructor(props){
        super(props);
    }

    static navigationOptions = {
        tabBarLabel: 'Private Post',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.

    };

    _keyExtractor = (item, index) => index;

    render() {
        return (
            <View style={{flex: 1}}>
            <FlatList
                data={this.props.screenProps.privateData}
                keyExtractor={this._keyExtractor}
                renderItem={({item}) => <Grid obj={item}
                click={this.props.screenProps.click} width={this.props.screenProps.width} />}
            />
            </View>
        )
    }
}

export default PrivatePost;