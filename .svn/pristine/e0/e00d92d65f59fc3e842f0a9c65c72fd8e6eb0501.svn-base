// @flow

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image
} from 'react-native';
export default class DiagnosisList extends Component {
    render() {
        const content = this.props.content
        return (
            <View style={styles.container} >
                <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', height: 120, }}>
                    {
                        content.imageUrl ? <Image
                            source={{ uri: content.imageUrl }}
                            style={styles.imgSty}
                        /> : <Image
                                source={require('root/img/nopic.gif')}
                                style={styles.imgSty}
                            />
                    }
                </View>
                <View style={{ width: '100%' }}>
                    <Text style={{ lineHeight: 60, fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'gray' }}>{content.nameCn ? content.nameCn : content.pest}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        borderRadius: 5,
        marginLeft: '5%',
        marginBottom: 10,
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowColor: '#000',
        elevation: 3,
    },
    imgSty: {
        width: '90%',
        height: 120,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
    }
});
