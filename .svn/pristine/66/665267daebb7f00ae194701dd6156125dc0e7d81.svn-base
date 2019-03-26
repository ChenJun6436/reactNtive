// @flow

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';
import { List, InputItem, Button, SwipeAction, WhiteSpace, Picker, DatePicker } from 'antd-mobile-rn';
import Icon from 'react-native-vector-icons/FontAwesome';
import { iconsMap, iconsLoaded } from 'root/src/utils/IconLoader';
import LoadMoreList from 'root/src/screens/baseComon/LoadMoreList.js';
import * as MineAction from 'root/src/actions/intRecord';
import SearchLinputRbutton from 'root/src/screens/baseComon/SearchLinputRbutton.js'
import CropStore from 'root/src/stores/crop';
import moment from 'moment';
let now = moment();
const edate = now.format("YYYY-MM-DD");
const sdate = now.format("YYYY-MM") + "-01";
const Item = List.Item;
const { connect } = require('remx');
@navigatorDecorator
class IntBuyRecordBuy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
        }
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                rightButtons: [
                    
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
                ...Global.Screens.IntBuyRecordAdd,
            }
        });
    }
    refresh = (searchParams) => {
        this.moreListInst._onRefresh(searchParams);
    }
    //搜索农资产品
    _search = (content) => {
        this.setState({
            content
        },(prevState)=>{
            this.moreListInst._onRefresh({ search: this.state.content, goodsCodeType: this.props.type});
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <SearchLinputRbutton ref={ref => this.searchItem = ref} content={this.state.content} search={this._search} />
                <LoadMoreList
                    ref={ref => this.moreListInst = ref}
                    getData={MineAction.SearchGoodsList}
                    searchParams={{ search: this.state.content, goodsCodeType: this.props.type }}
                    rowItem={(item) => {
                        return (
                            <TouchableWithoutFeedback activeOpacity={0.3}  underlayColor='#eee'
                                onPress={() => {
                                    CropStore.setClickCrop(item)
                                    this.pop()
                                }}>
                                <View style={{ borderBottomColor: '#e3e3e3', borderBottomWidth: 1, paddingLeft: 12, paddingRight: 12, paddingTop: 10 }}>
                                    <Text numberOfLines={2} style={{ fontSize: 17, height: 30, lineHeight: 30 }}>
                                        {(item.goodName?item.goodName:'') +''+ (item.registerName?'('+item.registerName+')':'')}
                                    </Text>
                                    <WhiteSpace />
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                        <Text style={{ textAlign: 'right', lineHeight: 30, marginRight: 10 }}>登记证：{item.registerID}</Text>
                                        <Text style={{ color: '#49a9ee',lineHeight: 30, }}>{item.productSType}</Text>
                                    </View>
                                    <WhiteSpace />
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }}
                />
            </View>
        );
    }
}
function mapStateToProps() {
    return {
        cropData: CropStore.getClickCrop()
    };
}
module.exports = connect(mapStateToProps)(IntBuyRecordBuy);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 60
    },
    topSearch: {
        flexDirection: 'row',
    },
});
