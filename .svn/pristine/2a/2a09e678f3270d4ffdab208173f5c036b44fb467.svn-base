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
    Image,
    ImageBackground,
    CameraRoll,
} from 'react-native';
import moment from 'moment';
// import ImagePicker from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
// var ImagePicker = NativeModules.ImageCropPicker;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const options = {
    maxWidth: 800,
    maxHeight: 800,
    quality: 1,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
@navigatorDecorator
export default class Distinguish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
        };
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                rightButtons: [
                    {
                        ...confirmRightBtn, text: '识别'
                    }
                ]
            }
        });
        Navigation.events().bindComponent(this);
    }

    navigationButtonPressed() {
        if (!this.state.avatarSource) {
            MyToast.info('请上传图片');
        }
        else {
            this.pushPage({
                component: {
                    ...Global.Screens.DigResult,
                    passProps: { cropCnName: this.props.cropCnName, url: this.state.avatarSource },
                }
            });
        }

    }
    componentWillMount() {
    }
    showCamera() {
        ImageCropPicker.openCamera({
            width: 600,
            height: 600,
            cropping: true
        }).then(image => {
            let sources = { uri: image.path }
            this.setState({
                avatarSource: sources
            });
        });
    }
    showLibrary() {
        ImageCropPicker.openPicker({
            width: 600,
            height: 600,
            cropping: true
        }).then(image => {
            let sources = { uri: image.path }
            this.setState({
                avatarSource: sources
            });
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                </View>
                <View style={styles.middle}>
                    <View style={styles.imgView}>
                        {
                            this.state.avatarSource ?
                                <Image
                                    source={this.state.avatarSource}
                                    style={styles.imgStyle}
                                /> : <Image
                                    source={require('root/img/nopic.gif')}
                                    style={styles.imgStyle}
                                />
                        }
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View style={{ alignItems: 'center', padding: 5, width: 90, height: 90 }}>
                        <TouchableOpacity
                            onPress={this.showLibrary.bind(this)}
                        >
                            <Image
                                source={require('root/img/photo.png')}
                                style={styles.photos}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center', padding: 5, width: 90, height: 90 }}>
                        <TouchableOpacity
                            onPress={this.showCamera.bind(this)}
                        >
                            <Image
                                source={require('root/img/camera1.png')}
                                style={styles.photos}
                            />
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: SCREEN_HEIGHT
    },
    top: {
        position: "absolute",
        flex: 1,
        top: 0,
        left: 0,
        height: 200,
        width: SCREEN_WIDTH,
        backgroundColor: '#b7e0fe',
        borderBottomWidth: 0.4,
        borderBottomColor: 'gray',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        zIndex: 1,
    },
    middle: {
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgView: {
        marginTop: 70,
        width: '90%',
        height: 240,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        marginBottom: 10,
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowColor: '#000',
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgStyle: {
        width: '95%',
        height: '95%',
        borderRadius: 5,
    },
    bottom: {
        width: SCREEN_WIDTH,
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    photos: {
        width: 90,
        height: 90,
        borderRadius: 45,
    }
    // camera: {
    //     width: '100%',
    //     height: 150,
    //     borderBottomWidth: 2,
    //     borderBottomColor: '#eee',
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // },
    // border: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     width: 120,
    //     height: 120,
    //     borderWidth: 2,
    //     borderColor: '#ccc',
    //     borderRadius: 60,
    // },
    // main: {
    //     paddingLeft: 12,
    //     paddingRight: 12,
    //     marginTop: 10,
    //     marginBottom: 10
    // },
});

