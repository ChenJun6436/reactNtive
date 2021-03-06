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
import SearchLinputRbutton from 'root/src/screens/baseComon/SearchLinputRbutton.js'
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
            enterpriseId: null,
            enterpriseType: 0,
            content: '',
        }
        Navigation.mergeOptions(this.props.componentId, null);
        Navigation.events().bindComponent(this);
    }

    navigationButtonPressed({ buttonId }) {
        if (this.loading) {
            return false
        }
        if (this.state.enterpriseId && this.state.enterpriseType == 3) {//解绑
            this.loading = true
            this.deleteEnterprise(this.state.enterpriseId)
        } else {
        }
    }

    componentWillMount() {
        this.reloadPage()
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
                                that.loading = false
                                storage.set('enterpriseId', null)
                                storage.set('enterpriseType', 1)
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
    reloadPage = () => {
        this._search()
        this.setState({ 
            enterpriseId: storage.get('enterpriseId') ,
            enterpriseType: storage.get('enterpriseType') ,
        })
    }
    //搜索企业
    _search = (content) => {
        this.setState({
            content
        }, (prevState) => {
            this.moreBaseList._onRefresh({ name: this.state.content });
        })
    }
    render() {
        if (this.state.enterpriseId && this.state.enterpriseType == 3) {
            Navigation.mergeOptions(this.props.componentId, {
                topBar: {
                    rightButtons: [{
                        ...confirmRightBtn,
                        text: '解绑'
                    }]
                }
            });
            return (
                <EnterpriseSituation state={3} enterpriseId={this.state.enterpriseId} componentId={this.props.componentId} />
            )
        } else {
            Navigation.mergeOptions(this.props.componentId, {
                topBar: {
                    rightButtons: [{
                        text: null
                    }]
                }
            });
            return (
                <ScrollView style={styles.container}>
                    <SearchLinputRbutton ref={ref => this.searchItem = ref} content={this.state.content} search={this._search} />
                    <LoadMoreList
                        ref={ref => this.moreBaseList = ref}
                        getData={DataAction.getEnterpriseList}
                        searchParams={{ name: '' }}
                        rowItem={(data) => {
                            return <SwipeAction autoClose style={{ backgroundColor: 'transparent', flex: 1 }} right={[
                                {
                                    text: data.state == 0 ? '申请加入' : (data.state == 1 ? '正在审核' : (data.state == 2 ? '绑定' : (data.state == 3 ? '申请加入' : '未申请'))),
                                    onPress: () => {
                                        if (data.state == 0 || data.state == 3) {
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
                                                            enterpriseId: data.id,
                                                            state: 1,
                                                        }
                                                        DataAction.SetState({ input: postData }).then((data) => {
                                                            if (data.suc) {
                                                                MyToast.success('申请成功');
                                                                this.refresh()
                                                            } else {
                                                                MyToast.info(data.msg)
                                                            }
                                                        })
                                                    }
                                                }
                                                ]
                                            );
                                        } else if (data.state == 2) {
                                            Alert.alert(
                                                '提示',
                                                "确定绑定该企业吗？",
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
                                                                if (datas.suc) {
                                                                    MyToast.success('绑定成功');
                                                                    storage.set('enterpriseId',data.id)    
                                                                    storage.set('enterpriseType', 3)
                                                                    this.reloadPage()
                                                                } else {
                                                                    MyToast.info(datas.msg);
                                                                }
                                                            }
                                                        )
                                                    }
                                                }
                                                ]
                                            );
                                        }
                                    },
                                    style: { backgroundColor: data.state == 0 ? 'green' : (data.state == 1 ? '#9ea2a5' : (data.state == 2 ? 'orange' : (data.state == 3 ? 'green' : 'green'))), color: 'white' },
                                }
                            ]} >
                                <TouchableHighlight activeOpacity={0.3} underlayColor={'#eee'}
                                    onPress={() => {
                                        this.pushPage({
                                            component: {
                                                passProps: {
                                                    enterpriseId: data.id,
                                                    enterpriseNotReady: true,  //有这个flag表示是列表点进去看的详情  不是绑定后的详情
                                                    reloadPage: this.reloadPage,
                                                    state: data.state
                                                },
                                                ...Global.Screens.EnterpriseSituation,
                                                options: {
                                                    topBar: {
                                                        title: {
                                                            text: '企业'
                                                        },
                                                        rightButtons: [{
                                                            ...confirmRightBtn,
                                                            text: data.state == 0 ? '申请加入' : (data.state == 1 ? '' : (data.state == 2 ? '绑定' : (data.state == 3 ? '申请加入' : '申请加入')))
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
                                    <ListItem firstItem={data.name} thirdItem={data.legalPerson}  secondItem={data.state == 0 ? '未申请' : (data.state == 1 ? '已申请' : (data.state == 2 ? '已通过' : (data.state == 3 ? '已拒绝' : '未申请')))} fourthItem={data.createTime} />
                                </TouchableHighlight>
                            </SwipeAction>
                        }}
                    />
                </ScrollView >
            );
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