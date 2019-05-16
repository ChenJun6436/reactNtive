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
@navigatorDecorator
class PublishAdd extends Component {
    constructor(props) {
        super(props);
        this.loading = false
        this.state = {
            plantList: [initData],
            plantError: [initError],
            title: '',
            description: '',
            startTime: new Date(),
            endTime: new Date(),
            titleError: false,
            descriptionError: false,
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
        let nowName = ''
        let nowToast = ''
        let nowError = this.state.plantError
        this.state.plantList.map((i, index) => {
            if (!this.state.title) {
                nowName = '1'
                this.setState({
                    titleError: true
                })
                nowToast = '请填写标题'
            } else if (!this.state.description) {
                nowName = '2'
                this.setState({
                    descriptionError: true
                })
                nowToast = '请填写描述'
            } else if (!i.plantName) {
                nowName = 'plantName'
                nowError[index][nowName] = true
                nowToast = '请填写作物名称'
            } else if (!i.area) {
                nowName = 'area'
                nowError[index][nowName] = true
                nowToast = '请填写面积'
            } else if (!ret.test(i.area)) {
                nowName = 'area'
                nowError[index][nowName] = true
                nowToast = '面积应大于0，且最多两位小数的数字'
            } else if (!i.period) {
                nowName = 'period'
                nowError[index][nowName] = true
                nowToast = '请填写生长周期'
            } else if (!ret.test(i.period)) {
                nowName = 'period'
                nowToast = '生长周期应大于0，且最多两位小数的数字'
            } else if (!ret.test(i.outPut)) {
                nowName = 'outPut'
                nowToast = '预计产量应大于0，且最多两位小数的数字'
            }
        })


        if (nowName) {
            MyToast.info(nowToast)
            this.setState({
                plantError: nowError
            })
        } else {
            this.loading = true
            let plantList = this.state.plantList
            let startTime = moment(this.state.startTime).format('YYYY-MM-DD');
            let endTime = moment(this.state.endTime).format('YYYY-MM-DD');
            plantList.forEach(i => {
                i.year = moment(i.year).format('YYYY-MM-DD');
            });
            let postData = {
                title: this.state.title,
                description: this.state.description,
                startTime,
                endTime,
                plantList
            }
            MineAction.AddPublish({ input: postData }).then((data) => {
                if (data.suc == 1) {
                    MyToast.success('发布成功');
                    initData = {
                        plantName: '',
                        area: '',
                        period: '',
                        year: new Date(),
                        outPut: '',
                        iscurrent: true,
                        unit: "亩"
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
    componentWillMount() {

    }
    changeData(text, index, name) {
        let nowList = this.state.plantList
        let nowError = this.state.plantError
        let textNew = text
        if (text[0] == '-' && text.length > 1) {
            textNew = ''
        }
        nowList[index][name] = textNew
        if (!text) {
            nowError[index][name] = true
            switch (name) {
                case 'plantName':
                    MyToast.info('作物名称不能为空');
                    break;
                case 'area':
                    MyToast.info('面积不能为空');
                    break;
                case 'period':
                    MyToast.info('生长周期不能为空');
                    break;
            }
            this.setState({
                plantError: nowError,
            })
        } else {
            nowError[index][name] = false
            this.setState({
                plantList: nowList,
                plantError: nowError,
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
                                    title: text
                                }, () => {
                                    if (!this.state.title) {
                                        this.setState({
                                            titleError: true
                                        })
                                    } else {
                                        this.setState({
                                            titleError: false
                                        })
                                    }
                                })
                            }}
                            error={this.state.titleError}
                            onErrorClick={this.onErrorClick}
                            maxLength={50}
                            placeholder="输入标题"
                            value={this.state.title}
                        >标题
                        </InputItem>
                    </List>
                    <List>
                        <InputItem
                            textAlign="right"
                            clear
                            onChangeText={(text) => {
                                this.setState({
                                    description: text
                                }, () => {
                                    if (!this.state.description) {
                                        this.setState({
                                            descriptionError: true
                                        })
                                    } else {
                                        this.setState({
                                            descriptionError: false
                                        })
                                    }
                                })
                            }}
                            error={this.state.descriptionError}
                            onErrorClick={this.onErrorClick}
                            maxLength={50}
                            placeholder="输入描述"
                            value={this.state.description}
                        >描述
                        </InputItem>
                    </List>
                    <List>
                        <DatePicker
                            value={this.state.startTime}
                            mode="date"
                            minDate={new Date()}
                            onChange={(text) => {
                                this.setState({
                                    startTime: text
                                })
                            }}
                            format="YYYY-MM-DD"
                        >
                            <Item arrow="horizontal" >开始时间</Item>
                        </DatePicker>
                    </List>
                    <List>
                        <DatePicker
                            value={this.state.endTime}
                            mode="date"
                            minDate={new Date(this.state.startTime)}
                            onChange={(text) => {
                                this.setState({
                                    endTime: text
                                })
                            }}
                            format="YYYY-MM-DD"
                        >
                            <Item arrow="horizontal" >结束时间</Item>
                        </DatePicker>
                    </List>
                </View>
                {
                    this.state.plantList.map((i, index) => {
                        return (
                            <View key={index}>
                                <List>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <Text style={{ lineHeight: 50, fontSize: 18, marginLeft: 15, color: '#000', fontWeight: 'bold' }}>土地（{index + 1}）</Text>
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
                                                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#000', lineHeight: 50, marginRight: 15 }}><Icon color='red' name='trash' size={18} /></Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )}
                                    </View>
                                </List>
                                <List>
                                    <InputItem
                                        labelNumber={7}
                                        textAlign="right"
                                        clear
                                        onChangeText={(text) => {
                                            this.changeData(text, index, 'plantName')
                                        }}
                                        error={this.state.plantError[index]['plantName']}
                                        onErrorClick={this.onErrorClick}
                                        maxLength={20}
                                        placeholder="输入名称"
                                        value={i.plantName}
                                    >种植（养）作物
                                    </InputItem>
                                </List>
                                <List>
                                    <InputItem
                                        textAlign="right"
                                        type='number'
                                        clear
                                        onChangeText={(text) => {
                                            this.changeData(text, index, 'area')
                                        }}
                                        error={this.state.plantError[index]['area']}
                                        onErrorClick={this.onErrorClick}
                                        maxLength={20}
                                        placeholder="输入面积"
                                        value={i.area + ''}
                                        extra="亩"
                                    >面积
                                    </InputItem>
                                </List>
                                <List>
                                    <DatePicker
                                        value={new Date(i.year)}
                                        mode="date"
                                        minDate={new Date('2018-01-01')}
                                        onChange={(text) => {
                                            this.changeData(text, index, 'year')
                                        }}
                                        format="YYYY-MM-DD"
                                    >
                                        <Item arrow="horizontal" >种（养）日期</Item>
                                    </DatePicker>
                                </List>
                                <List>
                                    <InputItem
                                        textAlign="right"
                                        type='number'
                                        clear
                                        onChangeText={(text) => {
                                            this.changeData(text, index, 'period')
                                        }}
                                        error={this.state.plantError[index]['period']}
                                        onErrorClick={this.onErrorClick}
                                        maxLength={20}
                                        placeholder="输入生长周期"
                                        value={i.period}
                                        extra="天"
                                    >生长周期
                                    </InputItem>
                                </List>
                                <List>
                                    <InputItem
                                        textAlign="right"
                                        type='number'
                                        clear
                                        onChangeText={(text) => {
                                            this.changeData(text, index, 'outPut')
                                        }}
                                        placeholder="输入预计产量"
                                        value={i.outPut}
                                        extra="斤"
                                    >预计产量
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
                            iscurrent: this.props.isCurrent,
                            unit: "亩"
                        }
                    )
                    let nowError = this.state.plantError
                    nowError.push(
                        {
                            plantName: false,
                            area: false,
                            period: false,
                        }
                    )
                    this.setState({
                        plantList: nowList,
                        plantError: nowError
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

    };
}

module.exports = connect(mapStateToProps)(PublishAdd);
const styles = StyleSheet.create({
    // userInfo: store.getAccount()
});
