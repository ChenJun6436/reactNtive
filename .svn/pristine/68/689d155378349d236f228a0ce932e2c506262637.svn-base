import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ActivityIndicator
} from 'react-native';
//该方式可执行父类同名方法
const LoadingDecorator = (superclass) => class extends superclass {

    constructor(props) {
        super(props);
        this.state = { ...this.state,loading: true}
    }
    render = () => {
        if (this.state.loading) {
            return (
                <View style={styles.container} >
                    <ActivityIndicator color="#00aa00" />
                </View>
            )
        }
        if (super.render) {
            return super.render();
        }
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

export default LoadingDecorator;