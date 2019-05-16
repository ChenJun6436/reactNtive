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
import * as MineAction from 'root/src/actions/cure';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const Item = List.Item;

@loadingDecorator
export default class CureDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {
                plantList: []
            },
        }
    }
    componentWillMount() {
        let input ={
            cropName: this.props.cropName,
            year:this.props.year
        }
        MineAction.GetDetail(input).then((data) => {
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
                    <DetailItem title="作物名" content={model.cropName?model.cropName:'--'} />
                    <DetailItem title="时间" content={model.year ? model.year : '--'} />
                    {
                        model.items?model.items.map((i, ind) => {
                            return (
                                <View key={ind}>
                                    <DetailItem color={'#49a9ee'} title={'物理防治（' + (ind + 1) + '）'} />
                                    <DetailItem title="防治类型" content={i.preventionName?i.preventionName:'--'} />
                                    <DetailItem title="防治面积" content={i.area?i.area +'亩':'--'} />
                                    <DetailItem title="防治费用" content={i.cost ? i.cost +'元':'--'} />
                                </View>
                            )
                        }):null
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