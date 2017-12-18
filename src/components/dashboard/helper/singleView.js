/**
 * Created by jolaadeadewale on 28/07/2017.
 */
import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fileActions from '../../../actions/fileActions';
let {height, width} = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';
import Moment from 'react-moment';
import ActionSheet from 'react-native-actionsheet';

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 3;
const options = [ 'Cancel', 'Save', 'Delete', 'Report' ];

class SingleView extends React.Component {

    constructor(props) {
        super(props);

       let liked = this.props.files.viewFile.likes.filter((data) => {
            return data == this.props.user._id
        });


       let likeState = false;
       let userLiked = 0;
       if(liked.length) {
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
            'liked': likeState,
            'selected': 0
        };

    }

    showActionSheet = () => {
        this.ActionSheet.show();
    };

    _onUser = (e) => {
        console.log('I was clicked, you cu', e);
    };

    _refreshLikedFiles = () => {
        this.props.action. resetLikedFile(this.props.files.viewFile._id, this.props.files.viewFile.likes).then(data => {
            debugger;
        })
    };

    _onLike = (e) => {
        if(this.state.liked) {
            this.props.action.unLikeFile(this.props.user, this.state.id, this.props.likedFiles).then(response => {
                this.setState({liked: false});
                this.setState({likes: (--this.state.likes)});
                this._refreshLikedFiles();
            })
        } else {
            this.props.action.likeFile(this.props.user, this.state.id, this.props.likedFiles).then(response => {
                this.setState({liked: true});
                this.setState({likes: (++ this.state.likes)});
                this.props.likedFiles = this.props.likedFiles.filter( data => {
                    return data !== this.props.files.viewFile._id;
                });
                this._refreshLikedFiles();
            })
        }
    };

    _onViewLikes =() => {
        const { navigate } = this.props.navigation;
        navigate('UserLikes', { userLikes: this.state.id })
    };

    _onMessage =(e)=> {
        console.log('The message icon');
    };

    _options = () => {
        this.showActionSheet();
    };

    handlePress = (i) =>{
        this.setState({
            selected: i
        })
    };

    render () {
        return (
            <View>
                <View style={[styles.hBox, styles.contentPadding]}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <TouchableOpacity style={styles.headerContent}>
                            <View>
                                <Circle url="" label="username" click={this._onUser} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._options}>
                            <Ionicons name="ios-more-outline" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.imageContent}>
                    <Image style={{width: width, height: 260}}  source={{uri:this.state.image.secure_url}}></Image>
                </View>
                <View  style={[styles.hBox, styles.contentPadding, styles.boxHeight]}>
                    <View>
                        <TouchableOpacity onPress={this._onLike}>
                            <Ionicons name="ios-heart-outline" size={20} color={(this.state.liked) ? 'red': 'black'} />
                        </TouchableOpacity>
                    </View>
                    <View style={{marginLeft: 15}}>
                        <TouchableOpacity onPress={this._onMessage}>
                            <Ionicons name="ios-arrow-round-forward-outline" size={20}  />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.boxBorder}>
                </View>
                <View style={[styles.hBox, styles.contentPadding]}>
                    <TouchableOpacity onPress={this._onViewLikes}>
                        <Text style={styles.textSize}>{this.state.likes} Likes</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.hBox, styles.contentPadding]}>
                    <TouchableOpacity>
                        <View>
                            <Text style={styles.commentText}>{this.state.caption}</Text>
                            <Moment style={styles.commentText} element={Text} fromNow>{this.state.time}</Moment>
                        </View>
                    </TouchableOpacity>
                </View>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    options={options}
                    cancelButtonIndex={CANCEL_INDEX}
                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                    onPress={this.handlePress}
                />
            </View>
        )
    }
}

const Circle = ({label, url, click}) => {
    return (
        <View style={styles.center}>
            <TouchableOpacity onPress={() => click(label)}>
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

            </TouchableOpacity>
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