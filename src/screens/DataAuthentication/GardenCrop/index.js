// @flow

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Alert
} from 'react-native';
import { List, InputItem, Button, SwipeAction, WhiteSpace, Picker, DatePicker } from 'antd-mobile-rn';
import Icon from 'react-native-vector-icons/FontAwesome';
import { iconsMap, iconsLoaded } from 'root/src/utils/IconLoader';
import LoadMoreList from 'root/src/screens/baseComon/LoadMoreList.js';
import * as MineAction from 'root/src/actions/garden';
import moment from 'moment';
let now = moment();
const edate = now.format("YYYY-MM-DD");
const sdate = now.format("YYYY-MM") + "-01";
const Item = List.Item;
const { connect } = require('remx');
@navigatorDecorator
class GardenCrop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            publishState: [''],
            typeList: [{ label: '全部', value: '' }, { label: '已发布', value: '1' }, { label: '未发布', value: '2' }],
            startTime: sdate,
            endTime: edate

        }
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                rightButtons: [
                    addRightBtn
                ]
            }
        });
        Navigation.events().bindComponent(this);
    }
    componentWillMount() {

    }
    navigationButtonPressed() {
        this.pushPage({
            component: {
                passProps: { isNow: 'true', refresh: this.refresh },
                ...Global.Screens.GardenCropAdd,
            }
        });
    }
    refresh = (searchParams) => {
        this.moreListInst._onRefresh(searchParams);
    }
    render() {
        return (
            <View style={styles.container}>
                {/* <View>
                    <View>
                        <DatePicker
                            value={this.state.startTime ? new Date(this.state.startTime) : null}
                            mode="date"
                            minDate={new Date('2000-01-01')}
                            onChange={text => this.setState({ startTime: text }, () => { this.refresh({ state: this.state.publishState[0], startTime: this.state.startTime, endTime: this.state.endTime }); })}
                            format="YYYY-MM-DD"
                        >
                            <Item arrow="horizontal" ><Text style={{ color: 'gray' }}>开始时间</Text></Item>
                        </DatePicker>
                    </View>
                    <View>
                        <DatePicker
                            value={this.state.endTime ? new Date(this.state.endTime) : null}
                            mode="date"
                            minDate={new Date(this.state.startTime)}
                            onChange={text => this.setState({ endTime: text }, () => { this.refresh({ state: this.state.publishState[0], startTime: this.state.startTime, endTime: this.state.endTime }); })}
                            format="YYYY-MM-DD"
                        >
                            <Item arrow="horizontal" ><Text style={{ color: 'gray' }}>结束时间</Text></Item>
                        </DatePicker>
                    </View>
                    <View>
                        <Picker
                            title="选择状态"
                            data={this.state.typeList}
                            cols={1}
                            value={this.state.publishState}
                            onChange={(val) => this.setState({ publishState: val })}
                            onOk={(val) => this.setState({ publishState: val }, () => { this.refresh({ state: this.state.publishState[0], startTime: this.state.startTime, endTime: this.state.endTime }); })}
                        >
                            <Item><Text>状态</Text></Item>
                        </Picker>
                    </View>
                </View> */}
                <LoadMoreList
                    ref={ref => this.moreListInst = ref}
                    getData={MineAction.ListGardenCrop}
                    // searchParams={{ state: this.state.publishState[0], startTime: this.state.startTime, endTime: this.state.endTime }}
                    rowItem={(item) => {
                        return <SwipeAction autoClose style={{ backgroundColor: 'transparent', flex: 1 }} right={[
                            {
                                text: '编辑',
                                onPress: () => {
                                    this.pushPage({
                                        component: {
                                            passProps: { isNow: 'true', refresh: this.refresh, id: item.id },
                                            ...Global.Screens.GardenCropAdd,
                                        }
                                    });
                                },
                                style: { backgroundColor: 'green', color: 'white' },
                            },
                            {

                                text: '删除',
                                onPress: () => {
                                    Alert.alert(
                                        '提示',
                                        "确定删除吗？",
                                        [{
                                            text: '取消',
                                            onPress: () => {
                                                this.loading = false
                                            }
                                        },
                                        {
                                            text: '确定',
                                            onPress: () => {
                                                MineAction.DeleteGardenCrop({
                                                    idList: [
                                                        item.id + ''
                                                    ]
                                                }).then((data) => {
                                                    if (data.suc) {
                                                        this.refresh()
                                                    } else {
                                                        MyToast.info('操作失败，请稍后再试');
                                                    }
                                                })
                                            }
                                        }
                                        ]
                                    );

                                },
                                style: { backgroundColor: 'red', color: 'white' },
                            }
                        ]} >
                            <TouchableWithoutFeedback activeOpacity={0.3} underlayColor={'#eee'}
                                onPress={() => {
                                    this.pushPage({
                                        component: {
                                            passProps: { id: item.id },
                                            ...Global.Screens.GardenCropDetail,
                                        }
                                    });
                                }}>
                                <View style={{ borderBottomColor: '#e3e3e3', borderBottomWidth: 1, paddingLeft: 12, paddingRight: 12, paddingTop: 10 }}>

                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <Text numberOfLines={2} style={{ fontSize: 17, height: 30, lineHeight: 30 }}>
                                            {item.cropName + '/' + item.breedName}
                                        </Text>
                                        <Text numberOfLines={2} style={{ fontSize: 17, height: 30, lineHeight: 30, color: item.state == '1' ? '#49a9ee' : 'red' }}>
                                            {item.state == '1' ? '开启' : '关闭'}
                                        </Text>
                                    </View>
                                    <WhiteSpace />
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <Text style={{ color: '#49a9ee', lineHeight: 30, }}>{item.plantBaseName + '(' + item.plantBaseLandName + ')'}</Text>
                                        <Text style={{ color: '#49a9ee', lineHeight: 30, }}>{item.createTime}</Text>
                                    </View>
                                    <WhiteSpace />
                                </View>
                            </TouchableWithoutFeedback>
                        </SwipeAction>
                    }}
                />
            </View>
        );
    }
}
function mapStateToProps() {
    // return {
    // };
}
module.exports = connect(mapStateToProps)(GardenCrop);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 60
    },
    topSearch: {
        flexDirection: 'row',
    },
});
