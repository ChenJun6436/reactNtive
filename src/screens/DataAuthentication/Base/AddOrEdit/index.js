// @flow

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TextInput,
    Alert,
    TouchableOpacity
} from 'react-native';
import { List, InputItem, Picker, Button, Accordion, SwipeAction } from 'antd-mobile-rn';
import * as DataAction from 'root/src/actions/dataAuthentication';
import moment from 'moment';
import CropStore from 'root/src/stores/crop';
import pesticidesStore from 'root/src/stores/pesticides';
import DetailItem from 'root/src/screens/baseComon/DetailItem.js';
import { MapView, Marker } from 'react-native-amap3d'
const { connect } = require('remx');
const Item = List.Item;

@navigatorDecorator
class AddOrEdit extends Component {
    constructor(props) {
        super(props);
        this.loading = false
        this.state = {
            areasData: [],
            regionId: [],
            address: null,
            coordinate: null,
            landList: null
        }
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                rightButtons: [
                    confirmRightBtn
                ]
            }
        });
        Navigation.events().bindComponent(this);

    }
    navigationButtonPressed({ buttonId }) {
        if (this.loading) {
            return
        }
        const ret = /^\d+(\.\d+)?$/;
        if (!storage.get('enterpriseId')) {
            MyToast.info('请先绑定企业信息')
            return
        }
        if (!this.state.name) {
            MyToast.info('请填写基地名称')
            return
        }
        if (!this.state.area) {
            MyToast.info('请填写基地规模')
            return
        }
        if (!ret.test(this.state.area)) {
            MyToast.info('基地规模只能为正数')
            return
        }
        if (!this.state.area) {
            MyToast.info('请填写基地规模')
            return
        }
        if (!this.state.coordinate) {
            MyToast.info('请填写基地地址')
            return
        }
        if (!this.state.regionId[0]) {
            MyToast.info('请填写省市区')
            return
        }
        if (!this.state.landList || this.state.landList.length == 0) {
            MyToast.info('请填写区块信息')
            return
        }
        let input = {
            id: this.props.id,
            enterpriseId: storage.get('enterpriseId'),
            name: this.state.name,
            area: this.state.area,
            address: this.state.address,
            landName: this.state.landList,
            provinceCode: this.state.regionId[0],
            provinceName: this.regionName[0],
            cityCode: this.state.regionId[1],
            cityName: this.regionName[1],
            townCode: this.state.regionId[2],
            townName: this.regionName[2],
            countyCode: this.state.regionId[3],
            countyName: this.regionName[3],
            lng: this.state.coordinate.longitude,
            lat: this.state.coordinate.latitude
        }
        this.loading = true
        if (this.props.isEdit) {
            DataAction.UpdateBase({ input: input }).then((suc) => {
                if (suc.suc) {
                    MyToast.success('编辑成功！')
                    this.props.refresh && this.props.refresh()
                    this.pop()
                }
                else {
                    MyToast.info(suc.msg)
                    this.loading = false
                }
            })
        }
        else {
            DataAction.AddBase({ input: input }).then((suc) => {
                if (suc.suc) {
                    MyToast.success('新增成功！')
                    this.props.refresh && this.props.refresh()
                    this.props.callback && this.props.callback()
                    this.pop()
                } else {
                    MyToast.info(suc.msg)
                    this.loading = false
                }
            })
        }


    }
    componentWillMount() {
        const areasData = getAreas()
        this.setState({ areasData }, () => {
            if (this.props.isEdit)
                DataAction.GetBase(this.props.id).then(({ data, suc }) => {
                    if (suc) {
                        this.setState({
                            name: data.name,
                            area: "" + data.area,
                            address: data.address,
                            regionId: [data.provinceCode, data.cityCode, data.townCode, data.countyCode],
                            coordinate: { longitude: data.lng, latitude: data.lat },
                            landList: data.landName
                        })
                    }
                })
        })

    }
    format = (value) => {
        if (value && value.length > 0) {
            this.regionName = value
            return value.join(',')
        }
    }
    onChooseAddress = (coordinate, name) => {
        this.setState({ address: name, coordinate })
    }
    render() {
        let goodsData = this.props.goodsData;
        let crops = this.props.cropsList;
        return (
            <ScrollView style={{ backgroundColor: '#F5FCFF' }}>
                <List>
                    <InputItem
                        textAlign="right"
                        clear
                        onChange={text => this.setState({ name: text })}
                        placeholder="基地认证名称"
                        value={this.state.name}
                        placeholderTextColor='#cccccc'
                        maxLength={10}
                    ><Text style={{ color: 'gray' }}>基地认证名称</Text>
                    </InputItem>
                    <InputItem
                        textAlign="right"
                        clear
                        type='number'
                        onChange={text => this.setState({ area: text })}
                        placeholder="基地规模（亩）"
                        value={this.state.area}
                        labelNumber={9}
                        placeholderTextColor='#cccccc'
                        maxLength={10}
                    ><Text style={{ color: 'gray' }}>基地规模（亩）</Text>
                    </InputItem>
                    <Picker
                        style={{ height: 40, width: '100%', backgroundColor: 'transparent', borderBottomWidth: 1, borderBottomColor: '#999', }}
                        title="选择地区"
                        data={this.state.areasData}
                        cols={4}
                        value={this.state.regionId}
                        format={this.format}
                        onChange={(v: any) => this.setState({ regionId: v })}
                        onOk={(v: any) => this.setState({ regionId: v })}
                    >
                        <CustomChildren>省/市/区</CustomChildren>
                    </Picker>
                    <Item arrow="horizontal" wrap extra={<Text style={{ color: 'gray' }}>{this.state.address}</Text>}
                        onClick={() => {
                            this.pushPage({
                                component: {
                                    ...Global.Screens.ChooseAddress,
                                    passProps: { onChooseAddress: this.onChooseAddress },
                                }
                            })
                        }}><Text style={{ color: 'gray' }}>基地地址</Text></Item>
                </List>
                {this.state.coordinate ? <MapView style={{ flex: 1, height: 200 }}
                    coordinate={this.state.coordinate}
                ><Marker
                        coordinate={this.state.coordinate}
                        clickDisabled={true}
                    />
                </MapView> : null}
                <List>
                    <Item arrow="horizontal" wrap
                        cols={1}
                        onClick={() => {
                            this.pushPage({
                                component: {
                                    ...Global.Screens.LandManage,
                                    passProps: {
                                        callback: (data) => { this.setState({ landList: data }) },
                                        landList: this.state.landList
                                    }
                                }
                            });
                        }}><Text style={{ color: 'gray' }}>区块信息</Text></Item>
                    {
                        this.state.landList && this.state.landList.length > 0 ? <Accordion defaultActiveKey="0" >
                            <Accordion.Panel header={"已录入区块"}>
                                <View>
                                    {
                                        this.state.landList.map((item, index) => {
                                            return <View style={styles.bgBorder} key={index}>
                                                <View style={styles.rowsLine}>
                                                    <View><Text>区块名称：{item.landName}</Text></View>
                                                    <View><Text>面积：{item.area}</Text></View>
                                                </View>
                                            </View>
                                        })
                                    }
                                </View>
                            </Accordion.Panel>
                        </Accordion> : null
                    }
                </List>
            </ScrollView >
        );
    }
}
const CustomChildren = (props: any) => (
    <TouchableOpacity onPress={props.onClick}>
        <View
            style={{ height: 36, paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}
        >
            <Text style={{ flex: 1 }}>{props.children}</Text>
            <Text style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>{props.extra}</Text>
        </View>
    </TouchableOpacity>
);
function mapStateToProps() {
    return {

    };
}

module.exports = connect(mapStateToProps)(AddOrEdit);
const styles = StyleSheet.create({
    popoverStyle: {
        width: 80,
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 3,
        alignSelf: 'flex-end',
        alignItems: 'center',
        marginBottom: 6,
        marginTop: 6,
        marginRight: 6,
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#000',
        elevation: 4
    },
    bgBorder: {
        paddingHorizontal: 13,
        paddingVertical: 4,
    },
    rowsLine: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    }
});