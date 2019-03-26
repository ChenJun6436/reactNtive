/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Animated,
    ScrollView,
    Image
} from 'react-native';
import moment from 'moment';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentWillMount() {
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.camera}>
                    <View style={styles.border}>
                        <TouchableOpacity style={styles.backTitle} onPress={() => {
                            clearInterval(this.tt);
                            this.pop()
                        }}>
                            <Image
                                source={require('root/img/camera.png')}
                            // style={styles.imgStyle}
                            />
                            <Text>拍照上传</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.main}>
                    <Text style={styles.title}>农资店推送配方</Text>
                    <View style={styles.content}>
                        <View style={{ width: "30%" }}>
                            <Image
                                source={require('root/img/ZFbanner.jpg')}
                                style={styles.imgStyle}
                            />
                            <Text>推送病虫草害</Text>
                        </View>
                        <View style={{ width: "30%" }}>
                            <Image
                                source={require('root/img/ZFbanner.jpg')}
                                style={styles.imgStyle}
                            />
                            <Text>推送病虫草害</Text>
                        </View>
                        <View style={{ width: "30%" }}>
                            <Image
                                source={require('root/img/ZFbanner.jpg')}
                                style={styles.imgStyle}
                            />
                            <Text>推送病虫草害</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.main}>
                    <Text style={styles.title}>企业推送配方</Text>
                    <View style={styles.content}>
                        <View style={{ width: "30%" }}>
                            <Image
                                source={require('root/img/ZFbanner.jpg')}
                                style={styles.imgStyle}
                            />
                            <Text>推送病虫草害</Text>
                        </View>
                        <View style={{ width: "30%" }}>
                            <Image
                                source={require('root/img/ZFbanner.jpg')}
                                style={styles.imgStyle}
                            />
                            <Text>推送病虫草害</Text>
                        </View>
                        <View style={{ width: "30%" }}>
                            <Image
                                source={require('root/img/ZFbanner.jpg')}
                                style={styles.imgStyle}
                            />
                            <Text>推送病虫草害</Text>
                        </View>
                    </View>

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        width: '100%',
        height: 150,
        borderBottomWidth: 2,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    border: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 120,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 60,
    },
    main: {
        paddingLeft: 12,
        paddingRight: 12,
        marginTop: 10,
        marginBottom: 10
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 40,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imgStyle: {
        width: '100%',
        height: 120
    }
});

