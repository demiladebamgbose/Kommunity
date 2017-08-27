/**
 * Created by jolaadeadewale on 28/07/2017.
 */
import React from 'react';
import {View, Image, StyleSheet, Text, TouchableHighlight, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fileActions from '../../../actions/fileActions';
let {height, width} = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';



class SingleView extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            'image': this.props.files.viewFile.content
        };

    }

    _onUser = (e) => {
        console.log('I was clicked, you cut me wide iopen like land', e);
    };

    render () {
        return (

            <View>
                <View style={[styles.hBox, styles.contentPadding]}>
                    <View>
                        <TouchableHighlight style={styles.headerContent}>
                            <View>
                                <Circle url="" label="username" click={this._onUser} />
                            </View>
                        </TouchableHighlight>
                    </View>

                </View>
                <View style={styles.imageContent}>
                    <Image style={{width: width, height: 260}}  source={{uri:this.state.image.secure_url}}></Image>
                </View>
                <View  style={[styles.hBox, styles.contentPadding, styles.boxHeight]}>
                    <TouchableHighlight onPress={()=> {console.log('I was clicked')}}>
                        <Ionicons name="ios-heart-outline" size={20}  />
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=> {console.log('I was clicked too')}} style={styles.imageRight}>
                        <Image style={{width: 20, height: 20}} source={require('../../../images/chat.png')}></Image>
                    </TouchableHighlight>
                </View>
                <View style={ styles.boxBorder}>

                </View>
                <View style={[styles.hBox, styles.contentPadding]}>
                    <TouchableHighlight>
                        <Text style={styles.textSize}>2000 Likes</Text>
                    </TouchableHighlight>
                </View>
                <View style={[styles.hBox, styles.contentPadding]}>
                    <TouchableHighlight >
                        <Text style={styles.boldText}>Username</Text>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Text>Commments</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const Circle = ({label, url, click}) => {
    return (
        <View style={styles.center}>
            <TouchableHighlight onPress={() => click(label)}>
                <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
                    <View style={styles.circle}>
                        <Image  style={{width: 36, height: 36, borderRadius: 36/2,}}
                            source={{ uri:
                            'http://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png' || url} } />
                    </View>
                    <View>
                        <Text onPress={()=> click(label)} style={styles.text}>{label}</Text>
                        <Text style={{justifyContent: 'flex-end', fontSize: 8}}>Follow</Text>
                    </View>
                </View>

            </TouchableHighlight>
        </View>
    )
};


const styles = StyleSheet.create({
    hBox: {
        flex: 1,
        flexDirection: 'row'
    },
    boxBorder: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 10,
        marginLeft: 10
    },
    boxHeight: {
        marginBottom: 15
    },
    headerContent: {
        marginBottom: 20
    },
    imageContent: {
        marginTop: 70
    },

    imageRight: {
        marginLeft: 15
    },

    contentPadding: {
        padding: 10
    },
    textSize: {
        fontSize: 10,
        marginLeft: 2
    },
    imageText: {
        paddingTop: 2
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 10
    },
    commentText:{
        color: 'grey',
        marginTop: 10,
        fontSize: 10
    },
    circle: {
        width: 36,
        height: 36,
        borderRadius: 36/2,
        backgroundColor: '#D3D3D3',
        marginRight: 6
    },
    center: {
        marginTop: 10,
        alignContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginTop: 9,
        fontSize: 8,
        textAlign: 'center'
    }

});

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(fileActions, dispatch),
        activity: bindActionCreators(fileActions, dispatch)
    }
}

function mapStateToProps(state, ownProps) {
    return {
        upload: state.upload,
        files: state.files
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleView);