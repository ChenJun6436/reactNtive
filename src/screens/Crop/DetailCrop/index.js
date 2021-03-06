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
    TouchableHighlight,
    Animated,
    ScrollView,
    Platform,
    Image
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoadMoreList from 'root/src/screens/baseComon/LoadMoreList.js';
import * as CropAction from 'root/src/actions/crop';
import DetailItem from 'root/src/screens/baseComon/DetailItem.js';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import CropStore from 'root/src/stores/crop';
@navigatorDecorator 
// @loadingDecorator
export default class DigDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeList: [],
            fresh: true
        };
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                rightButtons: [
                    {
                        id: 'editor',
                        text: '编辑',
                        color: '#fff',
                        fontSize: 16,
                    }
                ]
            }
        });
        Navigation.events().bindComponent(this);
    }
    navigationButtonPressed({ buttonId }) {
        CropStore.setCropData([this.props.data.cropName])
        CropStore.setPestData(this.props.data.pestName)
        this.pushPage({
            component: {
                ...Global.Screens.AddCrop,
                passProps: { id: this.props.data.id , _fresh: this._fresh},
                topBar: {
                    title: {
                        text: '编辑关注'
                    }
                },
                bottomTabs: {
                    visible: false,
                    drawBehind: true
                }
            }
        });
    }
    _fresh=()=>{
        this.setState({
            fresh: false
        })
    }
    componentWillMount() {
        
    }
    render() {
        let item = this.props.data
        return (
            <ScrollView style={styles.container}>
                <View style={styles.content}>
                    <DetailItem title="作物名" content={item.cropName} />
                    <DetailItem title="病害名称" content={item.pestName.join('，')} />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    imgStyle: {
        // 设置宽度
        width: Dimensions.get('window').width,
        // 设置高度
        height: 200,
        // 设置图片填充模式
        resizeMode: 'stretch'
    },
});

