import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    Dimensions,
    ScrollView,
} from 'react-native';
// import { inject, observer } from 'mobx-react/native';
import { SearchBar, WhiteSpace, WingBlank } from 'antd-mobile-rn';
import * as PortraitAction from 'root/src/actions/farmersPortrait';
import { List } from 'antd-mobile-rn';
const Item = List.Item;
@loadingDecorator
export default class BaseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: null,
        }
    }
    componentWillMount() {
        PortraitAction.getMemberOrderDetail({ orderId: this.props.id }).then((data) => {
            if (data.suc && data.data && data.data.length != 0)
                this.setState({ model: data.data })
            else {
                MyToast.info('暂无数据！稍后尝试');
            }
            this.setState({ loading: false })
        })
    }
    render() {
        return (
            <ScrollView style={{ backgroundColor: '#f2f2f2' }}>
                {
                    this.state.model && this.state.model.length > 0 ? this.state.model.map((item, index) => {
                        return <View style={styles.container} key={index}>
                            <View style={styles.row}>
                                <Text style={{ color: '#999', lineHeight: 20, }}>商品名：{item.goodsName}</Text>
                                <Text style={{ color: '#999', lineHeight: 20, }}>数量：{item.quantity}</Text>
                            </View>
                            <View style={styles.line}></View>
                            <View style={styles.row}>
                                <Text style={{ color: '#999', lineHeight: 20, }}>包装规格：{item.specifications}</Text>
                                <Text style={{ color: '#999', lineHeight: 20, }}>是否是赠品：{item.isGift != '0' ? '是' : '否'}</Text>
                            </View>
                            <View style={styles.line}></View>
                            <View style={styles.row}>
                                <Text style={{ color: '#999', lineHeight: 20, }}>商品销售单价格：{item.originalAmount}</Text>
                                <Text style={{ color: '#999', lineHeight: 20, }}>积分：{item.score}</Text>
                            </View>
                            <View style={styles.line}></View>
                        </View>
                    }) : <Text>暂无数据</Text>
                }
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 6,
        marginBottom: 10,
    },
    line: {
        borderWidth: 0.2,
        borderColor: '#aaa',
        borderStyle: 'solid',
        marginTop: 5,
        marginBottom: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});