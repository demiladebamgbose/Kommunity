/**
 * Created by jolaadeadewale on 29/07/2017.
 */
import React from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fileActions from '../../../actions/fileActions';
import Grid from '../../dashboard/helper/grid';

class ProfileGrid extends React.Component {

    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            files: props.files
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
                <Text>Profile Grid</Text>
                <FlatList
                    data={[]}
                    renderItem={({item}) => <Grid obj={item} click={this._onClick} />}
                />
            </View>
        )
    }

    componentDidMount () {
        let that = this;
        this.props.action.fetchAllFiles().then( response => {

            let files = that.props.files;

            let gridImages = _.chunk(files.recent.message.data, 3);
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