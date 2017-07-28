import React from 'react'
import {Image, Button, Alert,  CameraRoll, StyleSheet, View, FlatList, Text} from 'react-native';
import Grid from './helper/grid';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fileActions from '../../actions/fileActions';
import _ from 'lodash'


class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            'photos': {},
            'files': []
        };

        this._onCamera = this._onCamera.bind(this);
    }

    static navigationOptions = {
        tabBarLabel: 'Home',
        // Note: By default the icon is only shown on iOS. Search the showIcon option below.
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../../images/home.png')}
            />
        ),
    };

    _onCamera =() => {

    };

    _onClick = (e) => {
        console.log(e);
    };

    render() {

        return (
            <View style={{flex: 1, flexDirection: 'column',  justifyContent: 'space-between',}}>
                <Button
                    onPress={() => this.props.navigation.navigate('Screen')}
                    title="Go to Home Here"
                />
                <FlatList
                    data={this.state.files}
                    renderItem={({item}) => <Grid obj={item} click={this._onClick} />}
                />

            </View>


        );
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

const styles = StyleSheet.create({
    wrapper:{
        flex: 1,
    },
    row:{
        flexDirection: 'row',
        flex: 1,
    },
    marker: {
        position: 'absolute',
        top: 5,
        backgroundColor: 'transparent',
    },
});

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(fileActions, dispatch)
    }
}

function mapStateToProps (state, ownProps) {
    return {
        files: state.files
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

