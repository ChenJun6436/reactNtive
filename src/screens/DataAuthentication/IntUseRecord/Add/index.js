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
import { List, InputItem, TextareaItem, DatePicker, Picker, ImagePicker, Button, WhiteSpace, Flex } from 'antd-mobile-rn';
import * as MineAction from 'root/src/actions/intRecord';
import * as GardenAction from 'root/src/actions/garden';
import * as ProAction from 'root/src/actions/product';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bold } from 'ansi-colors';
import moment from 'moment';
const { connect } = require('remx');
const Item = List.Item;
let initData = {
    plantName: '',
    area: '',
    period: '',
    year: new Date(),
    outPut: '',
    iscurrent: true,
    unit: "亩"
}
let initError = {
    plantName: false,
    area: false,
    period: false,
}
let model = null
@navigatorDecorator
class IntUseRecordAdd extends Component {
    constructor(props) {
        super(props);
        this.loading = false
        this.state = {
            intState: [],
            intName: '',
            cropState: [],
            IntList: [],
            CropList: [],
            quantity: '',
            remark: '',
            expirationDay: new Date(),
            landList: [],
            landState: '',
            baseList: [],
            baseState: '',
            peopleList: [],
            peopleState: ''

        }
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                title: {
                    text: this.props.id ? '编辑投入品使用' : '新增投入品使用'
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
        let nowName = false
        let nowError = this.state.plantError
        const ret = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
        if (!this.state.baseState[0]) {
            nowName = true
            MyToast.info('请选择基地');
        } else if (!this.state.landState[0]) {
            nowName = true
            MyToast.info('请选择区块');
        } else if (!this.state.peopleState[0]) {
            nowName = true
            MyToast.info('请选择使用人');
        } else if (!this.state.intState[0]) {
            nowName = true
            MyToast.info('请选择投入品');
        } else if (!this.state.cropState[0]) {
            nowName = true
            MyToast.info('请选择作物');
        } else if (!this.state.quantity) {
            nowName = true
            MyToast.info('请填写使用数量');
        } else if (!ret.test(this.state.quantity)) {
            nowName = true
            MyToast.info('使用数量应大于0，且最多两位小数的数字');
        }
        if (nowName) {
            return false
        } else {
            let expirationDay = moment(this.state.expirationDay).format('YYYY-MM-DD');
            let postData = {
                gardenLandCropId: this.state.cropState[0].split('*')[1],
                investmentPurchaseId: this.state.intState[0],
                quantity: this.state.quantity,
                remark: this.state.remark,
                useDate: expirationDay,
                plantBaseId: this.state.baseState[0],
                plantBaseLandId: this.state.landState[0],
                userName: this.state.peopleState[0]
            }
            this.loading = true
            if (this.props.id) {
                postData.id = this.props.id
                MineAction.EditUse({ input: postData }).then((data) => {
                    if (data.suc == 1) {
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
                MineAction.AddUse({ input: postData }).then((data) => {
                    if (data.suc == 1) {
                        MyToast.success('新增成功');
                        initData = {
                            gardenLandCropId: '',
                            investmentPurchaseId: '',
                            quantity: '',
                            remark: '',
                        }
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
    }
    componentWillUpdate(prev, next) {
        //编辑的时候 有intName 并且IntList接口请求到数据
        if (next.intName && next.IntList && next.IntList.length > 0) {
            let IntList = next.IntList
            let arr = []
            IntList.forEach((i) => {
                arr.push(i.label)
            })
            //判断是否拥有这个
            if (arr.indexOf(next.intName) < 0) {
                IntList.push({
                    label: next.intName,
                    value: next.intState[0]
                })
                this.setState({
                    IntList
                })
            }
        }
    }
    componentWillMount() {
        //获取所有作物
        let input = {
            plantBaseId: '',
            plantBaseLandId: '',
        }
        MineAction.GetAllCrop({ input }).then((data) => {
            if (data.suc) {
                let model = data.data
                model.forEach((i, index) => {
                    i.value = i.value + '*' + i.id
                });
                this.setState({
                    CropList: model,
                })
            } else {
                MyToast.info('作物获取失败，稍后尝试');
            }
        })
        this.GetAllInt()

        this.GetAllBase()

        this.GetAllPeople()
       
        //判断是否是编辑
        if (this.props.id) {
            MineAction.GetUse(this.props.id).then((data) => {
                if (data.suc) {
                    let model = data.data
                    this.setState({
                        intState: [model.investmentPurchaseId + ''],
                        cropState: [model.cropId + '*' + model.gardenLandCropId + '', model.breedId],
                        quantity: model.quantity + '',
                        remark: model.remark,
                        intName: model.investmentName,
                        expirationDay: new Date(model.useDate),
                        baseState: [model.plantBaseId + ''],
                        landState: [model.plantBaseLandId + ''],
                        peopleState: [model.userName + ''],
                    })
                    this.GetAllLand(model.plantBaseId, model.plantBaseLandId)
                } else {
                    MyToast.info('数据获取失败，稍后尝试');
                }
            })
        }
    }
    GetAllBase() {
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
                MyToast.info('基地获取失败，稍后尝试');
            }
        })
    }
    GetAllInt() {
        //获取所有投入品
        MineAction.GetAllInt().then((data) => {
            if (data.suc) {
                let model = data.data
                let arrInt = []
                model.forEach((i, index) => {
                    arrInt[index] = {}
                    arrInt[index].label = i.investmentName
                    arrInt[index].value = i.id
                });
                this.setState({
                    IntList: arrInt,
                })
            } else {
                MyToast.info('投入品获取失败，稍后尝试');
            }
        })
    }
    GetAllLand(id, edit) {
        let landState = ''
        if (edit) {
            landState = edit
        }
        this.setState({
            landList: [],
            landState,
        })
        //获取所有区块
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
                MyToast.info('区块获取失败，稍后尝试');
            }
        })
    }
    GetAllPeople() {
         //获取所有工人
         ProAction.GetAllPeople(1).then((data) => {
            if (data.suc) {
                if (data.data.length < 1) {
                    return false
                }
                let model = data.data
                let arrInt = []
                model.forEach((i, index) => {
                    arrInt[index] = {}
                    arrInt[index].label = i.name
                    arrInt[index].value = i.name
                });
                this.setState({
                    peopleList: arrInt,
                })
            } else {
                MyToast.info('客户获取失败，稍后尝试');
            }
        })
    }
    changeData(text, name) {
        let nowList = this.state.plantList
        let nowError = this.state.plantError
        let textNew = text
        if (text[0] == '-' && text.length > 1) {
            textNew = ''
        }
    }
    onErrorClick = () => {
        MyToast.info('请填写正确的信息，且不能为空');
    }
    render() {
        return (
            <ScrollView style={{ backgroundColor: '#f5f5f5' }}>
                <View>
                    <List>

                        <Flex>
                            <Flex.Item style={{ flex: 9 }}>
                                <Picker
                                    registerNumber="基地"
                                    data={this.state.baseList}
                                    cols={1}
                                    value={this.state.baseState}
                                    onOk={(val) => {
                                        this.setState({ baseState: val })
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
                                            passProps: { callback: () => { this.GetAllBase() } },
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
                    {this.state.baseState || this.props.id ? (
                        <List>

                            <Flex>
                                <Flex.Item style={{ flex: 9 }}>
                                    <Picker
                                        registerNumber="区块"
                                        data={this.state.landList}
                                        cols={1}
                                        value={this.state.landState}
                                        onOk={(val) => {
                                            this.setState({ landState: val })
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
                        <Flex>
                            <Flex.Item style={{ flex: 9 }}>
                                <Picker
                                    registerNumber="使用人"
                                    data={this.state.peopleList}
                                    cols={1}
                                    value={this.state.peopleState}
                                    onOk={(val) => {
                                        this.setState({ peopleState: val })
                                    }}
                                    style={{ color: '#000' }}
                                >
                                    <Item><Text style={{ fontSize: 17, color: '#000' }}>使用人</Text></Item>
                                </Picker>
                            </Flex.Item>
                            <Flex.Item>
                                <TouchableOpacity onPress={() => {
                                    this.pushPage({
                                        component: {
                                            ...Global.Screens.StaffAdd,
                                            passProps: { callback: () => { this.GetAllPeople() } },
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
                    <List>
                        <Flex>
                            <Flex.Item style={{ flex: 9 }}>
                                <Picker
                                    registerNumber="投入品"
                                    data={this.state.IntList}
                                    cols={1}
                                    value={this.state.intState}
                                    onOk={(val) => this.setState({ intState: val })}
                                    style={{ color: '#000' }}
                                >
                                    <Item><Text style={{ fontSize: 17, color: '#000' }}>投入品</Text></Item>
                                </Picker>
                            </Flex.Item>
                            <Flex.Item>
                                <TouchableOpacity onPress={() => {
                                    this.pushPage({
                                        component: {
                                            ...Global.Screens.IntBuyRecordAdd,
                                            passProps: {
                                                // baseId: this.state.baseState[0],
                                                callback: () => { this.GetAllInt() }
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
                    <List>
                        <Picker
                            registerNumber="作物"
                            data={this.state.CropList}
                            cols={2}
                            value={this.state.cropState}
                            onOk={(val) => this.setState({ cropState: val })}
                            style={{ color: '#000' }}
                        >
                            <Item><Text style={{ fontSize: 17, color: '#000' }}>作物</Text></Item>
                        </Picker>
                    </List>
                    <List>
                        <InputItem
                            textAlign="right"
                            clear
                            onChangeText={(text) => {
                                this.setState({
                                    quantity: text
                                })
                            }}
                            error={this.state.registerNumberError}
                            onErrorClick={this.onErrorClick}
                            maxLength={50}
                            placeholder="数量"
                            type='number'
                            value={this.state.quantity}
                        >数量
                        </InputItem>
                    </List>
                    <List>
                        <DatePicker
                            value={this.state.expirationDay}
                            mode="date"
                            minDate={new Date('2018-01-01')}
                            maxDate={new Date()}
                            onChange={(text) => {
                                this.setState({
                                    expirationDay: text
                                })
                            }}
                            format="YYYY-MM-DD"
                        >
                            <Item arrow="horizontal" >使用日期</Item>
                        </DatePicker>
                    </List>
                    <List>
                        <InputItem
                            textAlign="right"
                            clear
                            onChangeText={(text) => {
                                this.setState({
                                    remark: text
                                })
                            }}
                            error={this.state.remarkError}
                            onErrorClick={this.onErrorClick}
                            maxLength={50}
                            placeholder="输入备注"
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

module.exports = connect(mapStateToProps)(IntUseRecordAdd);
const styles = StyleSheet.create({
    // userInfo: store.getAccount()
});
