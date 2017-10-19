/**
 * Created by jolaadeadewale on 29/07/2017.
 */
import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fileActions from '../../../actions/fileActions';
import VerticalGrid from '../../dashboard/helper/verticalGrid';
import _ from 'lodash';
import ActionSheet from 'react-native-actionsheet'

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 3;
const options = [ 'Cancel', 'Save', 'Delete', 'Report' ];

class ProfileSingleView extends React.Component {

    constructor(props){
        super(props);
        let userId = '';
        if(this.props.screenProps.userId) {
            userId = this.props.screenProps.userId;
        }
        this.state = {
            files: [],
            id: this.props.user.presentUser._id,
            userId: userId,
            selected: 0
        }
    }

    showActionSheet = () => {
        this.ActionSheet.show();
    };

    static navigationOptions = {
        tabBarLabel: '',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Ionicons
                name="ios-list"
                size={22}
            />
        ),
    };

    _onClick = (e) => {

        let that = this;
        let files = that.props.files;
        let singleViewImage = _.find(files.recent.message.data, ['_id', e]);

        this.props.action.fetchSingleFileView(singleViewImage).then( response => {
            const { navigate } = that.props.navigation;
            navigate('SingleView', { image: '' })
        });
    };

    _userLikes = (id) => {
        const { navigate } = this.props.screenProps.rootNavigation;
        navigate('UserLikes', { userLikes: id })
    };

    _options = () => {
        this.showActionSheet();
    };

    handlePress = (i) =>{
        this.setState({
            selected: i
        })
    };

    _onLike =(id, status) => {
        if(status){
            this.props.action.unLikeFile({user: this.props.user.presentUser}, id, this.props.likedFiles).then(response => {
                this._onRefresh();
            })
        }else {
            this.props.action.likeFile({user: this.props.user.presentUser}, id, this.props.likedFiles).then(response => {
                this._onRefresh();
            })
        }
    };

    _keyExtractor = (item, index) => index;

    render () {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={this.state.files}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item}) => <VerticalGrid obj={item}
                    userLike={this._userLikes} like={this._onLike} uid={this.state.id} click={this._onClick}
                    options={this._options}
                    />
                    }
                />
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

    _onRefresh = () => {
        let userId = this.state.userId || this.props.user.presentUser._id;
        this.props.action.fetchUserFiles(userId).then( response => {

            let files = this.props.files;
            let gridImages = _.chunk(files.userFile.message.data, 1);
            this.setState({files: gridImages});
        });
    };

    componentDidMount () {
        this._onRefresh();
    }

}

const Circle = ({label, url, click}) => {
    return (
        <View style={styles.center}>
            <TouchableOpacity onPress={() => click(label)}>
                <View style={styles.circle}>
                    <Image  style={{width: 50, height: 50, borderRadius: 50/2,}}
                            source={{ uri: url} } />
                </View>
            </TouchableOpacity>
            <Text style={styles.text}>{label}</Text>
        </View>
    )
};


const styles = StyleSheet.create({
    circle: {
        width: 50,
        height: 50,
        borderRadius: 50/2,
        marginRight: 6
    },
    center: {

    },
    text: {
        marginTop: 2,
        fontSize: 8,
    }
});

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(fileActions, dispatch)
    }
}

function mapStateToProps(state, ownProps) {
    return {
        files: state.files,
        user: state.user,
        likedFiles: state.user.likedFiles
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSingleView);