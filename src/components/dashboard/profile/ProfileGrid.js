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
        let userId = '';
        let navigation = false;
        if(this.props.screenProps.userId) {
            userId = this.props.screenProps.userId;
            navigation = this.props.screenProps.nav;
        }

        this.state = {
            files: [],
            userId: userId,
            navigation: navigation
        };
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
            const { navigate } = this.state.navigation || this.props.screenProps.rootNavigation;
            navigate('SingleView', { image: '' })
        });
    };

    _keyExtractor = (item, index) => index;

    render () {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={this.state.files}
                    keyExtractor={this._keyExtractor}
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

        let userId = this.state.userId || this.props.user.presentUser._id;
        this.props.action.fetchUserFiles(userId).then( response => {
              let files = this.props.files;
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