// @flow

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image
} from 'react-native';
export default class HotProduct extends Component {
    render() {
        const content = this.props.content
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', paddingBottom: 15, paddingTop: 15, alignItems: 'center', backgroundColor: '#fff', paddingRight: 12, paddingLeft: 12, borderBottomColor: '#f1f1f1', borderBottomWidth: 0.4 }}>
                <View style={{ width: '30%', height: 120 }}>
                    {
                        content.maxImgUrl ? <Image
                            source={{ uri: content.maxImgUrl }}
                            style={{ width: '100%', height: '100%', borderRadius: 5 }}
                        /> : <Image
                                source={require('root/img/nopic.gif')}
                                style={{ width: '100%', height: '100%', borderRadius: 5 }}
                            />
                    }
                </View>
                <View style={{ marginLeft: 15, width: '60%' }}>
                    <Text style={{ lineHeight: 20, fontSize: 14, color: '#7bb046' }}>{content.goodsName}({content.specifications})</Text>
                    <Text style={{ lineHeight: 20, color: 'gray', }}>热销产品</Text>

                    <Text style={{ lineHeight: 20, color: 'gray', }}>登记证名称：{content.registerName}</Text>
                    <Text style={{ lineHeight: 20, color: 'gray', }}>毒性：{content.toxicity}</Text>
                    <Text style={{ lineHeight: 20, color: 'gray', }}>类型：{content.goodsCategoryName}</Text>
                    <Text style={{ lineHeight: 20, color: 'gray', }}>参考价：{content.priceRange}</Text>
                </View>
            </View>
        );
    }
}
