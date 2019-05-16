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
import * as MineAction from 'root/src/actions/testRecord';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const Item = List.Item;

@loadingDecorator
export default class TestRecordDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {
                plantList: []
            },
        }
    }
    componentWillMount() {
        MineAction.GetUse(this.props.id).then((data) => {
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
                    <DetailItem title="检测日期" content={model.examinDay} />
                    <DetailItem title="产品品种" content={model.cropName + '/' + model.breedName} />
                    <DetailItem title="检测方式" content={model.examinTypeDisplay?model.examinTypeDisplay:''} />
                    <DetailItem title="检测机构" content={model.examinUnit?model.examinUnit:'--'} />
                    {/* <DetailItem title="检测标准" content={model.examinStandard?model.examinStandard:'--'} /> */}
                    <DetailItem title="检测人员" content={model.examiner?examiner:'--'} />
                    <DetailItem title="检测结果" content={model.examiningDisplay?model.examiningDisplay:'--'} />
                    <DetailItem title="检测文件" />
                    <View style={{ flexDirection:'row',justifyContent: 'space-around',flexWrap:'wrap', padding: 15,backgroundColor:'white' }}>
                        {
                            model.examinFile ? model.examinFile.map((item, index) => {
                                return  <Image
                                    key={item.url}
                                    source={{ uri:item.url }}
                                    style={styles.imgStyle}
                                />
                            }): 
                        <Image
                            source={require('root/img/nopic.gif')}
                            style={styles.imgStyle}
                        />}
                    </View>
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
        width: 80,
        // 设置高度
        height: 80,
        // 设置图片填充模式
        resizeMode: 'stretch',
        padding:4
    },
});
