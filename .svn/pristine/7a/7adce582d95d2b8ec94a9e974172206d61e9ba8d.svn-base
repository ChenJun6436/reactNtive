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
import { SearchBar, WhiteSpace, WingBlank, List, Button, InputItem, Carousel } from 'antd-mobile-rn';
import Icon from 'react-native-vector-icons/FontAwesome';
import { iconsMap, iconsLoaded } from 'root/src/utils/IconLoader';
import DetailItem from 'root/src/screens/baseComon/DetailItem.js';
import * as DiagnosisAction from 'root/src/actions/diagnosis';
import HotProduct from '../../../baseComon/hotProduct'
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const Item = List.Item;

@loadingDecorator
export default class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {},
        }
    }
    componentWillMount() {
        DiagnosisAction.GetSolutionDetail({ input: { pestName: this.props.pestName, cropName: this.props.cropName } }).then((data) => {
            if (data.data && data.data.length != 0)
                this.setState({ model: data.data })
            else {
                MyToast.info('暂无数据！稍后尝试');
            }
            this.setState({ loading: false })
        })
    }
    render() {
        let model = this.state.model ? this.state.model : {};
        return (
            <ScrollView style={{ backgroundColor: '#f2f2f2', position: 'relative', height: SCREEN_HEIGHT }}>
                <View style={styles.search}>
                    <Image
                        // key={item}
                        source={{ uri: model.imgList[0] }}
                        style={styles.imgStyle}
                    />
                    {/* <Carousel>
                        {
                            model.imgList && model.imgList.length > 0 ? model.imgList.map(item => {
                                return <View>
                                    <Image
                                        key={item}
                                        source={{ uri: item }}
                                        style={styles.imgStyle}
                                    />
                                </View>
                            }) : <Image
                                    source={require('root/img/nopic.gif')}
                                    style={styles.imgStyle}
                                />
                        }
                    </Carousel> */}
                </View>
                <View style={styles.container}>
                    <DetailItem title="作物" content={model.crop} />
                    <DetailItem title="病害" content={model.pest} />
                    <DetailItem title="生长阶段" content='全周期' />
                    <DetailItem title="详细介绍" content={model.introduction} top={8} />
                    <DetailItem title="危害症状" content={model.damageSymptoms} top={8} />
                    <DetailItem title="发病规律" content={model.occurrenceRegularity} top={8} />
                    <DetailItem title="防治" content={model.control} top={8} />
                    {/* <DetailItem title="推荐用药" content={model.} /> */}
                </View>
            </ScrollView >
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