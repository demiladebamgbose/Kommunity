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
                <View  style={styles.hBox}>
                    <TouchableHighlight>
                        <Image source={require('../../images/home.png')}></Image>
                    </TouchableHighlight>

                </View>
                <View>

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
    headerContent: {
        marginBottom: 20
    },
    imageContent: {
        marginTop: 30
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