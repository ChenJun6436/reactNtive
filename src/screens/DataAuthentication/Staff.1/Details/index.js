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
import * as MineAction from 'root/src/actions/staff';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const Item = List.Item;

@loadingDecorator
export default class StaffDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {
                plantList: []
            },
        }
    }
    componentWillMount() {
        MineAction.StaffDetail(this.props.id).then((data) => {
            if (data.suc) {
                this.setState({
                    model: data.data,
                    loading: false
                })
            } else {
                MyToast.info('数据获取失败，稍后尝试');
            }
        })
    }
    render() {
        let model = this.state.model;
        return (
            <ScrollView style={{ backgroundColor: '#f2f2f2', position: 'relative', height: SCREEN_HEIGHT }}>
                <View style={styles.container}>
                    {
                        model.headUrl ? (
                            <Image source={{ uri: model.headUrl }} style={styles.imgStyle} />
                        ) : (
                            <Image source={require('root/img/nopic.gif')} style={styles.imgStyle} />
                        )
                    }
                    <DetailItem title="姓名" content={model.name} />
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