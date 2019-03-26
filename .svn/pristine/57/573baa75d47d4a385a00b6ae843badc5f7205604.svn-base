// @flow

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';
export default class ListItem extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={{ color: this.props.noHref ? '#999' : 'green', overflow: 'hidden', flex: 6, fontSize: 16 }} numberOfLines={1}>{this.props.firstItem}</Text>
                    <Text style={{ color: '#999', flex: 4, textAlign: 'right' }} numberOfLines={1}>{this.props.secondItem}</Text>
                </View>
                <View style={{ height: 6 }}></View>
                <View style={styles.row}>
                    <Text style={{ color: '#999', overflow: 'hidden', flex: 6 }} numberOfLines={1}>{this.props.thirdItem}</Text>
                    <Text style={{ color: '#999', flex: 4, textAlign: 'right' }} numberOfLines={1}>{this.props.fourthItem}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#d9d9d9',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
