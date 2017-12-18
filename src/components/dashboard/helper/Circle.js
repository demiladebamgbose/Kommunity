/**
 * Created by jolaadeadewale on 04/08/2017.
 */
import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
let {height, width} = Dimensions.get('window');




class Circle extends React.Component {

    state = {
        radius: 10
    };

    _onloadStart = (e) => {

    };

    _onLoadEnd = (e) => {
        this.setState({radius: 0});
    };

    _onProgress = (e) => {
       console.log(e.target);
    };


    render () {
        const {label, url, click} = this.props;

        return (
            <View style={styles.center}>
                <TouchableOpacity onPress={() => click(label)}>
                    <View style={styles.circle}>
                        <Image style={{
                        width: ((18.7 / 100) * width), height: ((18.7 / 100) * width),
                        borderRadius: (((18.7 / 100) * width)/2)
                    }}
                               blurRadius={this.state.radius}
                               source={{ uri: url} }
                               onLoadStart={this._onloadStart}
                               onLoadEnd={this._onLoadEnd}
                               onProgress={this._onProgress}
                        />
                        <Text style={styles.text}>{label}</Text>
                    </View>
                </TouchableOpacity>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    circle: {
        width: ((18.7 / 100) * width),
        height: ((18.7 / 100) * width),
        borderRadius: (((18.7 / 100) * width) / 2),
        marginRight: 10
    },
    center: {
        alignContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginTop: 2,
        fontSize: 8,
        textAlign: 'center'
    }
});

export default Circle;
