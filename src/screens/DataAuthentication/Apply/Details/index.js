import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    Image
} from 'react-native';
// import { inject, observer } from 'mobx-react/native';
import { SearchBar, WhiteSpace, WingBlank, List, Button, InputItem } from 'antd-mobile-rn';
import Icon from 'react-native-vector-icons/FontAwesome';
import { iconsMap, iconsLoaded } from 'root/src/utils/IconLoader';
import DetailItem from 'root/src/screens/baseComon/DetailItem';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const Item = List.Item;

@loadingDecorator
export default class ApplyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {
                plantList: []
            },
        }
    }
 
    render() {
        let model = this.props.item;
        return (
            <ScrollView style={{ backgroundColor: '#f2f2f2', position: 'relative', height: SCREEN_HEIGHT }}>
                <View style={styles.container}>
                    <DetailItem title="姓名" content={model.userInfo.userName?model.userInfo.userName:'--'} />
                    <DetailItem title="类型" content={model.typeStr} />
                    <DetailItem title="电话" content={model.phone} />
                    <DetailItem title="创建时间" content={model.createTimeStr} />
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10,
    },
    search: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    imgStyle: {
        // 设置宽度
        width: Dimensions.get('window').width,
        // 设置高度
        height: 180,
        // 设置图片填充模式
        resizeMode: 'stretch'
    },
});