/**
 * Created by jolaadeadewale on 29/07/2017.
 */
import React from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fileActions from '../../../actions/fileActions';
import Grid from '../../dashboard/helper/grid';
import _ from 'lodash'

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
            <Image
                source={require('../../../images/grid.png')}
            />
        ),
    };

    _onClick = (e) => {

        console.log('hello');
    };

    render () {
        return (
            <View>
                <FlatList
                    data={this.state.files}
                    renderItem={({item}) => <Grid obj={item} click={this._onClick} />}
                />
            </View>
        )
    }

    componentDidMount () {
        let that = this;
        let userId = this.props.user.message.user._id;
        this.props.action.fetchUserFiles(userId).then( response => {

             let files = that.props.files;
             console.log('returned files', files);
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