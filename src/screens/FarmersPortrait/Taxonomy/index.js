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
    Dimensions
} from 'react-native';
// import Echarts from 'native-echarts';
import Echarts from 'native-echarts';
import moment from 'moment';
import * as PortraitAction from 'root/src/actions/farmersPortrait';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
@loadingDecorator
export default class Statistics extends Component {
    constructor(props) {
        super(props);
        let now = moment();
        const edate = now.format('YYYY-MM-DD');
        const sdate = now.format("YYYY-MM") + "-01";
        this.state = {
            startDate: sdate,
            endDate: edate,
            optionPie: null,
        };
    }
    componentWillMount() {
        PortraitAction.getMemberPortrait({ input: { startTime: this.state.startDate, endTime: this.state.endDate, storeId: this.props.storeId, pageSize: 200, pageIndex: 1 } }).then(({ suc, data, msg }) => {
            if (suc && data != null && data.length != 0 && data != undefined) {
                this.getOption(data);
            } else {
                MyToast.info('暂无数据！稍后尝试');
            }
            this.setState({ loading: false })
        })
    }

    // 获取饼图数据
    getOption = (pieData) => {
        if (pieData == null || pieData.length == 0 || pieData == undefined)
            return null;
        let totalWeight = 0;
        let legend = pieData.map(a => a.goodsTypeDisplay)
        let data = pieData.map((a) => {
            totalWeight += a.goodsQuantity
            return { name: a.goodsTypeDisplay, value: a.goodsQuantity }
        });
        this.setState({
            optionPie: {
                title: {
                    text: '农药购买占比图（' + totalWeight.toFixed(3) + ' kg）',
                    left: 'left',
                },
                tooltip: {
                    // trigger: 'item',
                    // formatter: (params, ticket) => {
                    //     let list = params.data;
                    //     let ret = `<p>${list.name}： ${list.value ? dollarFormat(list.value) : 0}kg  (${params.percent}%)</p>`
                    //     return ret;
                    // }
                },
                legend: {
                    top: '10%',
                    data: legend
                },
                series: [
                    {
                        color: ['#04943c', '#181310', '#d22916', '#dec200', 'blue'],
                        // name: '农药使用占比',
                        type: 'pie',
                        radius: '55%',
                        center: ['25%', '50%'],
                        data: data,
                        label: {
                            normal: {
                                // formatter: function (params, ticket, callback) {
                                //     let percent = 0; //考生占比
                                //     percent = ((params.value / totalWeight) * 100).toFixed(3);
                                //     return params.name + '（' + params.percent + '%）' + '\n' + params.value + ' kg';
                                // },
                                show: false,
                                position: 'center'
                            },
                            emphasis: {               //设置点击展示环形图内部文本样式
                                show: true,
                                textStyle: {
                                    color: '#666666',
                                    fontSize: '11',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        })
        // return option;
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.optionPie ? <Echarts option={this.state.optionPie} height={300} /> : <Text>暂无数据</Text>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        // marginLeft: 80,
    },
    button: {
        backgroundColor: '#d9534f',
        padding: 8,
        borderRadius: 4,
        marginBottom: 20
    }
});

AppRegistry.registerComponent('Statistics', () => Statistics);
