import React from 'react';
import {Image, StyleSheet, Button, Dimensions, Text, View} from 'react-native'
import {DrawerNavigator} from 'react-navigation';
import Dashboard from '../landingPage';
import Adverts from '../adverts';
let {height, width} = Dimensions.get('window');


const Drawer = DrawerNavigator({
  Landing: {screen: Dashboard}
}, {
    drawerWidth: (80/ 100) * width,
    drawerPosition: 'right',
    contentComponent: props => <CustomDrawerContentComponent/>,
    drawerBackgroundColor: 'transparent',
    header: null
});


class CustomDrawerContentComponent extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Kommunity',
        headerTitleStyle: {
            fontFamily: 'Noteworthy-Bold',
            fontSize: 31
        },
        header: null
    });

    render() {
        return(
            <View style={styles.container}>
                <Adverts/>
            </View>
        )
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Drawer;
