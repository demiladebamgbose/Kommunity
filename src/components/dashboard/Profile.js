import React from 'react'
import {Image, Button, Alert, View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import ProfileTab from './profile/ProfileTab';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
let {height, width} = Dimensions.get('window');

class Profile extends React.Component {

    constructor(props){
        super(props);
        let id = '';
        let rootNav = '';
        if(this.props.navigation.state.params) {
             id = this.props.navigation.state.params.user;
             rootNav = this.props.navigation.state.params.navigation
        }
        this.state = {
            user: id,
            rootNav: rootNav
        }
    }

    static navigationOptions = {
        tabBarLabel: 'Profile',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-person-outline" size={20} />
        ),
    };

    _onProfileClick = () => {

    };

    render() {
        return (

            <View style={styles.container}>
                <View style={styles.topProfile}>
                    <View style={{width: ((25 / 100) * width)}}>
                        <Circle url="https://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png"
                                label="jols"
                                click={this._onProfileClick}
                        />
                    </View>
                    <View style={{flex: 0, flexDirection: 'column',  marginLeft: 5, marginRight: 5,
                        marginTop:8}}
                    >
                        <View style={{flex: 1, flexDirection: 'row',
                                alignContent: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 4, marginTop: 4
                               }}
                        >
                                <View style={{width: ((20 / 100) * width)}}>
                                    <Text style={{textAlign: 'center', fontSize: 10}}>14</Text>
                                    <Text style={{textAlign: 'center', fontSize: 11}}>Post</Text>
                                </View>
                                <View style={{width: ((30 / 100) * width)}}>
                                    <Text style={{textAlign: 'center', fontSize: 10}}>14</Text>
                                    <Text style={{textAlign: 'center',  fontSize: 11}}>followers</Text>
                                </View>
                                <View style={{width: ((20 / 100) * width)}}>
                                    <Text style={{textAlign: 'center', fontSize: 10}}>14</Text>
                                    <Text style={{textAlign: 'center',  fontSize: 11}}>Kin</Text>
                                </View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row',
                                alignContent: 'center',
                                justifyContent: 'space-between', marginTop: 4, marginBottom: 4}}
                        >
                            <View style={{width: ((50 / 100) * width)}}>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={{fontSize: 11, textAlign: 'center'}}>
                                        Edit Profile
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{width: ((20 / 100) * width), marginLeft: 2}}>
                                <TouchableOpacity style={styles.button2}>
                                    <Ionicons style={{textAlign: 'center'}} name="ios-settings-outline" size={11} />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>
                <View style={styles.container}>
                    <ProfileTab screenProps={{ rootNavigation:  this.props.screenProps.rootNavigation,
                    userId: this.state.user , nav: this.state.rootNav }} />
                </View>
            </View>
        );
    }
}

const Circle = ({label, url, click}) => {
    return (
        <View style={styles.center}>
            <TouchableOpacity onPress={() => click(label)}>
                <View style={styles.circle}>
                    <Image  style={{width: 50, height: 50, borderRadius: 50/2,}}
                            source={{ uri: url} } />
                </View>
            </TouchableOpacity>
            <Text style={styles.text}>{label}</Text>
        </View>
     )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    userProfile: {
        flex: 1,
        flexDirection: 'row'
    },
    topProfile: {
        flex: 0,
        flexDirection: 'row',
        marginLeft: 5,
        marginRight: 5,
        marginTop:8,
        height: (height/ 8)
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 50/2,
        marginRight: 6
    },
    center: {

    },
    text: {
        marginTop: 2,
        fontSize: 8,
    },
    button2: {
        width: (((10 / 100) * width)),
        marginTop: 2,
        paddingTop: 4,
        paddingBottom: 4,
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: '#D3D3D3',
        borderWidth: 1,
        borderStyle: 'solid',
        alignContent: 'center'
    },
    button: {
        marginTop: 2,
        paddingTop: 3,
        paddingBottom: 3,
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: '#D3D3D3',
        borderWidth: 1,
        borderStyle: 'solid',
    },
});

export default Profile;