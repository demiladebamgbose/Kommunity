import React from 'react';
import {Text, View, Image, Switch, TextInput, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Category from '../dashboard/helper/Category';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as uploadActions from '../../actions/uploadActions';

class Upload extends React.Component {

    constructor(props, context){
        super(props);
        this.state = {
            'image': this.props.upload.image,
            'private': false,
            'caption' : '',
            'category': [{'key': 'Fashion'},{'key': 'Restaurant'},
                {'key': 'hangouts'},{'key': 'Events'},
                {'key': 'Travels'},{'key': 'Arts'}],
            'Fashion': false,
            'Restaurant': false,
            'hangouts': false,
            'Events': false,
            'Travels': false,
            'Arts': false,
            'text': 'Next',
            'component': {}
        };
    }

    static navigationOptions = ({navigation})=> {
        const {params = {}} = navigation.state;

        return {
            headerRight: <Text onPress={
            ()=> {
                const { navigate } = navigation;
                navigate('Category', { name: 'Kommunity' })
            }
            } style={{ color: 'blue',
            marginRight: 20}}>Next</Text>
        }


    };

    _onSwitchSelected =(e, value) => {
        let component = this.state.component;
        component[value] = e;
        let data =  {
        };
        data[value] = e;

        this.props.action.addCategory(data, this.props.upload.category).then( obj => {
            this.setState(data);
        }).catch(err=> {
            console.log(err);
        });
    };

    render () {
        return (
            <View style={styles.topContainer}>
                <View>
                    <Image style={{width: 320, height: 290}}  source={{uri:this.state.image.uri}} />
                </View>
                <View style={styles.category}>
                    <FlatList
                        data={this.state.category}
                        extraData={this.state}
                        renderItem={
                            ({item})=>
                            <Category text={item.key}
                            status={this.state[item.key]}
                            valueSet={this._onSwitchSelected} />
                        }
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        margin: 20,
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center'
    },
    category:{
        flex: 1,
        flexDirection: 'column',
        width: 320,
        borderTopColor: 'grey',
        borderTopWidth: 1,
        borderStyle: 'solid'
    },
    column: {
        flex: 1,
        flexDirection: 'column',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        margin: 10
    },
    alternativeLayoutButtonContainer: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    centerText: {
        textAlign: 'center',
        color: 'red'
    },
    logInText: {
        textAlign: 'center',
        color: 'white',
        alignItems:'center',
        paddingTop: 8,
        fontSize: 14
    },
    nextButton:{
        color: 'blue',
        marginRight: 20
    }
});

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(uploadActions, dispatch)
    }
}

function mapStateToProps(state, ownProps) {

    return {
        upload: state.upload,
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);