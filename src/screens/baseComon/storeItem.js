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
                <View style={{ width: '28%', height: 81 }}>
                    {
                        content.img ? <Image
                            source={{ uri: content.img }}
                            style={{ width: '100%', height: '100%', borderRadius: 5 }}
                        /> : <Image
                                source={require('root/img/nopic.gif')}
                                style={{ width: '100%', height: '100%', borderRadius: 5 }}
                            />
                    }
                </View>
                <View style={{ marginLeft: 15, width: '62%' }}>
                    <Text style={{ lineHeight: 27, fontSize: 14, color: '#7bb046' }}>{content.name}</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
                        <Text style={{ lineHeight: 27, marginRight: 5, color: 'gray', }}><Icon name='eye' size={12} />  {content.viewAmount}人查看</Text>
                        <Text style={{ lineHeight: 27, marginRight: 5, color: 'gray', }} ><Icon name='map-pin' size={12} />  {content.distance ? (content.distance.toFixed(2) + 'km') : '0km'}</Text>
                    </View>
                    <Text style={{ lineHeight: 27, color: 'gray', }} >{content.address}</Text>
                </View>
            </View>
        );
    }
}
