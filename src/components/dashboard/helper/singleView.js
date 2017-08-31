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
import Moment from 'react-moment';

class SingleView extends React.Component {

    constructor(props) {
        super(props);

       let liked = this.props.files.viewFile.likes.filter((data) => {
            return data == this.props.user.message.user._id
        });

       let likeState = false;
       let userLiked = 0;
       if(liked.length){
           likeState = true;
           this.props.action.previouslyLiked(this.props.files.viewFile._id, this.props.likedFiles).then(
               response => {
                   console.log('returned from liker');
               }
           );
       }else{
          if(this.props.likedFiles.indexOf(this.props.files.viewFile._id) !== -1){
              likeState = true;
              userLiked = this.props.files.viewFile.likes.length + 1;
          }
       }

        this.state = {
            'image': this.props.files.viewFile.content,
            'caption': this.props.files.viewFile.caption,
            'time': this.props.files.viewFile.timestamp,
            'id': this.props.files.viewFile._id,
            'likes': userLiked || this.props.files.viewFile.likes.length,
            'liked': likeState
        };

    }

    _onUser = (e) => {
        console.log('I was clicked, you cut ', e);
    };

    _onLike = (e) => {
        if(this.state.liked) {
            this.props.action.unLikeFile(this.props.user, this.state.id, this.props.likedFiles).then(response => {
                console.log(this.props.likedFiles);
                console.log('got back from unlike');
                this.setState({liked: false});
                this.setState({likes: (--this.state.likes)})
            })
        }else {
            this.props.action.likeFile(this.props.user, this.state.id, this.props.likedFiles).then(response => {
                this.setState({liked: true});
                this.setState({likes: (++ this.state.likes)})
            })
        }
    };

    _onMessage =(e)=> {
        console.log('The message icon');
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
                    <View>
                        <TouchableHighlight onPress={this._onLike}>
                            <Ionicons name="ios-heart-outline"  size={20} color={(this.state.liked) ? 'red': 'black'} />
                        </TouchableHighlight>
                    </View>
                    <View style={{marginLeft: 15}}>
                        <TouchableHighlight onPress={this._onMessage}>
                            <Ionicons name="ios-arrow-round-forward-outline" size={20}  />
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.boxBorder}>
                </View>
                <View style={[styles.hBox, styles.contentPadding]}>
                    <TouchableHighlight>
                        <Text style={styles.textSize}>{this.state.likes} Likes</Text>
                    </TouchableHighlight>
                </View>
                <View style={[styles.hBox, styles.contentPadding]}>
                    <TouchableHighlight >
                        <View>
                            <Text style={styles.commentText}>{this.state.caption}</Text>
                            <Moment style={styles.commentText} element={Text} fromNow>{this.state.time}</Moment>
                        </View>
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
        files: state.files,
        user: state.user.presentUser,
        likedFiles: state.user.likedFiles
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleView);