import React from 'react'
import {Image, Button, Alert, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ProfileTab from './profile/ProfileTab';

class Profile extends React.Component {

    constructor(props){
        super(props);
    }

    static navigationOptions = {
        tabBarLabel: 'Profile',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../images/avatar.png')}
            />
        ),
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={[styles.topProfile, styles.imageTop]}>
                        <View style={{height: 70}}>

                        </View>
                        <View style={{width: 70, height: 70,  margin: 1, padding: 10}} >
                            <Image style={{width: 40, height: 40}}
                                   source={{ uri: 'https://res.cloudinary.com/dd58mfinr/image/upload/c_scale,r_30,w_50/v1481734664/default.png'} }
                            />
                        </View>
                        <View >
                            <View style={styles.containerBox}>
                                <View>
                                    <Text>14</Text>
                                    <Text>posts</Text>
                                </View>
                                <View>
                                    <Text>614</Text>
                                    <Text>followers</Text>
                                </View>
                                <View>
                                    <Text>458</Text>
                                    <Text>following</Text>
                                </View>


                            </View>
                            <View style={styles.containerBox}>
                                <TouchableOpacity
                                    style={{borderRadius: 5, height: 25, width: 90,  backgroundColor: 'white',  borderColor: 'grey'}}
                                >
                                    <Text>Edit Profile</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{borderRadius: 5, height: 25, width: 35 , backgroundColor: 'white',   borderColor: 'grey'}}
                                >
                                    <Text>
                                        <Image style={{width: 20, height: 20}} source={require('../../images/settings.png')} />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </View>
                <View>
                    <Text>Jols</Text>
                </View>

                <View style={styles.container}>
                    <ProfileTab/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        marginTop: 15,
        height: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    containerBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap'
    },

    topProfile:{
        flex: 1,
        flexDirection: 'row'
    },
    imageTop: {
       marginTop: 20
    }
});

export default Profile;