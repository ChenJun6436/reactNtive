// @flow

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import Video from 'react-native-af-video-player'


export default class VideoPlayer extends Component {

    constructor(props) {
        super(props);

    }
    render() {
        const url = require('./hc.mp4')
        return (
            <View>
                <Video
                    url={url}
                    ref={(ref) => { this.video = ref }}
                    title={'aaa'}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#000',
        justifyContent:'center'
    },
})
