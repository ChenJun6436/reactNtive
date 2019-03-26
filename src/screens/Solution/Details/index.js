import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ScrollView,
    Image,
    WebView
} from 'react-native';
// import { inject, observer } from 'mobx-react/native';
import { SearchBar, WhiteSpace, WingBlank, List, Button, InputItem, Carousel } from 'antd-mobile-rn';
import Icon from 'react-native-vector-icons/FontAwesome';
import { iconsMap, iconsLoaded } from 'root/src/utils/IconLoader';
import DetailItem from 'root/src/screens/baseComon/DetailItem.js';
import * as SolutionAction from 'root/src/actions/solution';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const Item = List.Item;

@loadingDecorator @navigatorDecorator
export default class SolutionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: {},
            loading: true
        }
        // Navigation.mergeOptions(this.props.componentId, {
        //     topBar: {
        //         rightButtons: [{
        //             confirmRightBtn, text: '上传图片'
        //         }]
        //     }
        // });
        // Navigation.events().bindComponent(this);

    }
    // navigationButtonPressed({ buttonId }) {
    //     this.pushPage({
    //         component: {
    //             ...Global.Screens.ERPUploadImage,
    //             passProps: { pestId: this.state.model.id, pestName: this.state.model.pest, plantName: this.state.model.crop }
    //         }
    //     });

    // }
    componentWillMount() {
        this.props.hasReadSolution && this.props.hasReadSolution();
        SolutionAction.GetDetail({ id: this.props.id }).then((data) => {
            if (data.data) {
                this.props.refresh && this.props.refresh();
                this.props._fresh && this.props._fresh()
                this.setState({ model: data.data })
            }
            else {
                MyToast.info('暂无数据！稍后尝试');
            }
            this.setState({ loading: false })
        })
    }
    render() {
        let model = this.state.model ? this.state.model : {};
        const HTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta name="content-type" content="text/html; charset=utf-8">
                <meta http-equlv="Content-Type" content="text/html;charset=utf-8">     
                <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">       
                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
            </head>
            <style>
             html,body{
                 width:`+ Dimensions.get('window').width + `
             }
             img { -ms-interpolation-mode: bicubic; }

             img { width: 100%!important;height:auto!important }
            </style>
            <body>`  + model.messageContent + ` </body>   </html>  `;
        return (
            <ScrollView style={{ backgroundColor: '#f2f2f2', position: 'relative', height: SCREEN_HEIGHT }}>
                <View style={styles.search}>
                    {
                        model.defaultImgUrl ?
                            <Image
                                key={model.defaultImgUrl}
                                source={{ uri: model.defaultImgUrl }}
                                style={styles.imgStyle}
                            />
                            : <Image
                                source={require('root/img/nopic.gif')}
                                style={styles.imgStyle}
                            />
                    }
                </View>
                <View style={styles.container}>
                    <DetailItem title="标题" content={model.title} />
                    <DetailItem title="类型" content={model.messageTypeName} />
                    <DetailItem title="推送单位" content={model.sendUnit} />
                    <DetailItem title="备注" content={model.messageContentRemark} top={8} />
                    {/* <DetailItem title="内容" content={model.messageContent} top={8} /> */}
                    <WebView
                        style={{
                            // backgroundColor: BGWASH,
                            minHeight: 500,
                            width: Dimensions.get('window').width,
                        }}
                        source={{ html: HTML, baseUrl: '' }}
                        scalesPageToFit={true}
                    />
                </View>
            </ScrollView >
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10,
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