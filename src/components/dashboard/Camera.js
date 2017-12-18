/*
import {
    Camera,
    Video,
    FileSystem,
    Permissions,
} from 'expo';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Slider,
    Image,
    Picker,
    Button,
    ScrollView,
    Vibration,
} from 'react-native';

import GalleryScreen from './helper/GalleryScreen';

const flashModeOrder = {
    off: 'on',
    on: 'auto',
    auto: 'torch',
    torch: 'off',
};

const wbOrder = {
    auto: 'sunny',
    sunny: 'cloudy',
    cloudy: 'shadow',
    shadow: 'fluorescent',
    fluorescent: 'incandescent',
    incandescent: 'auto',
};

 class CameraScreen extends React.Component {

    state = {
        flash: 'off',
        zoom: 0,
        autoFocus: 'on',
        depth: 0,
        type: 'back',
        whiteBalance: 'auto',
        ratio: '16:9',
        ratios: [],
        photoId: 1,
        showGallery: false,
        photos: [],
    };

    componentDidMount() {
        FileSystem.makeDirectoryAsync(
            FileSystem.documentDirectory + 'photos'
        ).catch(e => {
            console.log(e, 'Directory exists');
        });
    }

    getRatios = async function() {
        const ratios = await this.camera.getSupportedRatios();
        return ratios;
    };

    toggleView() {
        this.setState({
            showGallery: !this.state.showGallery,
        });
    }

    toggleFacing() {
        this.setState({
            type: this.state.type === 'back' ? 'front' : 'back',
        });
    }

    toggleFlash() {
        this.setState({
            flash: flashModeOrder[this.state.flash],
        });
    }

    setRatio(ratio) {
        this.setState({
            ratio,
        });
    }

    toggleWB() {
        this.setState({
            whiteBalance: wbOrder[this.state.whiteBalance],
        });
    }

    toggleFocus() {
        this.setState({
            autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
        });
    }

    zoomOut() {
        this.setState({
            zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
        });
    }

    zoomIn() {
        this.setState({
            zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
        });
    }

    setFocusDepth(depth) {
        this.setState({
            depth,
        });
    }

    takePicture = async function() {
        if (this.camera) {
            this.camera.takePicture().then(data => {
                FileSystem.moveAsync({
                    from: data,
                    to: `${FileSystem.documentDirectory}photos/Photo_${this.state
                        .photoId}.jpg`,
                }).then(() => {
                    this.setState({
                        photoId: this.state.photoId + 1,
                    });
                    Vibration.vibrate();
                });
            });
        }
    };

    renderGallery() {
        return <GalleryScreen onPress={this.toggleView.bind(this)} />;
    }

    renderCamera() {
        return (
            <Camera
                ref={ref => {
          this.camera = ref;
        }}
                style={{
          flex: 1,
        }}
                type={this.state.type}
                flashMode={this.state.flash}
                autoFocus={this.state.autoFocus}
                zoom={this.state.zoom}
                whiteBalance={this.state.whiteBalance}
                ratio={this.state.ratio}
                focusDepth={this.state.depth}>
                <View
                    style={{
            flex: 0.5,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
                    <TouchableOpacity
                        style={styles.flipButton}
                        onPress={this.toggleFacing.bind(this)}>
                        <Text style={styles.flipText}> FLIP </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.flipButton}
                        onPress={this.toggleFlash.bind(this)}>
                        <Text style={styles.flipText}>
                            {' '}FLASH: {this.state.flash}{' '}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.flipButton}
                        onPress={this.toggleWB.bind(this)}>
                        <Text style={styles.flipText}>
                            {' '}WB: {this.state.whiteBalance}{' '}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
            flex: 0.4,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}>
                    <Slider
                        style={{ width: 150, marginTop: 15, alignSelf: 'flex-end' }}
                        onValueChange={this.setFocusDepth.bind(this)}
                        value={this.state.depth}
                        step={0.1}
                        disabled={this.state.autoFocus === 'on'}
                    />
                </View>
                <View
                    style={{
            flex: 0.1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}>
                    <TouchableOpacity
                        style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
                        onPress={this.zoomIn.bind(this)}>
                        <Text style={styles.flipText}> + </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
                        onPress={this.zoomOut.bind(this)}>
                        <Text style={styles.flipText}> - </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
                        onPress={this.toggleFocus.bind(this)}>
                        <Text style={styles.flipText}>
                            {' '}AF : {this.state.autoFocus}{' '}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
              styles.flipButton,
              styles.picButton,
              { flex: 0.3, alignSelf: 'flex-end' },
            ]}
                        onPress={this.takePicture.bind(this)}>
                        <Text style={styles.flipText}> SNAP </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
              styles.flipButton,
              styles.galleryButton,
              { flex: 0.25, alignSelf: 'flex-end' },
            ]}
                        onPress={this.toggleView.bind(this)}>
                        <Text style={styles.flipText}> Gallery </Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.showGallery ? this.renderGallery() : this.renderCamera()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'ivory',
    },
    navigation: {
        flex: 1,
    },
    gallery: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    flipButton: {
        flex: 0.3,
        height: 40,
        marginHorizontal: 2,
        marginBottom: 10,
        marginTop: 20,
        borderRadius: 8,
        borderColor: 'white',
        borderWidth: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flipText: {
        color: 'white',
        fontSize: 15,
    },
    item: {
        margin: 4,
        backgroundColor: 'indianred',
        height: 35,
        width: 80,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    picButton: {
        backgroundColor: 'darkseagreen',
    },
    galleryButton: {
        backgroundColor: 'indianred',
    },
    row: {
        flexDirection: 'row',
    },
});

 export default CameraScreen;
 */


import React from 'react';
import { Button,
    Image,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,Slider,
    Picker,
    ScrollView,
    Vibration, } from 'react-native';
import { ImagePicker,
    Camera,
    Permissions,
    Video,
    FileSystem,
    } from 'expo';
import { SimpleLineIcons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import {connect} from 'react-redux';
import {Ionicons} from '@expo/vector-icons';
import {bindActionCreators} from 'redux';
import * as uploadActions from '../../actions/uploadActions';
import GalleryScreen from './helper/GalleryScreen';

const flashModeOrder = {
    off: 'on',
    on: 'auto',
    auto: 'torch',
    torch: 'off',
};

const wbOrder = {
    auto: 'sunny',
    sunny: 'cloudy',
    cloudy: 'shadow',
    shadow: 'fluorescent',
    fluorescent: 'incandescent',
    incandescent: 'auto',
};

class CameraView extends React.Component {


    state = {
        hasCameraPermission: null,
        flash: 'off',
        zoom: 0,
        autoFocus: 'on',
        depth: 0,
        type: 'back',
        whiteBalance: 'auto',
        ratio: '16:9',
        ratios: [],
        photoId: 1,
        showGallery: false,
        photos: [],
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
                <View style={styles.container}>
                    {this.state.showGallery ? this.renderGallery() : this.renderCamera()}
                </View>
            );
        }
    }
    getRatios = async function() {
        const ratios = await this.camera.getSupportedRatios();
        return ratios;
    };

    toggleView() {
        this.setState({
            showGallery: !this.state.showGallery,
        });
    }

    toggleFacing() {
        this.setState({
            type: this.state.type === 'back' ? 'front' : 'back',
        });
    }

    toggleFlash() {
        this.setState({
            flash: flashModeOrder[this.state.flash],
        });
    }

    setRatio(ratio) {
        this.setState({
            ratio,
        });
    }

    toggleWB() {
        this.setState({
            whiteBalance: wbOrder[this.state.whiteBalance],
        });
    }

    toggleFocus() {
        this.setState({
            autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
        });
    }

    zoomOut() {
        this.setState({
            zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
        });
    }

    zoomIn() {
        this.setState({
            zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
        });
    }

    setFocusDepth(depth) {
        this.setState({
            depth,
        });
    }
    componentDidMount() {
        FileSystem.makeDirectoryAsync(
            FileSystem.documentDirectory + 'photos'
        ).catch(e => {
            console.log(e, 'Directory exists');
        });
    }

    takePicture = async function() {
        if (this.camera) {
            this.camera.takePictureAsync().then(data => {
                /*FileSystem.moveAsync({
                    from: data,
                    to: `${FileSystem.documentDirectory}photos/Photo_${this.state
                        .photoId}.jpg`,
                }).then(() => {
                    this.setState({
                        photoId: this.state.photoId + 1,
                    });
                    Vibration.vibrate();
                }); */

                console.log(data)
                Vibration.vibrate();
            });
        }
    };

    renderGallery() {
        return <GalleryScreen onPress={this.toggleView.bind(this)} />;
    }

    renderCamera() {
        return (
            <Camera
                ref={ref => {
          this.camera = ref;
        }}
                style={{
          flex: 1,
        }}
                type={this.state.type}
                flashMode={this.state.flash}
                autoFocus={this.state.autoFocus}
                zoom={this.state.zoom}
                whiteBalance={this.state.whiteBalance}
                ratio={this.state.ratio}
                focusDepth={this.state.depth}>
                <View
                    style={{
            flex: 0.5,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
                justifyContent: 'space-between',
                marginRight: 10
          }}>
                    <TouchableOpacity
                        style={styles.flash}
                        onPress={this.toggleFacing.bind(this)}>
                        <Ionicons
                            name="ios-reverse-camera-outline"
                            size={40}
                            color="white"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.flash}
                        onPress={this.toggleFlash.bind(this)}>
                        <Ionicons
                            name="ios-flash-outline"
                            size={40}
                            color="white"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.flash}
                        onPress={this.toggleWB.bind(this)}>
                        <Text style={styles.flipText}>
                            <Ionicons
                                name="ios-color-filter-outline"
                                size={40}
                                color="white"
                            />

                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
            flex: 0.4,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}>

                </View>
                <View
                    style={{
                marginTop: 30,
                flex: 0.2,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                alignSelf: 'flex-end',
                justifyContent: 'space-between',
                marginRight: 10

          }}>

                    <TouchableOpacity
                        style={styles.flash}
                        onPress={this.toggleFacing.bind(this)}>
                        <MaterialIcons
                            name="photo-library"
                            color="white"
                            size={40}
                        />
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.flash}
                        onPress={this.toggleFacing.bind(this)}>
                        <MaterialCommunityIcons
                            name="camera-iris"
                            color="white"
                            size={40}
                        />
                    </TouchableOpacity>


                    <TouchableOpacity
                        style={styles.flash}
                        onPress={this.toggleFacing.bind(this)}>
                        <Ionicons
                            name="ios-videocam-outline"
                            color="white"
                            size={40}
                        />
                    </TouchableOpacity>



                </View>



            </Camera>
        );
    }

     /*
     <TouchableOpacity
     style={[styles.flipButton]}
     onPress={this._pickImage}>
     <Text style={styles.flipText}> Img Gallery</Text>
     </TouchableOpacity>

     <TouchableOpacity
     style={[styles.flipButton]}
     onPress={this.takePicture.bind(this)}>
     <Text style={styles.flipText}> SNAP </Text>
     </TouchableOpacity>

     <TouchableOpacity
     style={[styles.flipButton]}
     onPress={this._videoRoll.bind(this)}>
     <Text style={styles.flipText}>
     Video
     </Text>
     </TouchableOpacity>
     */

    _testDoc = async ()=> {
        let doc = await Expo.DocumentPicker.getDocumentAsync();
    };

    _videoRoll = async () => {
        if (this.camera) {
            let video = await this.camera.recordAsync();

            if (!video.cancelled) {
             console.log(video);
            }
        }
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'ivory',
    },
    navigation: {
        flex: 1,
    },
    gallery: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    flash: {
        flex: 0.3,
        height: 40,
        marginHorizontal: 2,
        marginBottom: 10,
        marginTop: 20,
        borderRadius: 8,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flipButton: {
        flex: 0.3,
        height: 40,
        marginHorizontal: 2,
        marginBottom: 10,
        marginTop: 20,
        borderRadius: 8,
        borderColor: 'white',
        borderWidth: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flipText: {
        color: 'white',
        fontSize: 15,
    },
    item: {
        margin: 4,
        backgroundColor: 'indianred',
        height: 35,
        width: 80,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    picButton: {
        backgroundColor: 'darkseagreen',
    },
    galleryButton: {
        backgroundColor: 'indianred',
    },
    row: {
        flexDirection: 'row',
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

export default connect(mapStateToProps, mapDispatchToProps)(CameraView);


