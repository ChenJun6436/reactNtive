// @flow

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
export default class StoreItem extends Component {
    render() {
        const content = this.props.content
        return (
            <View style={{ height: 8, backgroundColor: '#f5f5f5', width: SCREEN_WIDTH }}></View>
        );
    }
}
