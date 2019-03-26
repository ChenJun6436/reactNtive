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
import * as PestImageAction from 'root/src/actions/pestImage';
import CropStore from 'root/src/stores/crop';
import BrTagText from 'root/src/screens/baseComon/BrTagText'
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const Item = List.Item;

@loadingDecorator @navigatorDecorator
export default class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {},
            myUpload: [],
        }
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                rightButtons: [{
                    ...confirmRightBtn, text: '上传图片'
                }]
            }
        });
        Navigation.events().bindComponent(this);

    }
    navigationButtonPressed({ buttonId }) {
        this.pushPage({
            component: {
                ...Global.Screens.ERPUploadImage,
                passProps: { pestId: this.state.model.id, pestList: [this.state.model.pest], crop: this.state.model.crop, refresh: this.query }
            }
        });

    }
    componentWillMount() {
        this.query();
    }
    query = () => {
        DiagnosisAction.GetSolutionDetail({ input: { pestName: this.props.pestName, cropName: this.props.cropName } }).then((data) => {
            if (data.data && data.data.length != 0) {
                this.setState({ model: data.data })
                PestImageAction.GetPestImageByPest({ input: { pestId: data.data.id } }).then((suc) => {
                    if (suc && suc.data && suc.data.length != 0)
                        this.setState({ myUpload: suc.data })
                    else {
                        // MyToast.info('暂无图片数据');
                    }
                    this.setState({ loading: false })
                })
            }
            else {
                MyToast.info('暂无数据！稍后尝试');
            }
            this.setState({ loading: false })
        })
    }
    render() {
        let model = this.state.model ? this.state.model : {};
        let myUpload = this.state.myUpload ? this.state.myUpload : []
        return (
            <ScrollView style={{ position: 'relative', height: SCREEN_HEIGHT }}>
                <View style={styles.search}>
                    <Carousel>
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
                    </Carousel>
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
                <BrTagText color='red' title='我上传的图片' />
                {
                    myUpload && myUpload.length > 0 ? myUpload.map((item, index) => {
                        return <View style={{ width: '100%' }}>
                            {
                                item.imageUrl ? <Image key={index} source={{ uri: ImgUrl + item.imageUrl }} style={styles.imgStyle} /> : <Image source={require('root/img/nopic.gif')} style={styles.imgStyle} />
                            }
                            <DetailItem title="时间" content={item.takePicMonth} />
                            <DetailItem title="地点" content={item.takePicAddress} />
                            <DetailItem title="天气" content={item.takePicWaether} />
                            <DetailItem title="温度" content={item.temperature} />
                            <DetailItem title="湿度" content={item.humiDity} />
                            <DetailItem title="土壤" content={item.groundName} />
                            <DetailItem title="审核状态" content={item.stateDisplay} />
                        </View>
                    }) : <View style={{ marginHorizontal: 13 }}><Text>暂无数据</Text></View>
                }
            </ScrollView >
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
});