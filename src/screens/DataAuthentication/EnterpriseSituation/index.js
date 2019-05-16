import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    // Image,
    ScrollView,
    TextInput,
    Alert,
    // Dimensions,
    // TouchableWithoutFeedback,
    // ProgressBarAndroid,
    // TouchableHighlight,
    // StatusBar
} from 'react-native';
import { List, InputItem, TextareaItem, DatePicker, Picker, ImagePicker, Button, Accordion, SwipeAction } from 'antd-mobile-rn'
// import ListItem from 'root/src/screens/baseComon/ListItem'
// import LoadMoreList from 'root/src/screens/baseComon/LoadMoreList.js';
import DetailItem from 'root/src/screens/baseComon/DetailItem.js';
import * as DataAction from 'root/src/actions/dataAuthentication';
// import CropStore from 'root/src/stores/crop';
// import pesticidesStore from 'root/src/stores/pesticides';
// const SCREEN_WIDTH = Dimensions.get('window').width;
// const SCREEN_HEIGHT = Dimensions.get('window').height;
const { connect } = require('remx');
const Item = List.Item;
// let pageIndex = 1;

// @loadingDecorator

//企业情况
@navigatorDecorator
class EnterpriseSituation extends Component {
    constructor(props: {}) {
        super(props);
        this.state = {
            data:{},
            enterpriseId:null
        }
        // Navigation.mergeOptions(this.props.componentId, null);
        Navigation.events().bindComponent(this)

    }
    navigationButtonPressed({ buttonId }) {
        if (this.props.enterpriseNotReady){
            if (this.props.state == 0 || this.props.state == 3) {
                Alert.alert(
                    '提示',
                    "确定申请加入该企业吗？",
                    [{
                        text: '取消',
                        onPress: () => {

                        }
                    },
                    {
                        text: '确定',
                        onPress: () => {
                            let postData = {
                                isUnit: true,
                                enterpriseId: this.state.enterpriseId,
                                state: 1,
                            }
                            DataAction.SetState({ input: postData }).then((data) => {
                                if (data.suc) {
                                    MyToast.success('申请成功');
                                    setTimeout(() => {
                                        this.props.reloadPage()
                                        this.pop()
                                    }, 1000)
                                } else {
                                    MyToast.info(data.msg)
                                }
                            })
                        }
                    }
                    ]
                );
            } else if (this.props.state == 2) {
                Alert.alert(
                    '提示',
                    "确定绑定企业吗？",
                    [   
                        {
                            text: '取消',
                            onPress: () => {
                                
                            }
                        },
                        {
                            text: '确定',
                            onPress: () => {
                                DataAction.AddEnterprise({ idList: [this.state.enterpriseId] }).then((datas)=>{
                                    if (datas.suc) {
                                        storage.set('enterpriseId',this.state.enterpriseId)    
                                        storage.set('enterpriseType', 3)
                                        MyToast.success('绑定成功');
                                        setTimeout(() => {
                                            this.props.reloadPage()
                                            this.pop()
                                        }, 2000)
                                    } else {
                                        MyToast.info(datas.msg);
                                    }
                                })
                            }
                        }
                    ],
                    { cancelable: false },
                );
            }
        }else{

        }
        
    }
    componentWillMount() {
        this.setState({
            enterpriseId: this.props.enterpriseId
        }, () => this.getEnterpriseSituation(this.state.enterpriseId))
        
    }
    
    //获取企业详情
    getEnterpriseSituation = (id) => {
        DataAction.GetEnterpriseSituation(id).then((data) => {
            if (data.suc) {
                this.setState({
                    data: data.data
                })
            }else{
                MyToast.info(data.msg);
            }
        })
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <List>
                    <DetailItem title="名称" content={this.state.data.name} />
                    <DetailItem title="品牌信息" content={this.state.data.brand} />
                    <DetailItem title="企业类型" content={this.state.data.enterpriseType == 1?'个体户':'合作社'} />
                    <DetailItem title="注册资本" content={this.state.data.registeredCapital} />
                    <DetailItem title="成立日期" content={this.state.data.establishmentDate} />
                    <DetailItem title="营业起始日期" content={this.state.data.businessStartTime} />
                    <DetailItem title="营业终止日期" content={this.state.data.businessEndTime} />
                    <DetailItem title="登记机关" content={this.state.data.registryOffice} />
                    <DetailItem title="核准日期" content={this.state.data.approvalDate} />
                    <DetailItem title="经营范围" content={this.state.data.businessScope} />
                    {/* <DetailItem title="地区" content={this.state.data.provinceName + '' + this.state.data.cityName  +''+ this.state.data.countyCode  } /> */}
                    <DetailItem title="地址" content={this.state.data.address} />
                    {/* <DetailItem title="经度" content={this.state.data.lng} /> */}
                    {/* <DetailItem title="纬度" content={this.state.data.lat} /> */}
                    <DetailItem title="组织结构代码" content={this.state.data.orgainzingCode} />
                    <DetailItem title="法人代表" content={this.state.data.legalPerson} />
                    <DetailItem title="会员数量" content={this.state.data.memberAmount} />
                    <DetailItem title="联系方式" content={this.state.data.contact} />
                    {this.state.data.hasBind?(
                        <DetailItem title="当前状态" content={'已绑定'} />
                    ):(
                        <DetailItem title="当前状态" content={this.state.data.state == 0 ? '未申请' : (this.state.data.state == 1 ? '已申请' : (this.state.data.state == 2 ? '已通过' : (this.state.data.state == 3 ? '已拒绝' : '未申请')))} />
                    )}
                </List>
            </ScrollView >
        );
    }
}
function mapStateToProps() {
    return {

    };
}

module.exports = connect(mapStateToProps)(EnterpriseSituation);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF'
    },

});