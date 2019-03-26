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
import * as MineAction from 'root/src/actions/garden';
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
class GardenAdd extends Component {
    constructor(props) {
        super(props);
        this.loading = false
        this.state = {
            landState: '',
            landList: [],
            baseState: '',
            baseList: [],
            enterpriseId: '',
            plantBaseId: '',
            name: '',
            establishDay: new Date(),
            area: '',
            soil: '',
            altitude: '',
            slope: '',
            soilThickness: '',
            groundWater: '',
            remark: '',
        }
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                title: {
                    text: this.props.id ? '编辑标准园' : '新增标准园'
                },
                rightButtons: [
                    confirmRightBtn
                ]
            }
        });
        Navigation.events().bindComponent(this);
    }
    navigationButtonPressed() {
        if(this.loading){
            return false
        }
        let nowName = false
        let nowError = this.state.plantError
        const ret = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
        const ret1 = /^(0|[1-9]\d*)(\s|$|\.\d{1,2}\b)/
        if (!this.state.baseState[0]) {
            nowName = true
            MyToast.info('请选择基地');
        } else if (!this.state.name) {
            nowName = true
            MyToast.info('请填写园区名称');
        } else if (!this.state.landState[0]) {
            nowName = true
            MyToast.info('请选择土壤类型');
        } else if (!ret.test(this.state.altitude)) {
            nowName = true
            MyToast.info('海拔高度应大于0，且最多两位小数的数字');
        }else if( !ret1.test(this.state.slope ) ){
            nowName = true
            MyToast.info('坡度应大于等于0，且最多两位小数的数字');
        }else if( parseFloat(this.state.slope) > 90 ){
            nowName = true
            MyToast.info('坡度不能大于等于90度');
        }else if( !ret.test(this.state.area ) ){
            nowName = true
            MyToast.info('面积应大于0，且最多两位小数的数字');
        } else if( !ret.test(this.state.soilThickness ) ){
            nowName = true
            MyToast.info('土壤厚度应大于0，且最多两位小数的数字');
        } else if( !ret.test(this.state.groundWater ) ){
            nowName = true
            MyToast.info('地下水位应大于0，且最多两位小数的数字');
        } 
        if (nowName) {
            return false
        } else {
            this.loading = true
            let establishDay = moment(this.state.establishDay).format('YYYY-MM-DD');
            let postData = {
                enterpriseId: storage.get('enterpriseId'),
                plantBaseId: this.state.baseState[0],
                name: this.state.name,
                establishDay,
                area: this.state.area ? this.state.area : 0,
                soil: this.state.landState[0],
                altitude: this.state.altitude ? this.state.altitude : 0,
                slope: this.state.slope ? this.state.slope : 0,
                soilThickness: this.state.soilThickness ? this.state.soilThickness : 0,
                groundWater: this.state.groundWater ? this.state.groundWater : 0,
                remark: this.state.remark,
            }
            if (this.props.id) {
                postData.id = this.props.id
                MineAction.EditGarden({ input: postData }).then((data) => {
                    if (data.suc == 1) {
                        MyToast.success('编辑成功');
                        initData = {
                            investmentType: '',
                            registerNumber: '',
                            registerName: '',
                            expirationDay: new Date(),
                            investmentName: '',
                            packUnit: true,
                            quantity: "亩",
                            manufacturer: '',
                            saleUnity: '',
                            remark: '',
                        }
                        setTimeout(() => {
                            this.pop();
                            this.props.refresh && this.props.refresh()
                            this.pushPage({
                                component: {
                                    ...Global.Screens.Garden,
                                }
                            });
                        }, 2000)
                    } else {
                        this.loading = false
                        MyToast.info(data.msg)
                    }
                })
            } else {
                MineAction.AddGarden({ input: postData }).then((data) => {
                    if (data.suc == 1) {
                        MyToast.success('新增成功');
                        initData = {
                            investmentType: '',
                            registerNumber: '',
                            registerName: '',
                            expirationDay: new Date(),
                            investmentName: '',
                            packUnit: true,
                            quantity: "亩",
                            manufacturer: '',
                            saleUnity: '',
                            remark: '',
                        }
                        setTimeout(() => {
                            this.pop();
                            this.props.refresh && this.props.refresh()
                            this.pushPage({
                                component: {
                                    ...Global.Screens.Garden,
                                }
                            });
                        }, 2000)
                    } else {
                        this.loading = false
                        MyToast.info(data.msg)
                    }
                })
            }
        }
    }
    componentWillMount() {
        //获取所有基地
        MineAction.GetAllBase().then((data) => {
            if (data.suc) {
                let model = data.data
                let arrInt = []
                model.forEach((i, index) => {
                    arrInt[index] = {}
                    arrInt[index].label = i.name + ''
                    arrInt[index].enterpriseId = i.enterpriseId + ''
                    arrInt[index].value = i.id + ''
                });
                this.setState({
                    baseList: arrInt,
                })
            } else {
                MyToast.info('基地获取失败，稍后尝试');
            }
        })
        //获取所有土壤
        MineAction.GetAllType().then((data) => {
            if (data.suc) {
                let model = data.data
                let arrInt = []
                model.forEach((i, index) => {
                    arrInt[index] = {}
                    arrInt[index].label = i.enumName + ''
                    arrInt[index].value = i.enumValue + ''
                });
                this.setState({
                    landList: arrInt,
                })
            } else {
                MyToast.info('土壤获取失败，稍后尝试');
            }
        })
        if (this.props.id) {
            MineAction.GetGarden(this.props.id).then((data) => {
                if (data.suc) {
                    let model = data.data
                    this.setState({
                        landState: [model.soil + ''],
                        baseState: [model.plantBaseId + ''],
                        enterpriseId: model.enterpriseId + '',
                        plantBaseId: model.plantBaseId + '',
                        name: model.name + '',
                        establishDay: new Date(model.establishDay),
                        area: model.area + '',
                        soil: model.soil + '',
                        altitude: model.altitude + '',
                        slope: model.slope + '',
                        soilThickness: model.soilThickness + '',
                        groundWater: model.groundWater + '',
                        remark: model.remark + '',
                    })
                } else {
                    MyToast.info('数据获取失败，稍后尝试');
                }
            })
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
                        <InputItem
                            textAlign="right"
                            clear
                            onChangeText={(text) => {
                                this.setState({
                                    name: text
                                })
                            }}
                            error={this.state.registerNumberError}
                            onErrorClick={this.onErrorClick}
                            maxLength={50}
                            placeholder="园区名称"
                            value={this.state.name}
                        >园区名称
                        </InputItem>
                    </List>
                    <List>
                        <Picker
                            registerNumber="土壤类型"
                            data={this.state.landList}
                            cols={1}
                            value={this.state.landState}
                            onOk={(val) => this.setState({ landState: val })}
                            style={{ color: '#000' }}
                        >
                            <Item><Text style={{ fontSize: 17, color: '#000' }}>土壤类型</Text></Item>
                        </Picker>
                    </List>
                    <List>
                        <Picker
                            registerNumber="基地"
                            data={this.state.baseList}
                            cols={1}
                            value={this.state.baseState}
                            onOk={
                                (val) => {
                                    this.setState({ baseState: val })
                                }
                            }
                            style={{ color: '#000' }}
                        >
                            <Item><Text style={{ fontSize: 17, color: '#000' }}>基地</Text></Item>
                        </Picker>
                    </List>
                    <List>
                        <DatePicker
                            value={this.state.establishDay}
                            mode="date"
                            minDate={new Date('2018-01-01')}
                            onChange={(text) => {
                                this.setState({
                                    establishDay: text
                                })
                            }}
                            format="YYYY-MM-DD"
                        >
                            <Item arrow="horizontal" >建园时间</Item>
                        </DatePicker>
                    </List>
                    <List>
                        <InputItem
                            labelNumber={8}
                            textAlign="right"
                            clear
                            onChangeText={(text) => {
                                this.setState({
                                    altitude: text
                                })
                            }}
                            error={this.state.registerNumberError}
                            onErrorClick={this.onErrorClick}
                            maxLength={50}
                            placeholder="海拔高度"
                            value={this.state.altitude}
                            type='number'
                        >海拔高度（米）
                        </InputItem>
                    </List>

                    <List>
                        <InputItem
                            textAlign="right"
                            clear
                            onChangeText={(text) => {
                                this.setState({
                                    slope: text
                                })
                            }}
                            maxLength={50}
                            placeholder="坡度"
                            type='number'
                            value={this.state.slope}
                        >坡度（度）
                        </InputItem>
                    </List>
                    <List>
                        <InputItem
                            textAlign="right"
                            clear
                            onChangeText={(text) => {
                                this.setState({
                                    area: text
                                })
                            }}
                            maxLength={50}
                            placeholder="面积"
                            type='number'
                            value={this.state.area}
                        >面积（亩）
                        </InputItem>
                    </List>
                    <List>
                        <InputItem
                            labelNumber={8}
                            textAlign="right"
                            clear
                            onChangeText={(text) => {
                                this.setState({
                                    soilThickness: text
                                })
                            }}
                            type='number'
                            maxLength={50}
                            placeholder="土壤厚度"
                            value={this.state.soilThickness}
                        >土壤厚度（米）
                        </InputItem>
                    </List>
                    <List>
                        <InputItem
                            labelNumber={8}
                            textAlign="right"
                            clear
                            onChangeText={(text) => {
                                this.setState({
                                    groundWater: text
                                })
                            }}
                            type='number'
                            maxLength={50}
                            placeholder="地下水位"
                            value={this.state.groundWater}
                        >地下水位（米）
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

module.exports = connect(mapStateToProps)(GardenAdd);
const styles = StyleSheet.create({
    // userInfo: store.getAccount()
});
