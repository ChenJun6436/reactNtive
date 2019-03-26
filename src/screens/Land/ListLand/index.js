import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback,
    ProgressBarAndroid,
    TouchableHighlight,
    StatusBar,
    Alert
    // TouchableOpacity
} from 'react-native';
import { Button, Grid, Carousel, SearchBar, WingBlank, WhiteSpace, SwipeAction } from 'antd-mobile-rn'
import ListItem from 'root/src/screens/baseComon/ListItem'
import LoadMoreList from 'root/src/screens/baseComon/LoadMoreList.js';
import * as LandAction from 'root/src/actions/land'
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const { connect } = require('remx');
let pageIndex = 1;
// @loadingDecorator
@navigatorDecorator
class ListLand extends Component {
    constructor(props: {}) {
        super(props);
        this.state = {

        }
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                rightButtons: [
                    {
                        id: 'add',
                        text: '新增',
                        color: '#fff',
                        fontSize: 16,
                    }
                ]
            }
        });
        Navigation.events().bindComponent(this);
    }
    navigationButtonPressed({ buttonId }) {
        this.pushPage({
            component: {
                passProps: { _fresh: this._fresh },
                ...Global.Screens.AddLand,
            }
        });
    }
    componentWillMount() {
    }
    _fresh = () => {
        this.moreListInst._onRefresh();
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <LoadMoreList
                    ref={ref => this.moreListInst = ref}
                    getData={LandAction.List}
                    searchParams={{ LandName: '' }}
                    rowItem={(data) => {
                        return <SwipeAction autoClose style={{ backgroundColor: 'transparent', flex: 1 }} right={[
                            {
                                text: '编辑',
                                onPress: () => {
                                    this.pushPage({
                                        component: {
                                            ...Global.Screens.AddLand,
                                            passProps: { data: data, _fresh: this._fresh },
                                            options: {
                                                topBar: {
                                                    title: {
                                                        text: '编辑土地'
                                                    }
                                                },
                                                bottomTabs: {
                                                    visible: false,
                                                    drawBehind: true
                                                }
                                            },
                                        }
                                    });
                                },
                                style: { backgroundColor: 'orange', color: 'white' },
                            }, {
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
                                                LandAction.Delete({ input: [data.id] }).then((res) => {
                                                    if (res.suc) {
                                                        MyToast.success('操作成功');
                                                        this._fresh()
                                                    } else {
                                                        MyToast.info(res.msg);
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
                            <TouchableHighlight activeOpacity={0.3} underlayColor={'#eee'}
                                onPress={() => {
                                    this.pushPage({
                                        component: {
                                            passProps: { data: data, _fresh: this._fresh },
                                            ...Global.Screens.DetailLand,
                                        }
                                    });
                                }}>
                                <View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderBottomColor: '#e3e3e3', borderBottomWidth: 1 }}>
                                    <View>
                                        <Text numberOfLines={1}>{data.adress}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text>类型：{data.type}</Text>
                                        <Text>面积：{data.area} 亩</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text numberOfLines={1}>地块/棚号：{data.number ? data.number : '无'}</Text>
                                        <Text numberOfLines={1}>{data.createTime}</Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        </SwipeAction>
                    }}
                />
            </ScrollView >
        );
    }
}
function mapStateToProps() {
    return {
    };
}

module.exports = connect(mapStateToProps)(ListLand);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imgStyle: {
        // 设置宽度
        width: Dimensions.get('window').width,
        // 设置高度
        height: 180,
        // 设置图片填充模式
        resizeMode: 'stretch'
    },

});