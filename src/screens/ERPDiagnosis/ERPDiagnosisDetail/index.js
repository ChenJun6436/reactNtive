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
    TouchableHighlight,
    Image
} from 'react-native';
import moment from 'moment';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Button, SwipeAction, InputItem } from 'antd-mobile-rn';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import * as DiagnosisAction from 'root/src/actions/diagnosis';
import LoadMoreList from 'root/src/screens/baseComon/LoadMoreList';
import DiagnosisList from 'root/src/screens/baseComon/DiagnosisList';

// @loadingDecorator
@navigatorDecorator
export default class BuyProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: '热门病害' },
                { key: 'second', title: '热门虫害' },
                { key: 'third', title: '热门草害' },
            ],
        };
    }
    componentWillMount() { }
    render() {
        const FirstRoute = () => (
            <View style={[styles.container]} >
                <LoadMoreList
                    colums={2}
                    ref={ref => this.moreListInst = ref}
                    getData={DiagnosisAction.GetPestByPlant}
                    searchParams={{ pestType: '病害', cropName: this.props.cropName }}
                    rowItem={(data) => {
                        return <TouchableHighlight activeOpacity={0.3} underlayColor={'#eee'}
                            style={{ backgroundColor: 'transparent', flex: 1 }}
                            onPress={() => {
                                this.pushPage({
                                    component: {
                                        passProps: { pestName: data.pestDistinct, cropName: data.crop },
                                        ...Global.Screens.ERPDiaDetail,
                                        options: {
                                            topBar: {
                                                title: {
                                                    text: data.pest
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
                            <DiagnosisList content={data} />
                        </TouchableHighlight>
                    }}
                />
            </View>
        );
        const SecondRoute = () => (
            <View style={[styles.container]} >
                <LoadMoreList
                    colums={2}
                    ref={ref => this.moreListInst = ref}
                    getData={DiagnosisAction.GetPestByPlant}
                    searchParams={{ pestType: '虫害', cropName: this.props.cropName }}
                    rowItem={(data) => {
                        return <TouchableHighlight activeOpacity={0.3} underlayColor={'#eee'}
                            style={{ backgroundColor: 'transparent', flex: 1 }}
                            onPress={() => {
                                this.pushPage({
                                    component: {
                                        passProps: { pestName: data.pestDistinct, cropName: data.crop },
                                        ...Global.Screens.ERPDiaDetail,
                                        options: {
                                            topBar: {
                                                title: {
                                                    text: data.pest
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
                            <DiagnosisList content={data} />
                        </TouchableHighlight>
                    }}
                />
            </View>
        );
        const ThirdRoute = () => (
            <View style={[styles.container]} >
                <LoadMoreList
                    colums={2}
                    ref={ref => this.moreListInst = ref}
                    getData={DiagnosisAction.GetPestByPlant}
                    searchParams={{ pestType: '草害', cropName: this.props.cropName }}
                    rowItem={(data) => {
                        return <TouchableHighlight activeOpacity={0.3} underlayColor={'#eee'}
                            style={{ backgroundColor: 'transparent', flex: 1 }}
                            onPress={() => {
                                this.pushPage({
                                    component: {
                                        passProps: { pestName: data.pestDistinct, cropName: data.crop },
                                        ...Global.Screens.ERPDiaDetail,
                                        options: {
                                            topBar: {
                                                title: {
                                                    text: data.pest
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
                            <DiagnosisList content={data} />
                        </TouchableHighlight>
                    }}
                />
            </View>
        );
        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    first: FirstRoute,
                    second: SecondRoute,
                    third: ThirdRoute,
                })}
                renderTabBar={props =>
                    <TabBar
                        {...props}
                        style={{ backgroundColor: '#fff' }}
                        labelStyle={{ color: '#999' }}
                        indicatorStyle={{ backgroundColor: '#7bb046' }}
                    />
                }
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
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
        width: '100%',
        flexDirection: 'row',
    },
    btn: {
        width: '33.3%'
    }
});

// AppRegistry.registerComponent('Statistics', () => Statistics);