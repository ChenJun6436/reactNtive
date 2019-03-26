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
import * as MineAction from 'root/src/actions/intRecord';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const Item = List.Item;

@loadingDecorator
export default class IntBuyRecordDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {
                plantList: []
            },
        }
    }
    componentWillMount() {
        MineAction.GetBuy(this.props.id).then((data) => {
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
                    <DetailItem title="购买时间" content={model.buyDateStr} />
                    <DetailItem title="类型" content={model.investmentTypeStr} />
                    <DetailItem title="登记证号" content={model.registerNumber} />
                    <DetailItem title="名称" content={model.investmentName} />
                    <DetailItem title="规格包装" content={model.spec + '' + model.specUnit + '/' + model.packUnit} />
                    <DetailItem title="购买数量" content={model.quantity} />
                    <DetailItem title="生产企业" content={model.manufacturer} />
                    <DetailItem title="经销企业" content={model.saleUnity} />
                    <DetailItem title="到期时间" content={model.expirationDay} />
                    <DetailItem title="备注" content={model.remark} />
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