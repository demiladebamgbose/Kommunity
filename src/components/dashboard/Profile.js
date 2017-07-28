import React from 'react'
import {Image, Button, Alert, View, Text, StyleSheet} from 'react-native';

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
                        <View style={{width: 100, height: 100, backgroundColor: 'white',  margin: 1}} >
                            <Image style={{width: 99, height: 99}}
                                   source={{ uri: 'https://res.cloudinary.com/dd58mfinr/image/upload/c_scale,r_30,w_50/v1481734664/default.png'} }
                            />
                        </View>
                        <View>
                            <View style={styles.content}>
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
                            <View style={styles.content}>

                            </View>
                        </View>
                    </View>
                    <View>
                        <Text>Jols</Text>
                    </View>
                </View>

                <View></View>
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

    topProfile:{
        flex: 1,
        flexDirection: 'row'
    },
    imageTop: {
        padding: 40
    }
});

export default Profile;