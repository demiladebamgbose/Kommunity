/**
 * Created by jolaadeadewale on 22/08/2017.
 */
import React from 'react';
import {View, Text, StyleSheet, TextInput, Image, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as uploadActions from '../../actions/uploadActions';
let {height, width} = Dimensions.get('window');


class CategoryUpload extends React.Component {

    constructor(props, context){
        super(props);
        this.state = {
            'caption': '',
            'image': this.props.upload.image,
        }
        console.log('here it is '+ width)
    }

    render() {
        return (
        <View style={styles.topContainer}>
            <View style={styles.commentSection}>
                <TextInput
                    style={{ paddingLeft: 10, fontSize: 9,
                            height: 70,
                            backgroundColor: 'white',
                            'paddingBottom': 5, width: (width/ 1.5)

                    }}
                           multiline = {true}
                           numberOfLines = {4}
                           placeholder='Write Caption'
                           onChangeText={(text) => this.setState({'caption': text})}
                           value={this.state.caption}
                />
                <Image style={{width: ((width/ 5)), height: 70, marginRight: 5}}  source={{uri:this.state.image.uri}} />

            </View>
            <View style={styles.privateSection}>

                <View>
                    <Text>
                        Kommunity
                    </Text>

                </View>
                <View>
                    <Text>
                        Kin
                    </Text>
                </View>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    commentSection:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderTopColor: '#ECECEC',
        borderTopWidth: 1,
        borderBottomColor: '#ECECEC',
        borderBottomWidth: 1,
        padding: 8,
        height: (height/ 7)
    },
    privateSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(uploadActions, dispatch)
    }
}

function mapStateToProps(state, ownProps) {

    return {
        upload: state.upload,
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryUpload);