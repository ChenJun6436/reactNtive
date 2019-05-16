// @flow

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Alert,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';
import { List, InputItem, TextareaItem, DatePicker, Picker, Button, WhiteSpace, Flex } from 'antd-mobile-rn';
import * as MineAction from 'root/src/actions/workRecord';
import * as GardenAction from 'root/src/actions/garden';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bold } from 'ansi-colors';
import moment from 'moment';
const { connect } = require('remx');
const Item = List.Item;

@navigatorDecorator
class TestRecordAdd extends Component {
    constructor(props) {
        super(props);
        this.loading = false
        this.state = {
            workDay: new Date(),
            remark: '',
            // plantBaseId: '',
            // plantBaseLandId: '',
            plantGardenId: [],
            // workCost: '',
            // workDays:'',
            workContentId: [],
            cropId: '',
            breedId: '',

            baseList: [],
            landList: [],
            gardenList: [],
            workContentList: [],
            gardenCropList: [],
            gardenCropState: [],
            plantBaseId: [],
            plantBaseLandId: [],
        }
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                title: {
                    text: this.props.id ? '编辑用工' : '新增用工'
                },
                rightButtons: [
                    confirmRightBtn
                ]
            }
        });
        Navigation.events().bindComponent(this);
    }
    navigationButtonPressed() {
        if (this.loading) {
            return false
        }
        const ret = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
        if (!this.state.plantBaseId[0]) {
            MyToast.info('基地不能为空')
            return false
        } else if (!this.state.plantBaseLandId[0]) {
            MyToast.info('区块不能为空')
            return false
        } else if (!this.state.gardenCropState[0]) {
            MyToast.info('产品不能为空')
            return false
        } else if (!this.state.workContentId[0]) {
            MyToast.info('劳作内容不能为空')
            return false
        } else if (!this.state.workDays) {
            MyToast.info('用工数量不能为空')
            return false
        } else if (!this.state.workCost) {
            MyToast.info('成本不能为空')
            return false
        } else if (!ret.test(this.state.workDays)) {
            MyToast.info('用工数量应大于0，且最多两位小数的数字');
            return false
        } else if (!ret.test(this.state.workCost)) {
            MyToast.info('成本应大于0，且最多两位小数的数字');
            return false
        }
        let input = {
            workDay: moment(this.state.workDay).format('YYYY-MM-DD'),
            plantBaseId: this.state.plantBaseId[0],
            plantBaseLandId: this.state.plantBaseLandId[0],
            plantGardenId: this.state.plantGardenId[0],
            cropId: this.state.gardenCropState[0].split('*')[0],
            breedId: this.state.gardenCropState[1].split('*')[0],
            workContentId: this.state.workContentId[0].split('*')[0],
            workDays: this.state.workDays,
            workCost: this.state.workCost,
            remark: this.state.remark,
            id: this.props.id ? this.props.id : null
        }
        this.loading = true
        if (this.props.id) {
            MineAction.EditUse({ input }).then((data) => {
                if (data.suc) {
                    MyToast.success('编辑成功');
                    setTimeout(() => {
                        this.pop();
                        this.props.refresh && this.props.refresh()
                    }, 2000)
                } else {
                    this.loading = false
                    MyToast.info(data.msg)
                }
            })
        } else {
            MineAction.AddUse({ input }).then((data) => {
                if (data.suc) {
                    MyToast.success('新增成功');
                    setTimeout(() => {
                        this.pop();
                        this.props.refresh && this.props.refresh()
                    }, 2000)
                } else {
                    this.loading = false
                    MyToast.info(data.msg)
                }
            })
        }
    }
    componentWillMount() {
        this.GetAllBase()
        
        //获取所有园区
        GardenAction.GetAllGarden().then((data) => {
            if (data.suc) {
                let model = data.data
                let arrInt = []
                model.forEach((i, index) => {
                    arrInt[index] = {}
                    arrInt[index].label = i.name + ''
                    arrInt[index].value = i.id + ''
                });
                this.setState({
                    gardenList: arrInt,
                })
            } else {
                MyToast.info('数据获取失败，稍后尝试');
            }
        })

        //编辑页面
        if (this.props.id) {
            MineAction.GetUse(this.props.id).then((data) => {
                if (data.suc) {
                    this.setState({
                        model: data.data,
                        loading: false,
                        workDay: new Date(data.data.workDay),
                        plantBaseId: [data.data.plantBaseId + ''],
                        plantBaseLandId: [data.data.plantBaseLandId + ''],
                        plantGardenId: [data.data.plantGardenId + ''],
                        cropId: data.data.cropId,
                        breedId: data.data.breedId,
                        gardenCropState: [data.data.cropId+'*'+data.data.cropName, data.data.breedId+'*'+data.data.breedName],
                        workContentId: [data.data.workContentId + '*' + data.data.workContentName],
                        workDays: data.data.workDays + '',
                        workCost: data.data.workCost + '',
                        remark: data.data.remark,
                    }, () => {
                        this.getProduct(data.data.plantBaseLandId,data.data.plantBaseId)
                        this.GetAllLand(data.data.plantBaseId)
                        this.getworkContent(data.data.cropName)
                    })
                } else {
                    MyToast.info('数据获取失败，稍后尝试');
                }
            })
        }
    }
    GetAllBase () {
        //获取所有基地
        GardenAction.GetAllBase().then((data) => {
            if (data.suc) {
                let model = data.data
                let arrInt = []
                model.forEach((i, index) => {
                    arrInt[index] = {}
                    arrInt[index].label = i.name + ''
                    arrInt[index].value = i.id + ''
                });
                this.setState({
                    baseList: arrInt,
                })
            } else {
                MyToast.info('数据获取失败，稍后尝试');
            }
        })
    }
    //获取所有区块
    GetAllLand(id) {
        GardenAction.GetAllLand(id).then((data) => {
            if (data.suc) {
                let model = data.data
                let arrInt = []
                model.forEach((i, index) => {
                    arrInt[index] = {}
                    arrInt[index].label = i.landName + ''
                    arrInt[index].value = i.id + ''
                });
                this.setState({
                    landList: arrInt,
                })
            } else {
                MyToast.info('数据获取失败，稍后尝试');
            }
        })
    }
    //获取产品
    getProduct(val,baseId) {
        let input = {
            plantBaseId: baseId?baseId:this.state.plantBaseId[0] + '',
            plantBaseLandId: val,
        }
        GardenAction.GetAllCrop(input).then((data) => {
            if (data.suc) {
                let model = data.data
                model.forEach((i, index) => {
                    i.value = i.value + '*' + i.label
                    i.children.forEach((o, ind) => {
                        o.value = o.value + '*' + o.label
                    })
                });
                this.setState({
                    gardenCropList: model,
                })
            } else {
                MyToast.info('作物获取失败，稍后尝试');
            }
        })
    }

    //获取劳作内容
    getworkContent(input) {
        GardenAction.GetAllWorkContent(input).then((data) => {
            if (data.suc) {
                let model = data.data
                let arrInt = []
                model.forEach((i, index) => {
                    arrInt[index] = {}
                    arrInt[index].label = i.opName + ''
                    arrInt[index].value = i.id + '*' + i.opName
                });
                this.setState({
                    workContentList: arrInt,
                })
            } else {
                MyToast.info('数据获取失败，稍后尝试');
            }
        })
    }
    onErrorClick = () => {
        MyToast.info('请填写正确的信息，且不能为空');
    }
    render() {
        return (
            <ScrollView style={{ backgroundColor: '#f5f5f5' }}>
                <View>
                    <List>
                        <DatePicker
                            value={this.state.workDay}
                            mode="date"
                            minDate={new Date('2018-01-01')}
                            onChange={(text) => {
                                this.setState({
                                    workDay: text
                                })
                            }}
                            format="YYYY-MM-DD"
                        >
                            <Item arrow="horizontal" >日期</Item>
                        </DatePicker>
                    </List>
                    < List >

                        <Flex>
                            <Flex.Item style={{ flex: 9 }}>
                                <Picker
                                    registerNumber="基地"
                                    data={this.state.baseList}
                                    cols={1}
                                    value={this.state.plantBaseId}
                                    onOk={(val) => {
                                        this.setState({ plantBaseId: val })
                                        this.GetAllLand(val[0])
                                    }}
                                    style={{ color: '#000' }}
                                >
                                    <Item><Text style={{ fontSize: 17, color: '#000' }}>基地</Text></Item>
                                </Picker>
                            </Flex.Item>
                            <Flex.Item>
                                <TouchableOpacity onPress={() => {
                                    this.pushPage({
                                        component: {
                                            ...Global.Screens.AddBase,
                                            passProps: { callback:()=>{ this.GetAllBase() }},
                                        }
                                    });
                                }}>
                                    <Text style={{ marginTop: 5, marginLeft: 5, fontSize: 13, lineHeight: 20, color: '#1b926c' }}>
                                        <Icon name='plus-square' size={30} style={{ lineHeight: 45 }} />
                                    </Text>
                                </TouchableOpacity>
                            </Flex.Item>
                        </Flex>
                    </List>
                    {this.state.plantBaseId.length > 0 ? (
                        <List>

                            <Flex>
                                <Flex.Item style={{ flex: 9 }}>
                                    <Picker
                                        registerNumber="区块"
                                        data={this.state.landList}
                                        cols={1}
                                        value={this.state.plantBaseLandId}
                                        onOk={(val) => {
                                            this.setState({ plantBaseLandId: val })
                                            this.getProduct(val[0])
                                        }}
                                        style={{ color: '#000' }}
                                    >
                                        <Item><Text style={{ fontSize: 17, color: '#000' }}>区块</Text></Item>
                                    </Picker>
                                </Flex.Item>
                                <Flex.Item>
                                    <TouchableOpacity onPress={() => {
                                        this.pushPage({
                                            component: {
                                                ...Global.Screens.LandManageGardenAdd,
                                                passProps: {
                                                    baseId: this.state.baseState[0],
                                                    callback: (id) => { this.GetAllLand(id) }
                                                },

                                            }
                                        });
                                    }}>
                                        <Text style={{ marginTop: 5, marginLeft: 5, fontSize: 13, lineHeight: 20, color: '#1b926c' }}>
                                            <Icon name='plus-square' size={30} style={{ lineHeight: 45 }} />
                                        </Text>
                                    </TouchableOpacity>
                                </Flex.Item>
                            </Flex>
                        </List>
                    ) : (null)}
                    <List>
                        <Picker
                            registerNumber="园址"
                            data={this.state.gardenList}
                            cols={1}
                            value={this.state.plantGardenId}
                            onOk={
                                (val) => {
                                    this.setState({ plantGardenId: val })
                                }
                            }
                            style={{ color: '#000' }}
                        >
                            <Item><Text style={{ fontSize: 17, color: '#000' }}>标准园</Text></Item>
                        </Picker>
                    </List>
                    {
                        this.state.plantBaseLandId[0] ? (
                            <List>
                                <Picker
                                    registerNumber="作物"
                                    data={this.state.gardenCropList}
                                    cols={2}
                                    value={this.state.gardenCropState}
                                    onOk={
                                        (val) => {
                                            this.setState({ gardenCropState: val })
                                            this.getworkContent(val[0].split('*')[1])
                                        }
                                    }
                                    style={{ color: '#000' }}
                                >
                                    <Item><Text style={{ fontSize: 17, color: '#000' }}>作物</Text></Item>
                                </Picker>
                                {this.state.gardenCropState ? <Picker
                                    registerNumber="劳作"
                                    data={this.state.workContentList}
                                    cols={1}
                                    value={this.state.workContentId}
                                    onOk={
                                        (val) => {
                                            this.setState({ workContentId: val })
                                        }
                                    }
                                    style={{ color: '#000' }}
                                >
                                    <Item><Text style={{ fontSize: 17, color: '#000' }}>劳作内容</Text></Item>
                                </Picker> : null}
                            </List>
                        ) : (null)
                    }
                    <List>
                        <InputItem
                            type='number'
                            textAlign="right"
                            clear
                            labelNumber={7}
                            onChangeText={(text) => {
                                this.setState({
                                    workDays: text
                                }, () => {
                                    if (!this.state.workDays) {
                                        this.setState({
                                            workDaysError: true
                                        })
                                    } else {
                                        this.setState({
                                            workDaysError: false
                                        })
                                    }
                                })
                            }}
                            error={this.state.workDaysError}
                            onErrorClick={this.onErrorClick}
                            maxLength={50}
                            placeholder="用工数量"
                            value={this.state.workDays}
                        >用工数量(人/天)
                        </InputItem>
                    </List>
                    <List>
                        <InputItem
                            type='number'
                            textAlign="right"
                            clear
                            onChangeText={(text) => {
                                this.setState({
                                    workCost: text
                                }, () => {
                                    if (!this.state.workCost) {
                                        this.setState({
                                            workCostError: true
                                        })
                                    } else {
                                        this.setState({
                                            workCostError: false
                                        })
                                    }
                                })
                            }}
                            error={this.state.workCostError}
                            onErrorClick={this.onErrorClick}
                            maxLength={50}
                            placeholder="成本"
                            value={this.state.workCost}
                        >成本(元)
                        </InputItem>
                    </List>
                    <List>
                        <InputItem
                            textAlign="right"
                            clear
                            onChangeText={(text) => {
                                this.setState({
                                    remark: text
                                }, () => {
                                    if (!this.state.remark) {
                                        this.setState({
                                            remarkError: true
                                        })
                                    } else {
                                        this.setState({
                                            remarkError: false
                                        })
                                    }
                                })
                            }}
                            error={this.state.remarkError}
                            onErrorClick={this.onErrorClick}
                            maxLength={50}
                            placeholder="备注"
                            value={this.state.remark}
                        >备注
                        </InputItem>
                    </List>

                </View>
            </ScrollView>
        );
    }
}
function mapStateToProps() {
    return {

    };
}

module.exports = connect(mapStateToProps)(TestRecordAdd);
const styles = StyleSheet.create({
    // userInfo: store.getAccount()
});
