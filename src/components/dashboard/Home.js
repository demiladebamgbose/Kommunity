import React from 'react'
import {Image, Button, Alert,  CameraRoll, StyleSheet, View, FlatList, Text, ScrollView} from 'react-native';
import Grid from './helper/grid';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fileActions from '../../actions/fileActions';
import _ from 'lodash'
import Circle from '../dashboard/helper/Circle';


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
        let that = this;
        let files = that.props.files;
        let singleViewImage = _.find(files.recent.message.data, ['_id', e]);

        this.props.action.fetchSingleFileView(singleViewImage).then( response => {

            const { navigate } = that.props.navigation;
            navigate('SingleView', { image: '' })
        });

    };

    render() {

        return (
            <View style={{flex: 1, flexDirection: 'column',  justifyContent: 'space-between',}}>
                <ScrollView style={styles.scrollViewStyle} horizontal={true} >
                <View style={styles.categoryHeight}>
                    <Circle label="Fashion"/>
                    <Circle label="Restaurant"/>
                    <Circle label="hangout"/>
                    <Circle label="Events"/>
                    <Circle label="Travels"/>
                    <Circle label="Arts"/>
                </View>
                </ScrollView>
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
    categoryHeight: {
        height: 80,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 0
    },
    scrollViewStyle:{
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        margin: 15
    }
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

