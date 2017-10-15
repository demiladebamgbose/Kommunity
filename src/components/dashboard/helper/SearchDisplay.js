/**
 * Created by jolaadeadewale on 05/08/2017.
 */
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
let {width, height} = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';


const Circle = ({label, img, click, id}) => {
    return (


      <View style={stylesCircle.center}>
          <TouchableOpacity onPress={() => click(id)}>
              <View style={stylesCircle.circle}>
                  <Image  style={{width: 50, height: 50, borderRadius: 50/2,}}
                          source={{ uri: img || "https://res.cloudinary.com/dd58mfinr/image/upload/v1481734664/default.png"}}
                  />
              </View>
          </TouchableOpacity>
          <Text style={stylesCircle.text}>{label}</Text>
      </View>

    )
};

const stylesCircle = StyleSheet.create({
    circle: {
      width: 50,
      height: 50,
      borderRadius: 50/2,
      marginRight: 6
    },

    center: {
    },

    text: {
        marginTop: 2,
        fontSize: 8,
    }
});


const SearchDisplay = ({img, name, other, follow, following, unfollow, userId, id, viewClicked, more}) => {

    return (
        <TouchableOpacity onPress={()=> viewClicked(id)}>
            <View style={styles.container}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Circle label="" img={img} click={viewClicked}  id={id}/>
                        <View style={{ width: ((35/ 100) * width), height: ((15/ 100) * width), paddingTop: 5,  alignContent: 'center',
                                }}>
                            <Text style={{fontSize: 11, marginBottom: 1}}>{name}</Text>
                            <Text style={{fontSize: 11}}>{other.firstName} {other.lastName}</Text>
                        </View>
                        <View style={{width: ((40 / 100) * width) , marginRight: ((9 / 100) * width) , height: ((15/ 100) * width),

                             }}
                        >

                            {(userId !== id) ? <TouchableOpacity style={[styles.button, { backgroundColor: (following) ? 'white' : 'steelblue'}]}>
                                    <Text onPress={()=>{ (following) ? unfollow(id) : follow(id) }} style={{fontSize: 11, textAlign: 'center'}}>
                                        {(following) ? 'Following' : 'Follow'}
                                    </Text>
                                </TouchableOpacity>: null
                            }

                        </View>
                        {(more) ?  <Ionicons name="ios-arrow-forward" size={18} /> : null}
                    </View>

            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        margin: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        padding: 10,
        height: ((19/ 100) * width)

    },
    button: {
        marginTop: 10,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 5,
        borderColor: '#D3D3D3',
        borderWidth: 1,
        borderStyle: 'solid',
    }
});

export default SearchDisplay;
