import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, SwipeAction, InputItem } from 'antd-mobile-rn';
import LoadMoreList from 'root/src/screens/baseComon/LoadMoreList.js';
import StoreList from 'root/src/screens/baseComon/StoreList.js';
import { iconsMap, iconsLoaded } from 'root/src/utils/IconLoader';
import * as PortraitAction from 'root/src/actions/farmersPortrait';
import SearchRecord from './Search';

//供应商管理
@navigatorDecorator
export default class Supplier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supplierName: "",
            addressString: "",
            recordVisible: false,
        }
    }

    refresh = () => {
        this.moreListInst._onRefresh();
    }
    setVisible = () => {
        this.setState({
            recordVisible: !this.state.recordVisible
        })
    }
    getStoreByMember = (item) => {
        this.setState({
            storeName: item.storeName,
            startTime: item.startTime,
            endTime: item.endTime,
        }, this.refresh)

        this.setState({ recordVisible: false })
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.search}>
                    <Button style={{ height: 40, width: '20%' }} onClick={this.setVisible}><Text style={{ fontWeight: 'bold', color: '#999999' }} >筛选</Text></Button>
                    <InputItem
                        style={{ height: 40, width: '80%', backgroundColor: 'transparent', borderBottomWidth: 1, borderColor: '#bbbbbb', }}
                        clear
                        value={this.state.storeName}
                        onChange={(value: any) => {
                            this.setState({
                                storeName: value,
                            });
                        }}
                        labelNumber={2}
                        placeholder='请输入用户名'
                        placeholderTextColor='#999999'
                    >
                        <Icon
                            name='search'
                            color='#999999'
                            size={25}
                        />
                    </InputItem>
                </View>
                <LoadMoreList
                    ref={ref => this.moreListInst = ref}
                    getData={PortraitAction.getMemberOrder}
                    searchParams={{ storeId: this.state.storeId }}
                    rowItem={(data) => {
                        return <SwipeAction autoClose style={{ backgroundColor: 'transparent', flex: 1 }} right={[
                            {
                                text: '详情',
                                onPress: () => {
                                    this.pushPage({
                                        component: {
                                            ...Global.Screens.RecordDetail
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
                                            ...Global.Screens.RecordDetail
                                        }
                                    });
                                }}>

                                <StoreList
                                    firstItem={data.orderNo}
                                    secondItem={'实付金额：' + data.actualPayAmount}
                                    thirdItem={'购买数量：' + data.goodsQuantity}
                                    fourthItem={data.orderTime}
                                />
                            </TouchableHighlight>
                        </SwipeAction>
                    }}
                />
                <SearchRecord
                    visible={this.state.recordVisible}
                    title={'ninhao'}
                    handleCancel={() => { this.setState({ recordVisible: false }) }}
                    getStoreByMember={this.getStoreByMember}
                    content={
                        <View>
                            <Text>hello,world!!!!!</Text>
                        </View>
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    search: {
        // flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        flexDirection: 'row',
        margin: 10,
    },
    button: {
        width: 100,
    }
});
