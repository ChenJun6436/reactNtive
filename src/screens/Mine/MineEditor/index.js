// @flow

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    // Button,
    ScrollView,
    TextInput,
    Alert,
} from 'react-native';
import storage from 'react-native-sync-storage';
import { List, InputItem, TextareaItem, DatePicker, Picker, ImagePicker, Button } from 'antd-mobile-rn';
import * as AccountAction from 'root/src/actions/account';
import * as CommonAction from 'root/src/actions/common';
import * as EnumsAction from 'root/src/actions/enums';
import store from 'root/src/stores/account';
import moment from 'moment';
const { connect } = require('remx');
const Item = List.Item;

@navigatorDecorator
class MineEditor extends Component {
    constructor(props) {
        super(props);
        this.loading = false
        this.state = {
            files: [],
            id: '',
            userName: '',
            avatar: '',
            email: '',
            address: '',
            provinceCode: '',
            provinceName: '',
            cityCode: '',
            cityName: '',
            townCode: '',
            townName: '',
            countyCode: '',
            countyName: '',
            regionId: '',
            reId: [],
            regionName: '',
            sex: ['0'],
            birthDate: new Date(),
            idCardNumber: '',
            userType: '',
            plantingCrop: '',
            plantingArea: '',
            plantingYield: '',
            nextYearPlant: '',
            isCharger: false,
        }
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                rightButtons: [
                    confirmRightBtn
                ]
            }
        });
        Navigation.events().bindComponent(this);

    }
    navigationButtonPressed({ buttonId }) {
        let ZhengReg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
        // this.state.id = this.props.userInfo.userID
        if(this.loading){
            return false
        }
        if (!this.state.userName) {
            MyToast.info('请输入用户名！')
            return;
        }
        if (!this.state.regionId) {
             MyToast.info('请选择所在区域地址');
             return;
        }
        if ( this.state.labours && !ZhengReg.test( this.state.labours  ) ) {
            MyToast.info('务农劳动力人数应为整数');
            return;
        }
        if ( this.state.population && !ZhengReg.test( this.state.population  ) ) {
            MyToast.info('家庭人口应为整数');
            return;
        }
        if ( this.state.fieldArea && !ZhengReg.test( this.state.fieldArea   ) ) {
            MyToast.info('耕地面积应为大于0，最多两位小数');
            return;
        }
        else {
            this.loading = true
            this.state.birthDate = moment(this.state.birthDate).format('YYYY-MM-DD');
            AccountAction.modifyUser({ input: { ...this.state, sex: this.state.sex[0] } }).then((suc) => {
                if (suc.suc) {
                    store.setAccount({ ...this.state, sex: this.state.sex[0] })
                    store.setAvatar(this.state.avatar)
                    MyToast.success('恭喜您，修改成功！')
                    setTimeout(() => {
                        this.loading = false
                        this.pop()
                    }, 2000);
                    // Global.Navigate.startIndexScreen()
                }else{
                    MyToast.info(suc.msg)
                    setTimeout(() => {
                        this.loading = false
                    }, 2000);
                }
            })
        }
    }
    componentDidMount() {
        AccountAction.getUserInfo().then((data) => {
            if (data.suc) {
                this.setState({
                    id: data.data.id,
                    userName: data.data.userName ? data.data.userName : '',
                    avatar: data.data.avatar ? data.data.avatar : '',
                    email: data.data.email ? data.data.email : '',
                    address: data.data.address ? data.data.address : '',
                    provinceCode: data.data.provinceCode ? data.data.provinceCode : '',
                    provinceName: data.data.provinceName ? data.data.provinceName : '',
                    cityCode: data.data.cityCode ? data.data.cityCode : '',
                    cityName: data.data.cityName ? data.data.cityName : '',
                    townCode: data.data.townCode ? data.data.townCode : '',
                    townName: data.data.townName ? data.data.townName : '',
                    countyCode: data.data.countyCode ? data.data.countyCode : '',
                    countyName: data.data.countyName ? data.data.countyName : '',
                    regionId: data.data.regionId ? data.data.regionId : '',
                    reId: data.data.regionId ? data.data.regionId : '',
                    regionName: (data.data.provinceName ? data.data.provinceName : '') + ' ' + (data.data.cityName ? data.data.cityName : '') + ' ' + (data.data.townName ? data.data.townName : '') + ' ' + (data.data.countyName ? data.data.countyName : '') ,
                    sex: data.data.sex ? [data.data.sex + ''] : ['0'],
                    birthDate: data.data.birthDateStr && data.data.birthDateStr != '--' ? data.data.birthDateStr : new Date(),
                    idCardNumber: data.data.idCardNumber ? data.data.idCardNumber : '',
                    userType: data.data.userType ? data.data.userType : '',
                    plantingCrop: data.data.plantingCrop ? data.data.plantingCrop : '',
                    plantingArea: data.data.plantingArea ? data.data.plantingArea : 0,
                    plantingYield: data.data.plantingYield ? data.data.plantingYield : 0,
                    nextYearPlant: data.data.nextYearPlant ? data.data.nextYearPlant : '',
                    files: data.data.avatar ? [{
                        url: data.data.avatar ? (ImgUrl + data.data.avatar) : null,
                        id: data.data.url ? data.data.url : null,
                    }] : [],
                    isCharger: data.data.isCharger? data.data.isCharger : false,

                    education : data.data.education ? data.data.education : '',
                    labours : data.data.labours ? data.data.labours : '',
                    population : data.data.population ? data.data.population : '',
                    fieldArea : data.data.fieldArea ? data.data.fieldArea : '',
                    economicCondition : data.data.economicCondition ? data.data.economicCondition : '',
                    householdNo_ : data.data.householdNo_ ? data.data.householdNo_ : '',
                })
            }
        })
    }
    componentWillReceiveProps(nextProps) {
    }
    handleFile2Change = (files, type, index) => {
        if (type == 'add') {
            var formData = new FormData();
            let file = { uri: files[0].url, type: 'application/octet-stream', name: 'image.jpg' };
            formData.append('avatar', file);
            CommonAction.UploadImg({ input: { formData, type: 1 } }).then((suc) => {
                if (suc.suc) {
                    this.setState({
                        avatar: suc.Data.url,
                    })
                    this.setState({
                        files: [{
                            url: ImgUrl + suc.Data.url,
                            id: suc.Data.url,
                        }],
                    });
                }
                else {
                    MyToast.info('上传头像失败')
                }
            })
        }
        else {
            this.setState({
                files: [],
                avatar: ''
            });
        }
    }
    getAears = (data) => {
        if (data) {
            this.setState({
                provinceCode: data.regionId[0],
                provinceName: data.regionName[0],
                cityCode: data.regionId[1],
                cityName: data.regionName[1],
                townCode: data.regionId[3],
                townName: data.regionName[3],
                countyCode: data.regionId[2],
                countyName: data.regionName[2],
                regionId: data.regionId.join('/'),
                regionName: data.regionName.join(','),
                address: data.address,
                reId: data.regionId
            })
        }
    }
    userType = (type, name) => {
        this.setState({
            userType: type,
            typeName: name
        })
    }
    render() {
        return (
            <ScrollView style={{ backgroundColor: '#F5FCFF' }}>
                <View style={{ alignItems: 'center', padding: 15 }}>
                    <ImagePicker
                        selectable={this.state.files.length < 1}
                        accept="image/gif,image/jpeg,image/jpg,image/png"
                        onChange={this.handleFile2Change}
                        files={this.state.files}
                    />
                </View>
                <List>
                    <InputItem
                        textAlign="right"
                        clear
                        onChange={text => this.setState({ userName: text })}
                        placeholder="姓名"
                        value={this.state.userName}
                        placeholderTextColor='#cccccc'
                    ><Text style={{ color: 'gray' }}>姓名</Text>
                    </InputItem>
                    <Picker
                        data={[{ value: '0', label: '男' }, { value: '1', label: '女' }]}
                        cols={1}
                        onOk={(text) => { this.setState({ sex: text }) }}
                        value={this.state.sex}>
                        <Item arrow="horizontal"><Text style={{ color: 'gray' }}>性别</Text></Item>
                    </Picker>
                    <DatePicker
                        value={new Date(this.state.birthDate)}
                        mode="date"
                        minDate={new Date('1918-01-01')}
                        maxDate={new Date()}
                        onChange={text => this.setState({ birthDate: text })}
                        format="YYYY-MM-DD"
                    >
                        <Item arrow="horizontal" ><Text style={{ color: 'gray' }}>出生日期</Text></Item>
                    </DatePicker>
                    <InputItem
                        textAlign="right"
                        clear
                        onChange={text => this.setState({ idCardNumber: text })}
                        placeholder="身份证号"
                        value={this.state.idCardNumber}
                        labelNumber={9}
                        maxLength={18}
                        placeholderTextColor='#cccccc'
                    ><Text style={{ color: 'gray' }}>身份证号</Text>
                    </InputItem>


                    <Item arrow="horizontal" wrap extra={<Text style={{ color: 'gray' }}>{this.state.userType == 1 ? '农户' : this.state.userType == 2 ? '合作社' : this.state.userType == 3 ? '企业' : '其他'}</Text>}
                        onClick={() => {
                            this.pushPage({
                                component: {
                                    ...Global.Screens.MineType,
                                    passProps: { userType: this.userType },
                                }
                            })
                        }}><Text style={{ color: 'gray' }}>用户类型</Text></Item>

                    <Item arrow="horizontal" wrap extra={<Text style={{ color: 'gray', width: '75%', overflow: 'hidden', textAlign: 'right' }}>{this.state.regionName}</Text>}
                        cols={1}
                        onClick={() => {
                            this.pushPage({
                                component: {
                                    ...Global.Screens.MineRegion,
                                    passProps: { getAears: this.getAears, regionId: this.state.regionId, address: this.state.address },
                                }
                            })
                        }}><Text style={{ color: 'gray' }}>所在区域</Text></Item>             
                    {/* <InputItem
                        textAlign="right"
                        type='number'
                        clear
                        onChange={text => this.setState({ plantingArea: text })}
                        placeholder="请输入土地面积"
                        value={this.state.plantingArea + ''}
                        labelNumber={9}
                        placeholderTextColor='#cccccc'
                        type="number"
                        extra="亩"
                    ><Text style={{ color: 'gray' }}>土地面积</Text>
                    </InputItem> */}
                    {/* <InputItem
                        textAlign="right"
                        type='number'
                        clear
                        onChange={text => this.setState({ plantingYield: text })}
                        placeholder="请输入产量"
                        value={this.state.plantingYield + ''}
                        labelNumber={9}
                        extra="斤"
                        placeholderTextColor='#cccccc'
                        type="number"
                    ><Text style={{ color: 'gray' }}>产量</Text>
                    </InputItem> */}
                    <InputItem
                        textAlign="right"
                        clear
                        onChange={text => this.setState({ education: text })}
                        placeholder="文化程度"
                        value={this.state.education+''}
                        placeholderTextColor='#cccccc'
                    ><Text style={{ color: 'gray' }}>文化程度</Text>
                    </InputItem>
                    <InputItem
                        textAlign="right"
                        clear
                        onChange={text => this.setState({ labours: text })}
                        placeholder="务农劳动人口"
                        value={this.state.labours+''}
                        placeholderTextColor='#cccccc'
                    ><Text style={{ color: 'gray' }}>务农劳动人口</Text>
                    </InputItem>
                    <InputItem
                        textAlign="right"
                        clear
                        onChange={text => this.setState({ population: text })}
                        placeholder="家庭人口"
                        value={this.state.population+''}
                        placeholderTextColor='#cccccc'
                    ><Text style={{ color: 'gray' }}>家庭人口</Text>
                    </InputItem>
                    <InputItem
                        textAlign="right"
                        clear
                        onChange={text => this.setState({ fieldArea : text })}
                        placeholder="总耕地面积"
                        value={this.state.fieldArea+''}
                        placeholderTextColor='#cccccc'
                    ><Text style={{ color: 'gray' }}>总耕地面积</Text>
                    </InputItem>
                    <InputItem
                        textAlign="right"
                        clear
                        onChange={text => this.setState({ economicCondition : text })}
                        placeholder="经济情况"
                        value={this.state.economicCondition+''}
                        placeholderTextColor='#cccccc'
                    ><Text style={{ color: 'gray' }}>经济情况</Text>
                    </InputItem>
                    <InputItem
                        textAlign="right"
                        clear
                        onChange={text => this.setState({ householdNo_ : text })}
                        placeholder="户主编号"
                        value={this.state.householdNo_ +''}
                        placeholderTextColor='#cccccc'
                    ><Text style={{ color: 'gray' }}>户主编号</Text>
                    </InputItem>
                </List>
            </ScrollView>
        );
    }
}
function mapStateToProps() {
    return {
        userInfo: store.getAccount(),
        userId: store.getUserId()
    };
}

module.exports = connect(mapStateToProps)(MineEditor);
const styles = StyleSheet.create({
    // userInfo: store.getAccount()
});
