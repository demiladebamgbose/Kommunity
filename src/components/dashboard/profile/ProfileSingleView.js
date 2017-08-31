/**
 * Created by jolaadeadewale on 29/07/2017.
 */
import React from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fileActions from '../../../actions/fileActions';
import VerticalGrid from '../../dashboard/helper/verticalGrid';
import _ from 'lodash';

class ProfileSingleView extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            files: []
        }
    }

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

    render () {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={this.state.files}
                    renderItem={({item}) => <VerticalGrid obj={item} click={this._onClick} />}
                />
            </View>
        )
    }

    componentDidMount () {

        let that = this;
        let userId = this.props.user.presentUser.message.user._id;
        console.log('disptached at ', userId);
        this.props.action.fetchUserFiles(userId).then( response => {

            let files = that.props.files;
            let gridImages = _.chunk(files.userFile.message.data, 1);
            this.setState({files: gridImages});
        });
    }

}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(fileActions, dispatch)
    }
}

function mapStateToProps(state, ownProps) {
    return {
        files: state.files,
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSingleView);