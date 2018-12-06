/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Animated,
    TouchableHighlight
} from 'react-native';
import moment from 'moment';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Button, SwipeAction, WhiteSpace } from 'antd-mobile-rn';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import StoreItem from 'root/src/screens/baseComon/storeItem'
import HotProduct from 'root/src/screens/baseComon/hotProduct'
import * as StoreAction from 'root/src/actions/store'
import LoadMoreList from 'root/src/screens/baseComon/LoadMoreList.js';
import Icon from 'react-native-vector-icons/Feather';
const { connect } = require('remx');
import AppStore from 'root/src/stores/app';
// @loadingDecorator
@navigatorDecorator
class BuyProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            distance: '',
            type: '',
            routes: [
                { key: 'first', title: '周边农资店' },
                { key: 'second', title: '热销农资' },
            ],
        };

    }
    componentWillMount() { }
    changeType = (type) => {
        if (type == 1) {
            this.setState({
                distance: '2.2',
                type: '',
            })
        }
        // if (type == 2) {
        //     this.setState({
        //         distance: '6.2',
        //         type: FarmerViewAmount,
        //     })
        // }
        if (type == 3) {
            this.setState({
                distance: '12.2',
                type: 'FarmerViewAmount',
            })
        }
    }
    refresh = () => {
        this.moreStoreListInst._onRefresh();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.byLocation == false && nextProps.cityName && this.props.cityName != nextProps.cityName) {
            let self = this;
            if (this.props.buyProductTopIndex == 0)
                getCityLocation(nextProps.cityName, () => { self.moreStoreListInst._onRefresh({ longitude: storage.get('longitude'), latitude: storage.get('latitude') }) });
            else
                getCityLocation(nextProps.cityName, () => { self.moreListInst._onRefresh({ regionId: storage.get('regionId') }) });
        }
    }
    addStore =()=>{
        this.pushPage({
            component: {
                ...Global.Screens.AddStore,
            }
        });
    }
    render() {
        let FirstRoute = () => (
            <View style={styles.container} >
            
                <View style={styles.searchBtn}>
                    <Button style={[styles.btn, { borderBottomColor: this.state.type == '' ? '#7bb046' : '#eee' }]} onClick={() => { this.changeType(1) }}><Text style={[styles.btnText, { color: '#999' }]}>距离</Text></Button>
                    {/* <Button style={[styles.btn, { borderBottomColor: this.state.type == 2 ? '#7bb046' : '#eee' }]} onClick={() => { this.changeType(2) }}><Text style={[styles.btnText, { color: '#999' }]}>销量</Text></Button> */}
                    <Button style={[styles.btn, { borderBottomColor: this.state.type == 'FarmerViewAmount' ? '#7bb046' : '#eee' }]} onClick={() => { this.changeType(3) }}><Text style={[styles.btnText, { color: '#999' }]}>查看量</Text></Button>
                </View>
                    
                <LoadMoreList
                    ref={ref => this.moreStoreListInst = ref}
                    getData={StoreAction.SearchNearByStore}
                    searchParams={{ longitude: storage.get('longitude'), latitude: storage.get('latitude') ,sort: this.state.type}}
                    rowItem={(data) => {
                        return <SwipeAction autoClose style={{ backgroundColor: 'transparent', flex: 1 }} right={[
                            {
                                text: '详情',
                                onPress: () => {
                                    this.pushPage({
                                        component: {
                                            passProps: { id: data.id },
                                            ...Global.Screens.StoreDetail,
                                            options: {
                                                topBar: {
                                                    title: {
                                                        text: data.name
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
                            }
                        ]} >
                            <TouchableHighlight activeOpacity={0.3} underlayColor={'#eee'}
                                onPress={() => {
                                    this.pushPage({
                                        component: {
                                            passProps: { id: data.id },
                                            ...Global.Screens.StoreDetail,
                                            options: {
                                                topBar: {
                                                    title: {
                                                        text: data.name
                                                    }
                                                },
                                                bottomTabs: {
                                                    visible: false,
                                                    drawBehind: true
                                                }
                                            },
                                        }
                                    });
                                }}>
                                <StoreItem content={data} />
                            </TouchableHighlight>
                        </SwipeAction>
                    }}
                />
                <TouchableOpacity onPress={this.addStore} style={{position:'absolute',right:0,top: '50%',width:40,height:40,backgroundColor:'#fff',borderRadius:20}}>
                <View >
                    <Text style={{ textAlign: 'center', color: '#000'}}><Icon name='plus-circle' color={'#89bf04'} size={40} /></Text>
                </View>
            </TouchableOpacity>
            </View>
        );
        let SecondRoute = () => (
            <View style={[styles.container]} >
                <LoadMoreList
                    ref={ref => this.moreListInst = ref}
                    getData={StoreAction.SearchGoods}
                    searchParams={{ regionId: storage.get('regionId') }}
                    rowItem={(data) => {
                        return <SwipeAction autoClose style={{ backgroundColor: 'transparent', flex: 1 }} right={[
                            {
                                text: '详情',
                                onPress: () => {
                                    this.pushPage({
                                        component: {
                                            passProps: { id: data.id, registerNumber: data.registerNumber },
                                            ...Global.Screens.ProductDetail,
                                            options: {
                                                topBar: {
                                                    title: {
                                                        text: data.goodsName
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
                            }
                        ]} >
                            <TouchableHighlight activeOpacity={0.3} underlayColor={'#eee'}
                                onPress={() => {
                                    this.pushPage({
                                        component: {
                                            passProps: { id: data.id, registerNumber: data.registerNumber },
                                            ...Global.Screens.ProductDetail,
                                            options: {
                                                topBar: {
                                                    title: {
                                                        text: data.goodsName
                                                    }
                                                },
                                                bottomTabs: {
                                                    visible: false,
                                                    drawBehind: true
                                                }
                                            },
                                        }
                                    });
                                }}>
                                <HotProduct content={data} />
                            </TouchableHighlight>
                        </SwipeAction>
                    }}
                />
            </View>
        );

        return (
            // <View style={styles.container}>
            <TabView
                navigationState={{ ...this.state, index: this.props.buyProductTopIndex }}
                renderScene={
                    SceneMap({
                        first: FirstRoute,
                        second: SecondRoute,
                    })
                }
                renderTabBar={props =>
                    <TabBar
                        {...props}
                        style={{ backgroundColor: '#7bb046' }}
                        labelStyle={{ fontSize: 17 }}
                    />
                }
                onIndexChange={index => AppStore.setBuyProductTopIndex(index)}
                initialLayout={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
            />
            // </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        // paddingTop: Constants.statusBarHeight,
        backgroundColor: 'green'
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    searchBtn: {
        width: SCREEN_WIDTH,
        flexDirection: 'row',
    },
    btn: {
        width: SCREEN_WIDTH / 2,
        borderRadius: 0,
        borderWidth: 0,
        borderBottomWidth: 3,
        borderRightWidth: 1
    },
    btnText: {
        fontSize: 14,
        fontWeight: 'normal',
    }
});
function mapStateToProps() {
    return {
        buyProductTopIndex: AppStore.getBuyProductTopIndex(),
        cityName: AppStore.getCityName(),
        byLocation: AppStore.getByLocation(),
    };
}

module.exports = connect(mapStateToProps)(BuyProduct);
