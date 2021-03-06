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
import { List, InputItem, WhiteSpace } from 'antd-mobile-rn';
import Icon from 'react-native-vector-icons/FontAwesome';
import immutable from 'immutable';
import lodash from 'lodash';
const Item = List.Item;
@navigatorDecorator
export default class LandManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            landList: this.props.landList ? this.props.landList : [
                {
                    landName: null,
                    area: null,
                }
            ],
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
        let landList = this.state.landList;
        const ret = /^\d+(\.\d+)?$/;
        for (let i in landList) {
            if (!landList[i].landName || !landList[i].area) {
                MyToast.info('暂请填写完整的区块信息');
                return;
            }
            if (!ret.test(landList[i].area)) {
                MyToast.info('区块面积只能为正数')
                return
            }
            if (i != 0 && landList[i].landName == landList[i - 1].landName) {
                MyToast.info('区块名称不能重复');
                return;
            }
        }
        this.props.callback(landList)
        this.pop();
    }
    componentWillMount() {

    }
    setValues = (data, name, index) => {
        let landList = immutable.updateIn(this.state.landList, [index, name], v => data);
        this.setState({
            landList
        })
    }
    render() {
        return (
            <ScrollView style={{ backgroundColor: '#f5f5f5' }}>
                {
                    this.state.landList.map((i, index) => {
                        return (
                            <View key={i}>
                                <List>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <Text style={{ lineHeight: 50, fontSize: 18, marginLeft: 15, color: '#000', fontWeight: 'bold' }}>区块（{index + 1}）</Text>
                                        <TouchableWithoutFeedback onPress={() => {
                                            let nowList = lodash.cloneDeep(this.state.landList)
                                            nowList.splice(index, 1)
                                            this.setState({
                                                landList: nowList
                                            })
                                        }}>
                                            <View>
                                                <Text style={{ textAlign: 'center', fontSize: 18, color: '#000', lineHeight: 50, marginRight: 15 }}><Icon color='red' name='trash' size={18} /></Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <InputItem
                                        textAlign="right"
                                        clear
                                        onChange={text => { this.setValues(text, "landName", index) }}
                                        placeholder="区块名称"
                                        value={i.landName}
                                        placeholderTextColor='#cccccc'
                                    ><Text style={{ color: 'gray' }}>区块名称</Text>
                                    </InputItem>
                                    <InputItem
                                        textAlign="right"
                                        clear
                                        onChange={text => { this.setValues(text, "area", index) }}
                                        placeholder="区块面积（亩）"
                                        value={i.area ? "" + i.area : i.area}
                                        type='number'
                                        placeholderTextColor='#cccccc'
                                    ><Text style={{ color: 'gray' }}>区块面积</Text>
                                    </InputItem>
                                </List>
                                <WhiteSpace size="sm" />
                            </View>
                        )
                    })
                }
                <TouchableWithoutFeedback onPress={() => {
                    let nowList = lodash.cloneDeep(this.state.landList)
                    nowList.push(
                        {
                            landName: null,
                            area: null,
                        }
                    )
                    this.setState({
                        landList: nowList,
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

