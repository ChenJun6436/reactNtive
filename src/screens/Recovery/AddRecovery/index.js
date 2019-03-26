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
import Icon from 'react-native-vector-icons/Feather';
import { bold } from 'ansi-colors';
import moment from 'moment';
import storage from 'react-native-sync-storage';
const { connect } = require('remx');
const Item = List.Item;
let initData = {
    gtype: ['农药'],
    gunit: '',
    gname: '',
    gnum: '',
    gweight: '',
}
@navigatorDecorator
class AddRecovery extends Component {
    constructor(props) {
        super(props);
        this.loading = false
        this.state = {
            plantList: [initData],
            title: '',
            description: '',
            startTime: new Date(),
            endTime: new Date(),
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
    componentWillMount(){
        const userInfo = storage.cache.account
        this.setState({
            sname: userInfo.userName,
            scost:'',
            sdetail:'',
            sphone:userInfo.phone,
            plantList: [
                {
                    gtype: ['农药'],
                    gunit: '',
                    gname: '',
                    gnum: '',
                    gbig: '',
                    gweight: '',
                    gmoney: '0',
                }
            ],
            allMoney: 0,
        })
    }
    navigationButtonPressed() {
        // if (this.loading) {
        //     return false
        // }
        this.loading = false
        const ret=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/; 
        this.state.plantList.map((i)=>{
            if(  !ret.test(i.gnum)  ){
                this.loading = true
                MyToast.info('数量应大于0，且最多两位小数的数字')
            }
        })
        if(this.loading){
            return false
        }
        MyToast.info('新增成功')
        this.setState({
            sname:'',
            scost:'',
            sdetail:'',
            sphone:'',
            plantList: [
                {
                    gtype: ['农药'],
                    gunit: '',
                    gname: '',
                    gnum: '',
                    gweight: '',
                    gbig:'',
                    gmoney: '0',
                }
            ],
            allMoney: 0,
        })
        setTimeout(() => {
            this.pop()
        }, 1000)
    }

    changeData(text, index, name) {
        let nowList = this.state.plantList
        let textNew = text
        nowList[index][name] = textNew
        //计算金额 和 总计金额
        let money = null
        console.log(nowList[index]['gbig'][0])
        if(nowList[index]['gbig'][0] == '1'){
            money = 0.3
        }else if(nowList[index]['gbig'][0] == '2'){
            money = 0.5
        }else if(nowList[index]['gbig'][0] == '3'){
            money = 0.1
        }else if(nowList[index]['gbig'][0] == '4'){
            money = 0.2
        }
        console.log(money)
        let allMoney = 0
        if(name == 'gnum' && money){
            nowList[index]['gmoney'] = (parseFloat(text) * money).toFixed(2)  
            nowList.map((i)=>{
                allMoney += parseFloat(i.gmoney) 
            })
        }else if(name == 'gbig' && nowList[index]['gnum']){
            nowList[index]['gmoney'] = (parseFloat(nowList[index]['gnum']) * money).toFixed(2)  
            nowList.map((i)=>{
                allMoney += parseFloat(i.gmoney) 
            })
        }
        
        this.setState({
            plantList: nowList,
            allMoney
        })
    }
    onErrorClick = () => {
        MyToast.info('请填写正确的信息，且不能为空');
    }
    render() {
        console.log(this.state.plantList)
        return (
            <View>
                

            <ScrollView style={{ backgroundColor: '#f5f5f5',height:'92%' }}>

                <View>
                    <List>
                        <InputItem
                            textAlign="right"
                            clear
                            labelNumber={5}
                            onChangeText={(text) => {
                                this.setState({
                                    sname: text
                                })
                            }}
                            maxLength={50}
                            placeholder="输入交回人姓名"
                            value={this.state.sname}
                        >交回人姓名
                        </InputItem>
                    </List>
                    <List>
                        <InputItem
                            textAlign="right"
                            clear
                            labelNumber={5}
                            type='number'
                            onChangeText={(text) => {
                                this.setState({
                                    sphone: text
                                })
                            }}
                            maxLength={50}
                            placeholder="输入交回人电话"
                            value={this.state.sphone}
                        >交回人电话
                        </InputItem>
                    </List>
                    <List>
                        <InputItem
                            textAlign="right"
                            clear
                            labelNumber={5}
                            type='number'
                            onChangeText={(text) => {
                                this.setState({
                                    sdetail: text
                                })
                            }}
                            maxLength={50}
                            placeholder="备注"
                            value={this.state.sdetail}
                        >备注</InputItem>
                    </List>
                </View>
                {
                    this.state.plantList.map((i, index) => {
                        return (
                            <View key={index}>
                                <List>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <Text style={{ lineHeight: 50, fontSize: 18, marginLeft: 15, color: '#000', fontWeight: 'bold' }}>回收物（{index + 1}）</Text>
                                        {/* 删除土地 */}
                                        {index == 0 ? (null) : (
                                            <TouchableWithoutFeedback onPress={() => {
                                                let nowList = this.state.plantList
                                                nowList.splice(index, 1)
                                                this.setState({
                                                    plantList: nowList
                                                })
                                            }}>
                                                <View>
                                                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#000', lineHeight: 50, marginRight: 15 }}><Icon color='red' name='trash-2' size={18} /></Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )}
                                    </View>
                                </List>
                                <List>
                                    <Picker
                                        // style={{ fontSize: 12, color: 'gray' }}
                                        data={[{ value: '农药', label: '农药' }, { value: '种子', label: '种子' }, { value: '化肥', label: '化肥' }, { value: '其他', label: '其他' }]}
                                        cols={1}
                                        onChange={(text) => {
                                            this.changeData(text, index, 'gtype')
                                        }}
                                        value={i.gtype}>
                                        <Item><Text style={{ color: '#000', fontSize: 17 }}>商品类型</Text></Item>
                                    </Picker>
                                </List>
                                <List>
                                    <Picker
                                        // style={{ fontSize: 12, color: 'gray' }}
                                        data={[{ value: '瓶', label: '瓶' }, { value: '盒', label: '盒' }, { value: '桶', label: '桶' }, { value: '包', label: '包' },
                                        { value: '箱', label: '箱' }, { value: '件', label: '件' }, { value: '壶', label: '壶' }, { value: '袋', label: '袋' },
                                        { value: '支', label: '支' }, { value: '套', label: '套' }, { value: '罐', label: '罐' }, { value: '枚', label: '枚' },
                                        { value: '提', label: '提' }, { value: '台', label: '台' }, { value: '片', label: '片' }, { value: '组', label: '组' },
                                        { value: '板', label: '板' }, { value: '对', label: '对' }, { value: '筐', label: '筐' }]}
                                        cols={1}
                                        onChange={(text) => {
                                            this.changeData(text, index, 'gunit')
                                        }}
                                        value={i.gunit}>
                                        <Item><Text style={{ color: '#000', fontSize: 17 }}>包装单位</Text></Item>
                                    </Picker>
                                </List>
                                <List>
                                    <Picker
                                        // style={{ fontSize: 12, color: 'gray' }}
                                        data={[{ value: '1', label: '<200毫升' }, { value: '2', label: '>200毫升' }, { value: '3', label: '<50克' }, { value: '4', label: '>50克' }]}
                                        cols={1}
                                        onChange={(text) => {
                                            this.changeData(text, index, 'gbig')
                                        }}
                                        value={i.gbig}>
                                        <Item><Text style={{ color: '#000', fontSize: 17 }}>包装大小</Text></Item>
                                    </Picker>
                                </List>
                                <List>
                                    <Picker
                                        // style={{ fontSize: 12, color: 'gray' }}
                                        data={[{ value: '纸', label: '纸' }, { value: '塑料', label: '塑料' }, { value: '玻璃', label: '玻璃' }, { value: '金属', label: '金属' },
                                        { value: '木头', label: '木头' }, { value: '竹子', label: '竹子' }, { value: '其他', label: '其他' }]}
                                        cols={1}
                                        onChange={(text) => {
                                            this.changeData(text, index, 'gname')
                                        }}
                                        value={i.gname}>
                                        <Item><Text style={{ color: '#000', fontSize: 17 }}>材质</Text></Item>
                                    </Picker>
                                </List>
                                <List>
                                    <InputItem
                                        textAlign="right"
                                        type='number'
                                        clear
                                        onChangeText={(text) => {
                                            this.changeData(text, index, 'gnum')
                                        }}
                                        maxLength={20}
                                        placeholder="输入数量"
                                        value={i.gnum}
                                    >数量</InputItem>
                                </List>
                                <List>
                                    <InputItem
                                        textAlign="right"
                                        type='number'
                                        editable={false}
                                        extra={'元'}
                                        placeholder="0"
                                        value={i.gmoney}
                                    >回收金额</InputItem>
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
                            gtype: ['农药'],
                            gunit: '',
                            gname: '',
                            gnum: '',
                            gweight: '',
                            gbig: '',
                            gmoney: '0',
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
            <View style={{ backgroundColor: '#fff', width: '100%', height: 100,width:'100%',lineHeight:1 }}>
                <Text style={{marginTop:10,textAlign:'right',marginRight:10,fontSize: 16}}>总收益：<Text style={{fontSize:18,color:'red'}}>{this.state.allMoney}元</Text></Text>
            </View>
            </View>
        );
    }
}
function mapStateToProps() {
    return {

    };
}

module.exports = connect(mapStateToProps)(AddRecovery);
const styles = StyleSheet.create({
    // userInfo: store.getAccount()
});
