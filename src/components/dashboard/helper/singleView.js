/**
 * Created by jolaadeadewale on 28/07/2017.
 */
import React from 'react';
import {View, Image, StyleSheet, Text, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fileActions from '../../../actions/fileActions';

class SingleView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'image': this.props.files.viewFile.content
        };
        console.log(this.state.image)
    }

    render () {
        return (
            <View>
                <View style={styles.hBox}>
                    <TouchableHighlight style={styles.headerContent}>
                        <View>
                            <Image></Image>
                            <Text>Username</Text>
                        </View>
                    </TouchableHighlight>

                </View>
                <View style={styles.imageContent}>
                    <Image style={{width: 320, height: 260}}  source={{uri:this.state.image.secure_url}}></Image>
                </View>
                <View  style={[styles.hBox, styles.contentPadding, styles.boxHeight]}>
                    <TouchableHighlight onPress={()=> {console.log('I was clicked')}}>
                        <Image style={{width: 20, height: 20}} source={require('../../../images/likee.png')}></Image>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=> {console.log('I was clicked too')}} style={styles.imageRight}>
                        <Image style={{width: 20, height: 20}} source={require('../../../images/chat.png')}></Image>
                    </TouchableHighlight>
                </View>
                <View style={ styles.boxBorder}>

                </View>
                <View style={[styles.hBox, styles.contentPadding]}>
                    <TouchableHighlight style={styles.imageText}>
                        <Image style={{width: 8, height: 8}} source={require('../../../images/likee.png')}></Image>
                    </TouchableHighlight>
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
                <View style={styles.contentPadding}>
                    <Text style={styles.commentText}>View all comments </Text>
                    <Text style={styles.commentText}>2 hours ago</Text>
                </View>
            </View>
        )
    }

}

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
        marginTop: 30
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