/**
 * Created by jolaadeadewale on 27/07/2017.
 */
import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

const Grid = ({obj, click, width , margin}) => {
    //let data1 = obj['0'].content.secure_url.split('upload/');
   // data1  = data1.join(`upload/c_scale,h_100,w_${(width - 1)}/`);
    let data2, data3 = '';

    if(!obj['1']) {
       // obj['1'] = {'content': {'secure_url': ''}}
    } else{
     //   data2 = obj['1'].content.secure_url.split('upload/');
      //  data2 = data2.join(`upload/c_scale,h_100,w_${(width - 1)}/`);
    }

    if(!obj['2']) {
      //  obj['2'] = {'content': {'secure_url': ''}};
    } else{
      //  data3 = obj['2'].content.secure_url.split('upload/');

    }

    return (
        <View key={obj['0'].content} style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => click(obj['0']._id)}>
                <View style={{ width: width, height: 100,   margin: margin || 1}} >
                    <Image  style={{width: (width - 1), height: 99}} source={{ uri: obj['0'].link || obj['0'].content.secure_url
                    } }  />
                </View>
            </TouchableOpacity>
            { (obj['1']) ?
                <TouchableOpacity onPress={() => click(obj['1']._id)}>
                    <View style={{ width: width, height: 100,  margin: margin || 1}}>
                        <Image style={{width: (width - 1), height: 99}}
                               source={{ uri: obj['1'].link || obj['1'].content.secure_url }}/>
                    </View>
                </TouchableOpacity> : null

            }

            {
                (obj['2']) ?
                    <TouchableOpacity onPress={() => click(obj['2']._id)}>
                        <View style={{ width: width, height: 100,   margin: margin || 1}} >
                            <Image style={{width: (width - 1), height: 99}}
                                   source={{ uri: obj['2'].link || obj['2'].content.secure_url  }} />
                        </View>
                    </TouchableOpacity> : null
            }

        </View>
    )
};

export default Grid;