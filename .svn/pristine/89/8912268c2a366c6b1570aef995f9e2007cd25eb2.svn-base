// @flow

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
export default class StoreItem extends Component {
    render() {
        const content = this.props.content
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', paddingBottom: 15, paddingTop: 15, alignItems: 'center', backgroundColor: '#fff', paddingRight: 12, paddingLeft: 12, borderBottomColor: '#f1f1f1', borderBottomWidth: 0.4 }}>
                <View style={{ width: '28%', height: 100 }}>
                    {
                        content.DefaultImg ? <Image
                            source={{ uri: content.DefaultImg }}
                            style={{ width: '100%', height: '100%', borderRadius: 5 }}
                        /> : <Image
                                source={require('root/img/nopic.gif')}
                                style={{ width: '100%', height: '100%', borderRadius: 5 }}
                            />
                    }
                </View>
                <View style={{ marginLeft: 15, width: '62%', height: 100 }}>
                    <View style={{ width: '100%' }}>
                        <Text style={{ lineHeight: 40, color: '#7bb046', fontSize: 18 }}> {content.Crop}{content.PestDistinct}</Text>
                    </View>
                    <View style={{ width: '100%', height: 60, }}>
                        <Text style={{ color: 'gray', lineHeight: 28 }} numberOfLines={2}> {content.Introduction ? content.Introduction : '无'}</Text>
                    </View>
                </View>
            </View>
        );
    }
}
