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
import Icon from 'react-native-vector-icons/Feather';
import LoadMoreList from 'root/src/screens/baseComon/LoadMoreList.js';
import * as DistinguishAction from 'root/src/actions/distinguish';
import DetailItem from 'root/src/screens/baseComon/DetailItem.js';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

@navigatorDecorator 
// @loadingDecorator
export default class DigDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeList: []
        };

    }

    componentWillMount() {

    }
    render() {
        // console.log(this.state.typeList)
        let item = this.props.data
        return (
            <ScrollView style={styles.container}>
                <View >
                    {item.DefaultImg ? <Image
                        source={{ uri: item.DefaultImg }}
                        style={styles.imgStyle}
                    /> : <Image
                            source={require('root/img/nopic.gif')}
                            style={styles.imgStyle}
                        />}
                </View>
                <View style={styles.content}>
                    <DetailItem title="作物名" content={item.Crop} />
                    <DetailItem title="病害类型" content={item.Type} />
                    <DetailItem title="病害名称" content={item.PestDistinct} />
                    <DetailItem title="详细介绍" content={item.Introduction} />
                    <DetailItem title="危害症状" content={item.DamageSymptoms} />
                    <DetailItem title="防治" content={item.Control} />

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
