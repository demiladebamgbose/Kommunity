import React from 'react'
import {Image, Button, Alert} from 'react-native';

class Activity extends React.Component {

    constructor(props){
        super(props);
    }

    static navigationOptions = {
        tabBarLabel: 'Activity',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../images/heart.png')}
            />
        ),
    };

    render() {
        return (
            <Button
                onPress={() => this.props.navigation.navigate('Notification')}
                title="Camera"
            />
        );
    }
}

export default Activity;
/*
import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import Camera from 'react-native-camera';

class Activity extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Camera
                    ref={(cam) => {
            this.camera = cam;
          }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}>
                    <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
                </Camera>
            </View>
        );
    }

    takePicture() {
        const options = {};
        //options.location = ...
        this.camera.capture({metadata: options})
            .then((data) => console.log(data))
            .catch(err => console.error(err));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});

export default Activity;
    */