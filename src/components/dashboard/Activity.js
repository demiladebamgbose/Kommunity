import React from 'react'
import {Image, Button, Alert, View, Text, FlatList, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {connect} from 'react-redux';
import _ from 'lodash'
import {bindActionCreators} from 'redux';
import * as eventActions from '../../actions/eventActions';
import Grid from './helper/grid';

let {height, width} = Dimensions.get('window');
let pictureSize = ((33 / 100) * width)

class Activity extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            events: []
        }
    }

    static navigationOptions = {
        tabBarLabel: 'Activity',
         /// Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-eye-outline" size={20} />
        ),
    };

    componentWillMount() {
        this.props.action.getEvents().then( response => {
           let  gridImages = _.chunk(this.props.event, 3);
           this.setState({events: gridImages});
        })
    }

    _onChangeView = () => {

    };

    render() {
        return (
            <View style={{flex: 1, paddingTop: 5}}>
                <FlatList
                    data={this.state.events}
                    renderItem={({item}) =>
                 <Grid obj={item}
                    click={this._onChangeView}
                    width={pictureSize}
                    />
                 }
                />
            </View>
        );
    }

    componentDidMount () {

    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.user.presentUser,
        event: state.events.events
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(eventActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
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
