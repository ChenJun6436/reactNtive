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
import * as MineAction from 'root/src/actions/staff';
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
class StaffAdd extends Component {
    constructor(props) {
        super(props);
        this.loading = false
        this.state = {
            intState: [],
            IntList: [{label:'工人',value:'1'},{label:'客户',value:'2'}],

            intName : '',
            cropState: [],
            CropList: [],
            name : '',
            phone  :'',
            
        }
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                title: {
                    text: this.props.id?'编辑人员':'新增人员'
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
        const ret=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
        if(!this.state.intState[0]){
            nowName = true
            MyToast.info('请选择类型');
        }else if(!this.state.name){
            nowName = true
            MyToast.info('请填写人员名字');
        } 
        if (nowName) {
            return false
        } else {
            let postData = {
                enterpriseId: storage.get('enterpriseId'),
                type : this.state.intState[0],
                name : this.state.name,
                phone  :this.state.phone?this.state.phone:'',
            }
            this.loading = true
            if(this.props.id) {
                postData.id = this.props.id
                MineAction.StaffEditor({ input: postData }).then((data) => {
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
            }else{
                MineAction.StaffAdd({ input: postData }).then((data) => {
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
    }
    componentWillMount() {
        //判断是否是编辑
        if(this.props.id){
            MineAction.StaffDetail(this.props.id).then((data) => {
                if (data.suc) {
                    let model =  data.data
                    this.setState({
                        intState: [model.type + ''],
                        name : model.name +'',
                        phone : model.phone?model.phone:'--',
                    })
                } else {
                    MyToast.info('数据获取失败，稍后尝试');
                }
            })
        }
    }
    render() {
        return (
            <ScrollView style={{ backgroundColor: '#f5f5f5' }}>
                <View>
                    <List>
                        <Picker
                            registerNumber="类型"
                            data={this.state.IntList}
                            cols={1}
                            value={this.state.intState}
                            onOk={(val) => this.setState({ intState: val })}
                            style={{color:'#000'}}
                        >
                            <Item><Text style={{fontSize:17,color:'#000'}}>类型</Text></Item>
                        </Picker>
                    </List>
                    <List>
                        <InputItem
                            textAlign="right"
                            clear
                            onChangeText={(text) => {
                                this.setState({
                                    name  : text
                                })
                            }}
                            maxLength={50}
                            placeholder="请输入姓名"
                            value={this.state.name }
                        >姓名
                        </InputItem>
                    </List>
                    <List>
                        <InputItem
                            textAlign="right"
                            clear
                            onChangeText={(text) => {
                                this.setState({
                                    phone: text
                                })
                            }}
                            maxLength={50}
                            placeholder="输入电话"
                            type='number'
                            value={this.state.phone}
                        >电话
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

module.exports = connect(mapStateToProps)(StaffAdd);
const styles = StyleSheet.create({
    // userInfo: store.getAccount()
});
