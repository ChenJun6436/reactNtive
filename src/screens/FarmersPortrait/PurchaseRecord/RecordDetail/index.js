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
import { SearchBar, WhiteSpace, WingBlank, List, Button, InputItem } from 'antd-mobile-rn';
import * as PortraitAction from 'root/src/actions/farmersPortrait';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const Item = List.Item;
@loadingDecorator @navigatorDecorator
export default class RecordDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: null,
            isDisplay: false,
        }
    }
    componentWillMount() {
        this.query();
    }
    send = (item) => {
        this.pushPage({
            component: {
                passProps: { data: item, orderId: this.props.id, refresh: this.query },
                ...Global.Screens.GoodsEvaluate
            }
        });
    }
    query = () => {
        PortraitAction.getMemberOrderDetail({ input: { orderId: this.props.id } }).then((data) => {
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
            <ScrollView style={styles.container}>
                {
                    this.state.model && this.state.model.length > 0 ? this.state.model.map((item, index) => {
                        return <View>
                            <View style={styles.main} key={index}>
                                <View style={styles.row}>
                                    <Text style={{ color: 'gray', lineHeight: 28, }}>商品名：{item.goodsName}</Text>
                                    <Text style={{ color: 'gray', lineHeight: 28, }}>数量：{item.quantity}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={{ color: 'gray', lineHeight: 28, }}>包装规格：{item.specifications}</Text>
                                    <Text style={{ color: 'gray', lineHeight: 28, }}>是否是赠品：{item.isGift != '0' ? '是' : '否'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={{ color: 'gray', lineHeight: 28, }}>商品销售单价格：{item.originalAmount}</Text>
                                    <Text style={{ color: 'gray', lineHeight: 28, }}>积分：{item.score}</Text>
                                </View>
                                <View>
                                    <Text style={{ color: 'gray', lineHeight: 28, }}>评论：{item.evaluate}</Text>
                                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                        {item.attachments && item.attachments.length > 0 ? item.attachments.map(opt => {
                                            return <Image
                                                source={{ uri: ImgUrl + opt }}
                                                style={{ width: '32%', height: 70, borderRadius: 5 }}
                                            />
                                        }) : null}
                                    </View>

                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Button onClick={() => this.send(item)} style={{ height: 40, width: 80 }} disabled={item.evaluate ? true : false}>评论</Button>
                                </View>
                            </View>
                        </View>
                    }) : <Text>暂无数据</Text>
                }
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT,
    },
    main: {
        paddingHorizontal: 13,
        paddingVertical: 8,
        borderWidth: 0.3,
        borderColor: '#eee',
        borderStyle: 'solid',
        borderRadius: 5,
        marginBottom: 5
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});