// @flow

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';
export default class DetailItem extends Component {
    render() {
        return (
            <View style={[styles.container, { backgroundColor: this.props.gray ? '#eee' : '#fff', marginTop: this.props.top ? this.props.top : 0 }]}>
                <View style={{ flex: this.props.titleFlex ? this.props.titleFlex : 1 }}>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
                <View style={styles.gap}></View>
                <View style={{ flex: this.props.contentFlex ? this.props.contentFlex : 2, alignItems: 'flex-end' }}>
                    {typeof this.props.content === 'string' || typeof this.props.content === 'number' ? (
                        <Text style={styles.content}>{this.props.content}</Text>
                    ) : (
                            this.props.content
                        )}

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
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#d9d9d9',
    },
    gap: {
        width: 10
    },
    title: {
        fontSize: 16,
        color: 'gray',
        fontFamily: "微软雅黑",
    },
    content: {
        fontSize: 14,
        color: 'gray',
        fontFamily: "微软雅黑",
    }
});