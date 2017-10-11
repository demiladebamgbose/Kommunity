import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker,Camera, Permissions } from 'expo';
import {connect} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';
import {bindActionCreators} from 'redux';
import * as uploadActions from '../../actions/uploadActions';

class CameraView extends React.Component {

    state = {
        image: null,
        hasCameraPermission: null,
        type: Camera.Constants.Type.back
    };

    static navigationOptions = {
        tabBarLabel: 'Upload',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-camera-outline" size={20}  />
        ),
    };

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    render() {
        let { image } = this.state;

        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }} type={this.state.type}>
                        <View
                            style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
                            <TouchableOpacity
                                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                                <Text
                                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                                    {' '}Flip{' '}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Button
                                title="Pick an image from camera roll"
                                onPress={this._pickImage}
                            />

                            <Button
                                title="Take a picture"
                                onPress={this._cameraRoll}
                            />

                            <Button
                                title="Take a video"
                                onPress={this._videoRoll}
                            />


                        </View>
                    </Camera>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Button
                            title="Pick an image from camera roll"
                            onPress={this._pickImage}
                        />

                        <Button
                            title="Take a picture"
                            onPress={this._cameraRoll}
                        />

                        <Button
                            title="Take a video"
                            onPress={this._videoRoll}
                        />


                    </View>
                </View>
            );
        }
    }




    _videoRoll = async () => {

    };

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });



        if (!result.cancelled) {
            this.props.action.uploadCameraImage(result).then(response => {
                this.props.screenProps.rootNavigation.navigate('UploadView');
            }).catch(err => {
                console.log(err);
            });
        }
    };

    _cameraRoll = async () => {
        let result = await ImagePicker.launchCameraAsync({  allowsEditing: true,
            aspect: [4, 3]});

        if (!result.cancelled) {
            this.props.action.uploadCameraImage(result).then(response => {
                this.props.screenProps.rootNavigation.navigate('UploadView');
            }).catch(err => {
                console.log(err);
            });
        }
    }
}



function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(uploadActions, dispatch)
    }
}

function mapStateToProps(state, ownProps) {
    return {
        image: state.upload
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraView);



/*
 import React from 'react'
 import {Image, Button, Alert, StyleSheet, View, Text} from 'react-native';
 import CameraRollPicker from 'react-native-camera-roll-picker';
 import {connect} from 'react-redux';
 import {bindActionCreators} from 'redux';
 import * as uploadActions from '../../actions/uploadActions';

 class Camera extends React.Component {

 constructor(props){
 super(props);
 this.state = {
 'photos': {},
 num: 0,
 selected: [],
 };


 this._onCamera = this._onCamera.bind(this);
 }



 getSelectedImages =(images, current) => {
 let num = images.length;

 this.setState({
 num: num,
 selected: images,
 });

 this.props.action.uploadCameraImage(current).then(response => {
 const { navigate } = this.props.navigation;

 console.log(this.props.navigation);
 console.log(navigate);
 this.props.screenProps.rootNavigation.navigate('UploadView');

 // navigate('UploadView', { image: '' });
 // this.props.navigation.goBack();
 //  setTimeout(this.props.navigation.navigate.bind(null, 'UploadView'), 500);

 console.log('changed route')
 }).catch(err=> {
 console.log(err);
 });

 };

 static navigationOptions = {
 tabBarLabel: 'Upload',
 // Note: By default the icon is only shown on iOS. Search the showIcon option below.
 tabBarIcon: ({ tintColor }) => (
 <Image
 source={require('../../images/plus.png')}
 />
 ),
 };

 _onCamera() {

 }


 render() {

 return (

 <View style={styles.container}>
 <View style={styles.content}>
 <Text style={styles.text}>
 <Text style={styles.bold}> {this.state.num} </Text> images has been selected
 </Text>
 </View>
 <CameraRollPicker
 scrollRenderAheadDistance={500}
 initialListSize={1}
 pageSize={3}
 removeClippedSubviews={false}
 groupTypes='All'
 batchSize={5}
 maximum={1}
 selected={this.state.selected}
 assetType='All'
 imagesPerRow={3}
 imageMargin={5}
 callback={this.getSelectedImages} />
 </View>


 );
 }

 componentDidMount () {
 this._onCamera();
 }
 }

 const styles = StyleSheet.create({
 container: {
 flex: 1,
 backgroundColor: '#F6AE2D',
 },
 content: {
 marginTop: 15,
 height: 50,
 flexDirection: 'row',
 justifyContent: 'center',
 alignItems: 'center',
 flexWrap: 'wrap',
 },
 text: {
 fontSize: 16,
 alignItems: 'center',
 color: '#fff',
 },
 bold: {
 fontWeight: 'bold',
 },
 info: {
 fontSize: 12,
 },
 });

 function mapDispatchToProps(dispatch) {
 return {
 action: bindActionCreators(uploadActions, dispatch)
 }
 }

 function mapStateToProps(state, ownProps) {
 return {
 image: state.upload
 }
 }

 export default connect(mapStateToProps, mapDispatchToProps)(Camera);

 */