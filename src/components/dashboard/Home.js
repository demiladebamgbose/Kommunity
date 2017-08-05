import React from 'react'
import {Image, Button, Alert,  CameraRoll, StyleSheet, View, FlatList, Text, ScrollView, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fileActions from '../../actions/fileActions';
import _ from 'lodash'
import Circle from '../dashboard/helper/Circle';
let {height, width} = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';
import PostTab from './postTab/PostTab';

let pictureSize = ((width/ 3) - 6);


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
            <Ionicons name="ios-home-outline" size={20}  />
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
             <View style={{flex: 1, flexDirection: 'column',  justifyContent: 'space-between'}}>
                 <View style={{height: (height / 5)}}>
                    <ScrollView showsHorizontalScrollIndicator={false} style={styles.scrollViewStyle} horizontal={true} >
                    <View style={styles.categoryHeight}>
                        <Circle label="Fashion"/>
                        <Circle label="Restaurant"/>
                        <Circle label="hangout"/>
                        <Circle label="Events"/>
                        <Circle label="Travels"/>
                        <Circle label="Arts"/>
                    </View>
                    </ScrollView>
                 </View>

                 <View style={styles.pictureContainer}>
                    <PostTab screenProps={{data: this.state.files, width: pictureSize, click: this._onClick}} data={this.state.files} width={pictureSize} click={this._onClick} />
                </View>
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
        height: (height/ 8),
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 1
    },
    scrollViewStyle:{
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        margin: 15,
        flex: 1
    },
    pictureContainer: {
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 15,
        flex: 1,
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

