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
import * as MineAction from 'root/src/actions/staff';
import * as DataAction from 'root/src/actions/dataAuthentication';
import moment from 'moment';
let now = moment();
const edate = now.format("YYYY-MM-DD");
const sdate = now.format("YYYY-MM") + "-01";
const Item = List.Item;
const { connect } = require('remx');
@navigatorDecorator
class ApplyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeList: [{ label: '全部', value: '' }, { label: '未审批', value: '1' }, { label: '已通过', value: '2' }, { label: '已拒绝', value: '3' }],
            startTime: sdate,
            endTime: edate,
            typeSatate: ['1']

        }
        // Navigation.mergeOptions(this.props.componentId, {
        //     topBar: {
        //         rightButtons: [
        //             addRightBtn
        //         ]
        //     }
        // });
        // Navigation.events().bindComponent(this);
    }
 
    // navigationButtonPressed() {
    //     this.pushPage({
    //         component: {
    //             passProps: { isNow: 'true', refresh: this.refresh },
    //             ...Global.Screens.StaffAdd,
    //         }
    //     });
    // }
    refresh = (searchParams) => {
        this.moreListInst._onRefresh({...searchParams, state: this.state.typeSatate[0] });
    }
    render() {
        
        clickBtnType = (item) => {
            const newApply = [
                {
                    text: '同意',
                    onPress: () => {
                        let postData  = {
                            id: item.id,
                            state: 2
                        }
                        DataAction.SetApplyState({input:postData}).then((data) => {
                            if (data.suc) {
                                this.refresh()
                            } else {
                                MyToast.info('操作失败，请稍后再试');
                            }
                        })
                    },
                    style: { backgroundColor: 'green', color: 'white' },
                },
                {
                    text: '拒绝',
                    onPress: () => {
                        Alert.alert(
                            '提示',
                            "确定拒绝申请吗？",
                            [{
                                text: '取消',
                                onPress: () => {
                                    this.loading = false
                                }
                            },
                            {
                                text: '确定',
                                onPress: () => {
                                    let postData  = {
                                        id: item.id,
                                        state: 3
                                    }
                                    DataAction.SetApplyState({input:postData}).then((data) => {
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
            ]
            const rejectApply = [
                {
                    text: '同意',
                    onPress: () => {
                        let postData  = {
                            id: item.id,
                            state: 2
                        }
                        DataAction.SetApplyState({input:postData}).then((data) => {
                            if (data.suc) {
                                this.refresh()
                            } else {
                                MyToast.info('操作失败，请稍后再试');
                            }
                        })
                    },
                    style: { backgroundColor: 'green', color: 'white' },
                },
            ]
            const haveApply = [
                {
                    text: '移除',
                    onPress: () => {
                        Alert.alert(
                            '提示',
                            "确定将此农户移除企业吗？",
                            [{
                                text: '取消',
                                onPress: () => {
                                    this.loading = false
                                }
                            },
                            {
                                text: '确定',
                                onPress: () => {
                                    let postData  = {
                                        id: item.id,
                                        state: 3
                                    }
                                    DataAction.SetApplyState({input:postData}).then((data) => {
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
            ]
            return item.state == 1 ? newApply : (item.state == 2 ? haveApply : (item.state == 3 ? rejectApply : '--'))
        }
        return (
            <View style={styles.container}>
                <View>
                    <Picker
                        title="类型"
                        data={this.state.typeList}
                        cols={1}
                        value={this.state.typeSatate}
                        onChange={(val) => this.setState({ typeSatate: val })}
                        onOk={(val) => this.setState({ typeSatate: val }, () => { this.refresh()})}
                    >
                        <Item><Text>类型</Text></Item>
                    </Picker>
                </View>
                <LoadMoreList
                    ref={ref => this.moreListInst = ref}
                    getData={DataAction.GetApplyList}
                    searchParams={{ state: this.state.typeSatate[0] }}
                    rowItem={(item) => {
                        return <SwipeAction autoClose style={{ backgroundColor: 'transparent', flex: 1 }} right={
                            clickBtnType(item)
                        } >
                            <TouchableWithoutFeedback activeOpacity={0.3} underlayColor={'#eee'}
                                // onPress={() => {
                                //     this.pushPage({
                                //         component: {
                                //             passProps: { item: item },
                                //             ...Global.Screens.ApplyDetail,
                                //         }
                                //     });
                                // }}
                            >
                                <View style={{ borderBottomColor: '#e3e3e3', borderBottomWidth: 1, paddingLeft: 12, paddingRight: 12, paddingTop: 10 }}>
                                    <Text numberOfLines={2} style={{ fontSize: 17, height: 30, lineHeight: 30 }}>
                                        {item.userInfo.userName?item.userInfo.userName:'-'}
                                    </Text>
                                    <WhiteSpace />
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <Text style={{ textAlign: 'right', lineHeight: 30, marginRight: 10 }}>{item.userInfo.phone}</Text>
                                        <Text style={{ color: item.state == 1 ? 'green' : (item.state == 2 ? '#49a9ee' : (item.state == 3 ? 'red' : '#49a9ee')), lineHeight: 30, }}>{item.state == 1 ? '未审批' : (item.state == 2 ? '已通过' : (item.state == 3 ? '已拒绝' : '--'))}</Text>
                                    </View>
                                    <WhiteSpace />
                                </View>
                            </TouchableWithoutFeedback>
                        </SwipeAction>
                    }}
                />
            </View >
        );
    }
}
function mapStateToProps() {
    // return {
    // };
}
module.exports = connect(mapStateToProps)(ApplyList);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 60
    },
    topSearch: {
        flexDirection: 'row',
    },
});
