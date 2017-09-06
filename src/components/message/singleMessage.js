import React from 'react';
import {Text, Dimensions, StyleSheet} from 'react-native';
let {width, height} = Dimensions.get('window');

class SingleMessage extends React.Component {

    constructor(props){
        super(props);
        let userId = this.props.navigation.state.params.id;
        let sender = this.props.navigation.state.params.sender;
    }

    render(){
        return(
            <View style={styles.container}>
                <View>

                </View>
                <View>
                    <Text>Hello</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    topContainer: {

    }
});

export default SingleMessage;
