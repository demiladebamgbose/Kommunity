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
            navigate('Upload', { image: this.props.image })
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