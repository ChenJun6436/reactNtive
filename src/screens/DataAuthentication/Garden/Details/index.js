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
import * as MineAction from 'root/src/actions/garden';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const Item = List.Item;

@loadingDecorator
export default class GardenDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {
                plantList: []
            },
        }
    }
    componentWillMount() {
        MineAction.GetGarden(this.props.id).then((data) => {
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
                    <DetailItem title="园区名称" content={model.name} />
                    <DetailItem title="基地名称" content={model.enterpriseName} />
                    <DetailItem title="面积" content={model.area+'（亩）'} />
                    <DetailItem title="土壤类型" content={model.soilStr} />
                    <DetailItem title="海拔高度" content={model.altitude+'（米）'} />
                    <DetailItem title="坡度" content={model.slope+'（度）'} />
                    <DetailItem title="土壤厚度" content={model.soilThickness+'（米）'} />
                    <DetailItem title="地下水位" content={model.groundWater+'（米）'} />
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