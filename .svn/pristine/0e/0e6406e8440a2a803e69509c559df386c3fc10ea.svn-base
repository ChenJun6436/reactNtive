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
import * as MineAction from 'root/src/actions/control';
import moment from 'moment';
let now = moment(new Date());
const Item = List.Item;
const { connect } = require('remx');
@navigatorDecorator
class ControlList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            publishState: [''],
            typeList: [{ label: '全部', value: '' }, { label: '已发布', value: '1' }, { label: '未发布', value: '2' }],
            startTime: now,

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
                ...Global.Screens.ControlAdd,
            }
        });
    }
    refresh = (searchParams) => {
        this.moreListInst._onRefresh(searchParams);
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View>
                        <DatePicker
                            value={ this.state.startTime ? new Date(this.state.startTime)  : null}
                            mode="year"
                            minDate={new Date('2000-01-01')}
                            maxDate={new Date()}
                            onChange={ 
                                (text) => {
                                    this.setState(
                                        { 
                                            startTime: text  
                                        }, () => {
                                            this.refresh({ year: moment(this.state.startTime).year()  }) 
                                        }
                                    )
                                }
                            }
                            format={ val =>  moment(val).format('YYYY') }
                        >
                            <Item arrow="horizontal" ><Text style={{ color: 'gray' }}>防控时间</Text></Item>
                        </DatePicker>
                    </View>
                </View>
                <LoadMoreList
                    ref={ref => this.moreListInst = ref}
                    getData={MineAction.ControlList}
                    searchParams={{ year: moment(this.state.startTime).year()  }}
                    rowItem={(item) => {
                            return <SwipeAction autoClose style={{ backgroundColor: 'transparent', flex: 1 }} right={[
                            {
                                text: '编辑',
                                onPress: () => {
                                    this.pushPage({
                                        component: {
                                            passProps: { isNow: 'true', refresh: this.refresh, cropName: item.cropName ,year: item.year },
                                            ...Global.Screens.ControlAdd,
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
                                                MineAction.ControlDelete({
                                                    input: {
                                                        cropNames: [
                                                          item.cropName
                                                        ],
                                                        year: item.year
                                                    }
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
                                            passProps: { cropName: item.cropName ,year: item.year },
                                            ...Global.Screens.ControlDetail,
                                        }
                                    });
                                }}>
                                <View style={{ borderBottomColor: '#e3e3e3', borderBottomWidth: 1, paddingLeft: 12, paddingRight: 12, paddingTop: 10 }}>

                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <Text numberOfLines={2} style={{ fontSize: 17, height: 30, lineHeight: 30 }}>
                                            {item.cropName}
                                        </Text>
                                    </View>
                                    <WhiteSpace />
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <Text numberOfLines={2} style={{ fontSize: 17, height: 30, lineHeight: 30 }}>
                                            面积： {item.totalArea +''} 亩
                                        </Text>
                                        <Text style={{ color: '#49a9ee', lineHeight: 30, }}>{item.year +'年'}</Text>
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
module.exports = connect(mapStateToProps)(ControlList);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 60
    },
    topSearch: {
        flexDirection: 'row',
    },
});
