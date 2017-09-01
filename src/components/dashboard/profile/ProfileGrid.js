/**
 * Created by jolaadeadewale on 29/07/2017.
 */
import React from 'react';
import {View, Text, Image, FlatList, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fileActions from '../../../actions/fileActions';
import { Ionicons } from '@expo/vector-icons';
import Grid from '../../dashboard/helper/grid';
import _ from 'lodash'
let {height, width} = Dimensions.get('window');
let pictureSize = ((33 / 100) * width)

class ProfileGrid extends React.Component {

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
                name="ios-keypad-outline"
                size={18}
            />

        ),
    };

    _onClick = (e) => {
        let files = this.props.files;
        let singleViewImage = _.find(files.recent.message.data, ['_id', e]);

        this.props.action.fetchSingleFileView(singleViewImage).then( response => {
            const { navigate } = this.props.screenProps.rootNavigation;
            navigate('SingleView', { image: '' })
        });

    };

    render () {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={this.state.files}
                    extraData={this.state}
                    renderItem={({item}) => <Grid
                    obj={item} click={this._onClick}
                    width={pictureSize}
                    />
                    }
                />
            </View>
        )
    }

    componentDidMount () {

        let that = this;
        let userId = this.props.user.presentUser.message.user._id;
        this.props.action.fetchUserFiles(userId).then( response => {
              let files = that.props.files;
              let gridImages = _.chunk(files.userFile.message.data, 3);
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileGrid);