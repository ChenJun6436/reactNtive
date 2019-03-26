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
import { SearchBar, WhiteSpace, WingBlank, List, Button } from 'antd-mobile-rn';
import Icon from 'react-native-vector-icons/FontAwesome';
import { iconsMap, iconsLoaded } from 'root/src/utils/IconLoader';
import DetailItem from 'root/src/screens/baseComon/DetailItem.js';
import * as MARAction from 'root/src/actions/medicationRecord'
import HotProduct from 'root/src/screens/baseComon/hotProduct'
import BrTagText from 'root/src/screens/baseComon/BrTagText'
import ListItem from 'root/src/screens/baseComon/ListItem'
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const Item = List.Item;

@loadingDecorator
export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {},
        }
    }
    componentWillMount() {
        MARAction.GetDetail({ id: this.props.id }).then((data) => {
            if (data.suc && data.data && data.data.length != 0)
                this.setState({
                    model: data.data,
                    list: data.dataExtend
                })
            else {
                MyToast.info('暂无数据！稍后尝试');
            }
            this.setState({ loading: false })
        })
    }

    render() {
        let model = this.state.model ? this.state.model : {};
        return (
            <ScrollView style={{ position: 'relative', height: SCREEN_HEIGHT }}>
                <View style={styles.container}>
                    <DetailItem title="单位名称" gray content={model.unitName ? model.unitName : '--'} />
                    <DetailItem title="防治日期" content={model.preventTime ? model.preventTime : '--'} />
                    <DetailItem title="防治地点" gray content={model.preventAddress ? model.preventAddress : '--'} />
                    {/* <DetailItem title="作物名称" content={model.crop ? model.crop : '--'} />
                    <DetailItem title="病害名称" gray content={model.pest ? model.pest : '--'} /> */}
                    <DetailItem title="施药方式" content={model.usageWay ? model.usageWay : '--'} />
                    <DetailItem title="施药面积（亩）" gray content={model.area ? model.area : '--'} />
                    <DetailItem title="安全间隔期（天）" content={model.safeDays ? model.safeDays : '--'} />
                    <DetailItem title="防治效果" gray content={model.effects ? model.effects : '--'} />
                    <DetailItem title="安全性评价" content={model.safeComment ? model.safeComment : '--'} />
                    <DetailItem title="农药包装废弃物回收情况" gray content={model.isRecycled ? '是' : '否'} />
                </View>
                <View>
                    <BrTagText color='green' title='作物信息' />
                    {
                        model.crops && model.crops.length > 0 ? model.crops.map(item => {
                            return <View key={item.pesticide} style={styles.pesticide}>
                                <DetailItem title="作物名称" content={item.crop ? item.crop : '--'} />
                                <DetailItem title="作物品种" content={item.cropType ? item.cropType : '--'} />
                                <DetailItem title="病虫害" content={item.pest ? item.pest : '--'} />
                            </View>
                        }) : <Text>暂无作物信息</Text>
                    }
                </View>
                <Spacing />
                <View>
                    <BrTagText color='red' title='用药组合' />
                    {
                        model.pesticides && model.pesticides.length > 0 ? model.pesticides.map(item => {
                            return <View key={item.pesticide} style={styles.pesticide}>
                                <DetailItem title="农药名称" content={item.pesticide ? item.pesticide : '--'} />
                                <DetailItem title="登记证号" content={item.registNumber ? item.registNumber : '--'} />
                                <DetailItem title="生产企业" content={item.manufacturer ? item.manufacturer : '--'} />
                                <DetailItem title="批号/生产日期" content={item.madeTime ? item.madeTime : '--'} />
                                <DetailItem title="农药来源" content={item.source ? item.source : '--'} />
                                <DetailItem title="用药量（亩）" content={item.usage ? item.usage : '--'} />
                            </View>
                        }) : <Text>暂无用药组合</Text>
                    }
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
    imgStyle: {
        // 设置宽度
        width: Dimensions.get('window').width,
        // 设置高度
        height: 180,
        // 设置图片填充模式
        resizeMode: 'stretch'
    },
    pesticide: {
        backgroundColor: '#f5f5f5',
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowColor: '#000',
        elevation: 3,
        marginBottom: 5,
    }
});