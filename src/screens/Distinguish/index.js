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
    TouchableHighlight,
    Animated,
    ScrollView,
    Platform,
    Image
} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';
import LoadMoreList from 'root/src/screens/baseComon/LoadMoreList.js';
import * as DistinguishAction from 'root/src/actions/distinguish';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

@navigatorDecorator @loadingDecorator
export default class Distinguish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeList: []
        };
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                rightButtons: [
                    {
                        ...confirmRightBtn, text: '下一步'
                    }
                ]
            }
        });
        Navigation.events().bindComponent(this);
    }
    navigationButtonPressed() {
        if (!this.state.type) {
            MyToast.info('请选择作物类型');
        }
        else {
            this.pushPage({
                component: {
                    ...Global.Screens.Photograp,
                    passProps: { cropCnName: this.state.type },
                }
            });
        }
    }
    componentWillMount() {
        DistinguishAction.GetCropType().then(({ suc, data }) => {
            this.setState({
                loading: false
            })
            if (data && data.length > 0) {
                this.setState({
                    typeList: data
                })
            }
            else {
                this.setState({
                    typeList: []
                })
            }
        })
    }
    selectType(item) {
        this.setState({
            type: item.cropEnName
        })
    }
    render() {
        console.log(this.state.typeList)
        return (
            <ScrollView style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>请确定您需要鉴定的种类：</Text>
                </View>
                <View style={styles.content}>
                    {
                        this.state.typeList && this.state.typeList.length > 0 ? this.state.typeList.map((item, index) => {
                            return <TouchableOpacity
                                onPress={() => this.selectType(item)}
                                style={styles.main}
                                key={index}
                            >
                                <View style={styles.mainBox} >
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', height: 90, }}>
                                        <Image
                                            source={{ uri: item.cropImage }}
                                            style={styles.imgSty}
                                        />
                                        {this.state.type == item.cropEnName ? <Icon name='check-circle' size={20} style={styles.iconSty} /> : <Text></Text>}
                                    </View>
                                    <View style={{ width: '100%' }}>
                                        <Text style={{ lineHeight: 40, fontSize: 16, textAlign: 'center', color: 'gray' }}> {item.cropCnName} </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        }) : <Text>暂无数据</Text>
                    }
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 12,
    },
    main: {
        width: '30%',
        borderRadius: 5,
        marginBottom: 10,
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowColor: '#000',
        elevation: 3,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    mainBox: {
        width: '100%',
        height: '100%'
    },
    imgSty: {
        width: '90%',
        height: 80,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    title: {
        height: 60,
        marginHorizontal: 12,
    },
    titleText: {
        lineHeight: 60,
        fontSize: 18
    },
    iconSty: {
        color: '#fff',
        position: 'absolute',
        right: 10,
        top: 10
    }
});

