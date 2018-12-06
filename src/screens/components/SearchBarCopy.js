

// @flow

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


export default class SearchBarCopy extends Component {
    render() {
        return (
            <View style={{ height: 44, backgroundColor: '#efeff4', paddingHorizontal: 8, flexDirection: 'row', alignItems: 'center' }}>
                <View {...this.props} style={{ borderRadius: 5, backgroundColor: '#fff', borderColor: '#ddd', borderWidth: 0.5, height: 28, flex: 1, paddingVertical: 0, alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 10, flexDirection: 'row' }}>
                    <Icon
                        name='search'
                        color='#aaa'
                        size={18}
                    />
                    <Text style={{ color: '#999', marginLeft: 10 }}>{this.props.placeholder?this.props.placeholder:"搜索"}</Text>
                </View>
            </View>
        );
    }
}



