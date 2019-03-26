// @flow

import React, { Component } from 'react';
import {
    Image,
    View,
    StyleSheet,
    Dimensions,
    findNodeHandle,
} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BG_IMAGE = require('root/img/build.jpg');
export default class Build extends Component {
    constructor(props: Props) {
        super(props);
        this.state = {
        };
    }
    componentWillMount() {
    }

    componentDidMount() {
    }
    imageLoaded = () => {
        this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }
    render() {
        return (
            <View style={styles.container}>
                <Image
                    ref={(img) => { this.backgroundImage = img; }}
                    source={BG_IMAGE}
                    style={styles.bgImage}
                    onLoadEnd={this.imageLoaded}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
    },
    bgImage: {
        position: "absolute",
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    },
})


