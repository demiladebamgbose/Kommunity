/**
 * Created by jolaadeadewale on 14/10/2017.
 */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Back = () => {
    return (
        <Text>Back</Text>
    )
};

class SettingsList extends React.Component {

    constructor(props){
        super(props);
    }

    static navigationOptions = {
        tabBarLabel: 'Profile',
        // Note: By default the icon is only shown on iOS.
        tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-person-outline" size={20} />
        ),
    };

    render (){
        return (
            <View style={styles.container}>
                <SectionList
                    renderItem={({item}) => <ListItem title={item} />}
                    renderSectionHeader={({section}) => <Header title={section.title} />}
                    sections={[ // homogenous rendering between sections
                        {data: [...], title: ...},
                        {data: [...], title: ...},
                        {data: [...], title: ...},
  ]}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default SettingsList;