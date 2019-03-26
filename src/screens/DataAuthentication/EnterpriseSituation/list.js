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
} from 'react-native';
import { Button, Grid, Carousel, SearchBar, WingBlank, WhiteSpace, SwipeAction } from 'antd-mobile-rn'
import ListItem from 'root/src/screens/baseComon/ListItem'
import LoadMoreList from 'root/src/screens/baseComon/LoadMoreList.js';
import * as DataAction from 'root/src/actions/dataAuthentication';
import CropStore from 'root/src/stores/crop';
import EnterpriseSituation from './index.js'
import pesticidesStore from 'root/src/stores/pesticides';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const { connect } = require('remx');
let pageIndex = 1;
// @loadingDecorator

//企业列表
@navigatorDecorator
class EnterpriseList extends Component {
    constructor(props: {}) {
        super(props);
        this.loading = false
        this.state = {
            enterpriseId:null,
        }
        Navigation.mergeOptions(this.props.componentId, null);
        Navigation.events().bindComponent(this);
    }

    navigationButtonPressed({ buttonId }) {
        if(this.loading){
            return false
        }
        if (this.state.enterpriseId){//解绑
            this.loading = true
            this.deleteEnterprise(this.state.enterpriseId)
        }else{
        }
    }

    componentWillMount() {
        this.setState({
            enterpriseId: storage.get('enterpriseId'),
        })
       
    }
    refresh = () => {
        this.moreBaseList._onRefresh();
    }

    //解绑
    deleteEnterprise = (id) => {
        Alert.alert(
            '提示',
            "确定解绑企业吗？",
            [{
                    text: '取消',
                    onPress: () => {
                        this.loading = false
                    }
                },
                {
                    text: '确定',
                    onPress: () => {
                        DataAction.DeleteEnterprise({
                            idList: [id]
                        }).then((data) => {
                            if (data.suc) {
                                let that = this
                                MyToast.info('解绑成功');
                                setTimeout(() => {
                                    this.loading = false
                                    // storage.cache.account.enterpriseId = null
                                    storage.set('enterpriseId', null)
                                    that.reloadPage()
                                }, 2000)
                                
                            } else {
                                this.loading = false
                                MyToast.info(data.msg);
                            }
                        })
                    }
                }
            ]
        );
        
    }

    //重新加载页面
    reloadPage = () =>{
        this.setState({enterpriseId:storage.get('enterpriseId')})
    }
    render() {
        if(!this.state.enterpriseId){
            Navigation.mergeOptions(this.props.componentId, {
                topBar: {
                    rightButtons: [{
                        
                        text: null
                    }]
                }
            });
            return (
                <ScrollView style={styles.container}>
                    <LoadMoreList
                        ref={ref => this.moreBaseList = ref}
                        getData={DataAction.getEnterpriseList}
                        searchParams={{ name: '' }}
                        rowItem={(data) => {
                            return <SwipeAction autoClose style={{ backgroundColor: 'transparent', flex: 1 }} right={[
                                {
                                    text: '绑定',
                                    onPress: () => {
                                        Alert.alert(
                                            '提示',
                                            "确定绑定企业吗？",
                                            [{
                                                    text: '取消',
                                                    onPress: () => {
                                                        
                                                    }
                                                },
                                                {
                                                    text: '确定',
                                                    onPress: () => {
                                                        DataAction.AddEnterprise({ idList: [data.id] }).then(
                                                            (datas) => {
                                                                if(datas.suc){
                                                                    storage.set('enterpriseId', data.id)
                                                                    MyToast.success('绑定成功');
                                                                    setTimeout(()=>{
                                                                        this.setState({enterpriseId:data.id})
                                                                    },2000)
                                                                    
                                                                }else{
                                                                    MyToast.info(datas.msg);
                                                                }
                                                            }
                                                        )
                                                    }
                                                }
                                            ]
                                        );
                                        
                                    },
                                    style: { backgroundColor: 'orange', color: 'white' },
                                }
                            ]} >
                                <TouchableHighlight activeOpacity={0.3} underlayColor={'#eee'}
                                    onPress={() => {
                                        this.pushPage({
                                            component: {
                                                passProps: {
                                                    enterpriseId:data.id,
                                                    enterpriseNotReady:true,  //有这个flag表示是列表点进去看的详情  不是绑定后的详情
                                                    reloadPage:this.reloadPage
                                                },
                                                ...Global.Screens.EnterpriseSituation,
                                                options: {
                                                     topBar: {
                                                         title:{
                                                             text: '企业'
                                                         },
                                                         rightButtons: [{
                                                             ...confirmRightBtn,
                                                             text: '绑定'
                                                         }]
                                                     },
                                                    bottomTabs: {
                                                        visible: false,
                                                        drawBehind: true
                                                    } 
                                                },
                                            }
                                        });
                                    }}>
                                    <ListItem firstItem={data.name} secondItem={data.legalPerson} thirdItem={data.brand} fourthItem={data.createTime}/>
                                </TouchableHighlight>
                            </SwipeAction>
                        }}
                    />
                </ScrollView >
            );
        }else{
            Navigation.mergeOptions(this.props.componentId, {
                topBar: {
                    rightButtons: [{
                        ...confirmRightBtn,
                        text: '解绑'
                    }]
                }
            });
            return (
                    < EnterpriseSituation enterpriseId={this.state.enterpriseId} componentId={this.props.componentId} />
            )
        }
    }
}
function mapStateToProps() {
    return {

    };
}

module.exports = connect(mapStateToProps)(EnterpriseList);

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