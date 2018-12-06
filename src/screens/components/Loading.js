// @flow

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
} from 'react-native';

const Loading = (props) => props.visible?<View style={styles.loadingMask}>
    <View style={styles.loadingContainer}>
        <View style={{ padding: 10 }}>
            <ActivityIndicator
                animating={true}
                size="large"
                color="white"
                style={{ marginBottom: 10 }}
            />
            <Text style={{ color: "white" }}>{props.loadingText?props.loadingText:"数据加载中"}</Text>
        </View>
    </View>
</View>:null


const styles = StyleSheet.create({
    loadingMask: {
        position: "absolute",
        flex: 1,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 999,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 8
    }
});

export default Loading