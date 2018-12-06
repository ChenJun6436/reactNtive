import React, { Component } from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Text,
    WebView,
} from 'react-native';
import DetailItem from 'root/src/screens/baseComon/DetailItem.js';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import * as QrCodeAction from 'root/src/actions/qrCode';
import store from 'root/src/stores/account';
const { connect } = require('remx');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
class Web extends Component {
    constructor(props: Props) {
        super(props);
        this.state = {
            model: null,
            index: 0,
            routes: [
                { key: 'first', title: '风险提示' },
                { key: 'second', title: '追溯页面' },
            ],
        };

    }
    componentWillMount() {
        let input = {
            deviceNo: "1234567890",
            userId: this.props.userInfo.userID,
            userName: this.props.userInfo.loginName,
            qrCode: this.props.url,
            searchSourceType: 2
        }
        QrCodeAction.AddSearchLog({ input }).then((suc) => { })
    }
    render() {
        let FirstRoute = () => (
            <ScrollView style={{ backgroundColor: '#f2f2f2' }}>
                {
                    this.props.data && this.props.data.length > 0 ? this.props.data.map((item, index) => {
                        return <View style={styles.container} key={index}>
                            <View style={styles.row}>
                                <Text style={{ color: '#999', lineHeight: 20, }}>风险提示：{item.level}</Text>
                            </View>
                            <View style={styles.line}></View>
                            <View style={styles.row}>
                                <Text style={{ color: '#999', lineHeight: 20, }}>扫描次数：{item.numbers}</Text>
                            </View>
                            <View style={styles.line}></View>
                            <View style={styles.row}>
                                <Text style={{ color: '#999', lineHeight: 20, }}>二维码地址：{item.qrcode}</Text>
                            </View>
                            <View style={styles.line}></View>
                            <View style={styles.row}>
                                <Text style={{ color: '#999', lineHeight: 20, }}>扫描区域：{item.regions}</Text>
                            </View>
                            <View style={styles.line}></View>
                        </View>
                    }) : <Text>暂无数据</Text>
                }
            </ScrollView>
        );
        let SecondRoute = () => (
            <WebView
                style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
                scrollEnabled={false}
                javaScriptEnabled={true}
                source={{ uri: this.props.url }}
            ></WebView>

        );
        return (
            <TabView
                navigationState={{ ...this.state }}
                renderScene={
                    SceneMap({
                        first: FirstRoute,
                        second: SecondRoute,
                    })
                }
                renderTabBar={props =>
                    <TabBar
                        {...props}
                        style={{ backgroundColor: '#fff' }}
                        labelStyle={{ color: '#999' }}
                        indicatorStyle={{ backgroundColor: '#7bb046' }}
                    />
                }
                // onIndexChange={index => AppStore.setBuyProductTopIndex(index)}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
            />
        );
    }
}
function mapStateToProps() {
    return {
        userInfo: store.getAccount(),
    };
}
module.exports = connect(mapStateToProps)(Web);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 6,
        marginBottom: 10,
    },
    line: {
        borderWidth: 0.2,
        borderColor: '#f1f1f1',
        borderStyle: 'solid',
        marginTop: 5,
        marginBottom: 5,
    },
    row: {
        // borderWidth: 0.2,
        // borderColor: '#aaa',
        // borderStyle: 'solid',
        marginTop: 5,
        marginBottom: 5,
        lineHeight: 40,
    }
});