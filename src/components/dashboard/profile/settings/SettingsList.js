/**
 * Created by jolaadeadewale on 14/10/2017.
 */
import React from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
let {width, height} = Dimensions.get('window');

const Layer = ({text}) => {
    return (
        <View style={styles.panel}>
            <Text style={{alignContent: 'center' }}>{text}</Text>
        </View>
    )
};

class SettingsList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            settings: ['Comments', 'Edit Profile', 'Logout']
        }
    }

    static navigationOptions = {
        tabBarLabel: 'Profile',
        // Note: By default the icon is only shown on iOS.
        tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-person-outline" size={20} />
        ),
    };

    render (){
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.settings}
                    renderItem={({item}) =>
                    <Layer text={item} />
                 }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: (((50) / 100) * ((7 / 100) * height))
    },
    panel: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        height: ((7 / 100) * height)
    }
});

export default SettingsList;