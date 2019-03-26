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
} from 'react-native';
import { List, InputItem, TextareaItem, DatePicker, Picker, ImagePicker, Button, WhiteSpace } from 'antd-mobile-rn';
import * as LandAction from 'root/src/actions/land';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bold } from 'ansi-colors';
import moment from 'moment';
// import { runInThisContext } from 'vm';
const { connect } = require('remx');
const Item = List.Item;
@navigatorDecorator
class AddLand extends Component {
    constructor(props) {
        super(props);
        this.loading = false
        this.state = {
            freshData: 0,
            language: 1,
            typeList: null,
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
    navigationButtonPressed() {
        if (this.loading) {
            return false
        }
        
        const ret = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
        if (!this.state.type || !this.state.type[0]) {
            MyToast.info('土地类型不能为空')
            return false
        } else if (!this.state.area) {
            MyToast.info('面积不能为空')
            return false
        } else if (!this.state.adress) {
            MyToast.info('地址不能为空')
            return false
        } else if (!this.state.number) {
            MyToast.info('地块/棚号不能为空')
            return false
        } else if (!ret.test(this.state.area)) {
            MyToast.info('面积应大于0，且最多两位小数的数字');
            return false
        }
        this.loading = true
        const postData = {
            adress: this.state.adress,
            number: this.state.number,
            area: this.state.area,
            type: this.state.type[0],
        }
        if (this.props.data) {
            postData.id = this.props.data.id
            LandAction.Edit({ input: postData }).then((data) => {
                if (data.suc) {
                    MyToast.success('修改成功');
                    this.props._fresh()
                    this.pop()
                } else {
                    this.loading = false
                    MyToast.info(data.msg);
                }
            })
        } else {
            LandAction.Add({ input: postData }).then((data) => {
                if (data.suc) {
                    MyToast.success('新增成功');
                    this.props._fresh()
                    this.pop()
                } else {
                    this.loading = false
                    MyToast.info(data.msg);
                }
            })
        }
    }
    componentWillMount() {
        if (this.props.data) {
            //if editor
            const data = this.props.data
            this.setState({
                adress: data.adress,
                number: data.number,
                area: data.area + '',
                type: [data.type]
            })
        }
        //获取土地类型
        LandAction.Type({ input: '' }).then((data) => {
            if (data.suc) {
                let landType = []
                data.data.landType.map((i, index) => {
                    landType[index] = {
                        value: i,
                        label: i
                    }
                })
                this.setState({
                    typeList: landType
                })
            } else {
                MyToast.info(data.msg);
            }
        })
    }
    fresh = () => {
        this.setState({
            freshData: 1
        })
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f5f5f5' }}>
                <List>
                    <Picker
                        // style={{ fontSize: 12, color: 'gray' }}
                        data={this.state.typeList}
                        cols={1}
                        onChange={text => this.setState({ type: text })}
                        value={this.state.type}>
                        <Item arrow="horizontal"><Text style={{ color: 'gray' }}>土地类型</Text></Item>
                    </Picker>
                </List>
                <List>
                    <InputItem
                        textAlign="right"
                        clear
                        extra={'亩'}
                        type='number'
                        onChange={text => this.setState({ area: text })}
                        placeholder="面积"
                        value={this.state.area}
                        placeholderTextColor='#cccccc'
                    ><Text style={{ color: 'gray' }}>面积</Text>
                    </InputItem>
                </List>
                <List>
                    <InputItem
                        textAlign="right"
                        clear
                        onChange={text => this.setState({ adress: text })}
                        placeholder="地址"
                        value={this.state.adress}
                        placeholderTextColor='#cccccc'
                    ><Text style={{ color: 'gray' }}>地址</Text>
                    </InputItem>
                </List>
                <List>
                    <InputItem
                        textAlign="right"
                        clear
                        onChange={text => this.setState({ number: text })}
                        placeholder="地块/棚号"
                        value={this.state.number}
                        placeholderTextColor='#cccccc'
                    ><Text style={{ color: 'gray' }}>地块/棚号</Text>
                    </InputItem>
                </List>
            </View >
        );
    }
}
function mapStateToProps() {
    return {

    };
}

module.exports = connect(mapStateToProps)(AddLand);
const styles = StyleSheet.create({
    // userInfo: store.getAccount()
});
