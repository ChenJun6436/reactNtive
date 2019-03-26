// @flow

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Alert,
    TouchableWithoutFeedback
} from 'react-native';
import { List, InputItem, TextareaItem, DatePicker, Picker, ImagePicker, Button, WhiteSpace } from 'antd-mobile-rn';
import * as MineAction from 'root/src/actions/mine';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as MARAction from 'root/src/actions/medicationRecord'
import { bold } from 'ansi-colors';
import moment from 'moment';
import InputWriteSelect from 'root/src/screens/baseComon/InputWriteSelect.js'
import pesticidesStore from 'root/src/stores/pesticides';
import lodash from 'lodash';
import immutable from 'immutable';
// import { runInThisContext } from 'vm';
const { connect } = require('remx');
const Item = List.Item;
@navigatorDecorator
class GoodsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plantList: [
                {
                    pesticide: "",
                    registNumber: "",
                    manufacturer: "",
                    madeTime: new Date(),
                    madeTimeStr: new Date(),
                    source: "",
                    usage: 0,
                    categoryCode: '',
                    categoryName: ''
                }
            ],
        }
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                title: {
                    text: '农药选择'
                },
                rightButtons: [
                    confirmRightBtn
                ]
            }
        });
        Navigation.events().bindComponent(this);
    }
    navigationButtonPressed = () => {
        let nowName = ''
        const ret=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
        this.state.plantList.map((i, index) => {
            if (!i.pesticide) {
                nowName = 'pesticide'
            }
            if (!i.usage) {
                nowName = 'usage'
            } else if (!ret.test(i.usage)) {
                nowName = 'usage'
                MyToast.info('用药量应大于0，且最多两位小数的数字');
            }
        })
        
        if (nowName) {
            MyToast.info('请填写完整的用药组合');
            return false
        } else {
            let plantList = lodash.cloneDeep(this.state.plantList);
            plantList.forEach(i => {
                i.madeTime = moment(i.madeTimeStr).format('YYYY-MM-DD');
            });
            pesticidesStore.setGoodsData(plantList)
            this.pop()
        }
    }
    componentWillMount() {
        const vm = this
        this.iscurrent = this.props.isNow
        let item = this.props.goodsData
        if (item && item.length > 0) {
            let nowList = [];
            item.forEach((i, index) => {
                nowList.push({
                    madeTimeStr: new Date(i.madeTime),
                    pesticide: i.pesticide,
                    registNumber: i.registNumber,
                    manufacturer: i.manufacturer,
                    madeTime: i.madeTime,
                    source: i.source,
                    usage: i.usage,
                    categoryCode: i.categoryCode,
                    categoryName: i.categoryName
                })
            })
            vm.setState({
                plantList: nowList,
            })
        } else {
            this.setState({
                plantList: [
                    {
                        pesticide: "",
                        registNumber: "",
                        manufacturer: "",
                        madeTime: new Date(),
                        madeTimeStr: new Date(),
                        source: "",
                        usage: 0,
                        categoryCode: '',
                        categoryName: ''
                    }
                ],
            })
        }
        MARAction.GetPesticideEffectEnum().then((data) => {
            if (data.suc && data.data) {
                let pesticideType = [];
                if (data.data.pesticideType && data.data.pesticideType.length > 0) {
                    data.data.pesticideType.map(item => {
                        pesticideType.push({
                            value: item.key + '/' + item.value,
                            label: item.value
                        })
                    })
                }
                this.setState({
                    pesticideType: pesticideType,
                })
            }

            else {
                MyToast.info('暂无数据！');
            }
            this.setState({ loading: false })
        })
    }
    changeData(text, index, name) {


        if (!text) {
            switch (name) {
                case 'pesticide':
                    MyToast.info('农药名称不能为空');
                    break;
                case 'usage':
                    MyToast.info('用药量不能为空');
                    break;
                case 'pesticideType':
                    MyToast.info('农药类型不能为空');
                    break;
            }

        } else {
            // let plantList;
            // if (name == 'pesticideType') {
            //     let array = (text + '').split('/');
            //     plantList = immutable.updateIn(this.state.plantList, [index, 'categoryCode'], v => array[0]);
            //     plantList = immutable.updateIn(this.state.plantList, [index, 'categoryName'], v => array[1]);
            // }
            // plantList = immutable.updateIn(this.state.plantList, [index, name], v => text);
            let nowList = this.state.plantList
            let textNew = text;
            if (name == 'pesticideType') {
                let array = (textNew + '').split('/');
                nowList[index]['categoryCode'] = array[0]
                nowList[index]['categoryName'] = array[1]
                nowList[index][name] = textNew
            }
            else {
                nowList[index][name] = textNew
            }
            this.setState({
                plantList: nowList
            })
        }
    }

    onErrorClick = () => {
        MyToast.info('请填写正确的信息，且不能为空');
    }
    getData = (data, index) => {
        let plantList = this.state.plantList;
        plantList.map((item, i) => {
            if (i == index) {
                item.pesticide = data[0].registerName;
                item.registNumber = data[0].registerID;
                item.manufacturer = data[0].manufacturerName
            }
        })
        this.setState({
            plantList
        })
    }
    render() {
        return (
            <ScrollView style={{ backgroundColor: '#f5f5f5' }}>
                {
                    this.state.plantList && this.state.plantList.map((i, index) => {
                        // alert(i.categoryCode)
                        return (
                            <View key={index}>
                                <List>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <Text style={{ lineHeight: 50, fontSize: 18, marginLeft: 15, color: '#000', fontWeight: 'bold' }}>农药（{index + 1}）</Text>
                                        {/* 删除农药列表 */}
                                        {index == 0 ? (null) : (
                                            <TouchableWithoutFeedback onPress={() => {
                                                let nowList = this.state.plantList
                                                nowList.splice(index, 1)
                                                this.setState({
                                                    plantList: nowList
                                                })
                                            }}>
                                                <View>
                                                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#000', lineHeight: 50, marginRight: 15 }}><Icon color='red' name='trash' size={18} /></Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )}
                                    </View>
                                </List>

                                <List>
                                    <InputWriteSelect _name={'农药名称'}
                                        _type='goods'

                                        _value={i.pesticide}
                                        onChange={(text) => {
                                            this.changeData(text, index, 'pesticide')
                                        }}
                                        _selectCrop={() => {
                                            this.pushPage({
                                                component: {
                                                    passProps: { getData: this.getData, index: index },
                                                    ...Global.Screens.PesticidesList
                                                }
                                            })
                                        }} />
                                </List>
                                <List>
                                    <Picker
                                        data={this.state.pesticideType}
                                        cols={1}
                                        onOk={(text) => { this.changeData(text, index, 'pesticideType') }}
                                        value={i.pesticideType}>
                                        <Item arrow="horizontal"><Text style={{ color: 'gray' }}>农药类型</Text></Item>
                                    </Picker>
                                </List>
                                <List>
                                    <InputItem
                                        textAlign="right"
                                        clear
                                        onChange={(text) => {
                                            this.changeData(text, index, 'registNumber')
                                        }}
                                        onErrorClick={this.onErrorClick}
                                        maxLength={20}
                                        placeholder="登记证号"
                                        value={i.registNumber}
                                    >登记证号
                                    </InputItem>
                                </List>
                                <List>
                                    <InputItem
                                        textAlign="right"
                                        clear
                                        onChange={(text) => {
                                            this.changeData(text, index, 'manufacturer')
                                        }}
                                        onErrorClick={this.onErrorClick}
                                        maxLength={20}
                                        placeholder="生产企业"
                                        value={i.manufacturer}
                                    >生产企业
                                    </InputItem>
                                </List>
                                <List>
                                    <DatePicker
                                        value={i.madeTimeStr}
                                        mode="date"
                                        minDate={new Date('2010-01-01')}
                                        onChange={(text) => {
                                            this.changeData(text, index, 'madeTimeStr')
                                        }}
                                        format="YYYY-MM-DD"
                                    >
                                        <Item arrow="horizontal" >批号/生产日期</Item>
                                    </DatePicker>
                                </List>
                                <List>
                                    <InputItem
                                        textAlign="right"
                                        clear
                                        onChange={(text) => {
                                            this.changeData(text, index, 'source')
                                        }}

                                        onErrorClick={this.onErrorClick}
                                        maxLength={20}
                                        placeholder="农药来源"
                                        value={i.source}
                                    >农药来源
                                    </InputItem>
                                </List>
                                <List>
                                    <InputItem
                                        labelNumber={9}
                                        type='number'
                                        textAlign="right"
                                        clear
                                        onChange={(text) => {
                                            this.changeData(text, index, 'usage')
                                        }}
                                        placeholder="用药量"
                                        value={i.usage}
                                        extra="亩"
                                    >用药量
                                    </InputItem>
                                </List>
                                <WhiteSpace size="sm" />
                            </View>
                        )
                    })
                }
                <TouchableWithoutFeedback onPress={() => {
                    let nowList = this.state.plantList
                    nowList.push(
                        {
                            plantName: '',
                            area: '',
                            period: '',
                            year: new Date(),
                            outPut: '',
                            iscurrent: this.props.isNow,
                            unit: "亩",
                            usage: 0,
                        }
                    )
                    this.setState({
                        plantList: nowList,
                    })
                }}>
                    <View>
                        <Text style={{ textAlign: 'center', fontSize: 18, color: '#000', lineHeight: 50 }}><Icon name='plus-circle' size={18} />添加</Text>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
}
function mapStateToProps() {
    return {
        pesticidesData: pesticidesStore.getPesticidesData(),
        goodsData: pesticidesStore.getGoodsData()
    };
}

module.exports = connect(mapStateToProps)(GoodsPage);
const styles = StyleSheet.create({
    // userInfo: store.getAccount()
});
