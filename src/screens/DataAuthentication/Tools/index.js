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
import * as MineAction from 'root/src/actions/tools';
import moment from 'moment';
let now = moment();
const edate = now.format("YYYY-MM-DD");
const sdate = now.format("YYYY-MM") + "-01";
const Item = List.Item;
const { connect } = require('remx');
@navigatorDecorator
class ToolsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            publishState: [''],
            typeList: [{ label: '全部', value: '' }, { label: '工人', value: '1' }, { label: '客户', value: '2' }],
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
                ...Global.Screens.ToolsAdd,
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
                    <Picker
                        title="类型"
                        data={this.state.typeList}
                        cols={1}
                        value={this.state.publishState}
                        onChange={(val) => this.setState({ publishState: val })}
                        onOk={(val) => this.setState({ publishState: val }, () => { this.refresh({ type: this.state.publishState[0] }); })}
                    >
                        <Item><Text>类型</Text></Item>
                    </Picker>
                </View> */}
                <LoadMoreList
                    ref={ref => this.moreListInst = ref}
                    getData={MineAction.ToolsList}
                    // searchParams={{  }}
                    rowItem={(item) => {
                        return <SwipeAction autoClose style={{ backgroundColor: 'transparent', flex: 1 }} right={[
                            {
                                text: '编辑',
                                onPress: () => {
                                    this.pushPage({
                                        component: {
                                            passProps: { isNow: 'true', refresh: this.refresh, id: item.id },
                                            ...Global.Screens.ToolsAdd,
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
                                                MineAction.ToolsDelete( {ids: [item.id]} ).then((data) => {
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
                                            ...Global.Screens.ToolsDetail,
                                        }
                                    });
                                }}>
                                <View style={{ borderBottomColor: '#e3e3e3', borderBottomWidth: 1, paddingLeft: 12, paddingRight: 12, paddingTop: 10 }}>
                                    <Text numberOfLines={2} style={{ fontSize: 17, height: 30, lineHeight: 30 }}>
                                        {item.name}
                                    </Text>
                                    <WhiteSpace />
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <Text style={{ textAlign: 'right', lineHeight: 30, marginRight: 10 }}>{item.typeStr}</Text>
                                        <Text style={{ color: '#49a9ee', lineHeight: 30, }}>{item.quantity + ' / ' + item.unit }</Text>
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
module.exports = connect(mapStateToProps)(ToolsList);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 60
    },
    topSearch: {
        flexDirection: 'row',
    },
});