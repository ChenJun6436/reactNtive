// @flow

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    Linking,
    Platform
} from 'react-native';
import { List } from 'antd-mobile-rn';
import DetailItem from 'root/src/screens/baseComon/DetailItem';
import { iconsMap, iconsLoaded } from 'root/src/utils/IconLoader';
import * as DataAction from 'root/src/actions/dataAuthentication';
import { MapView, Marker } from 'react-native-amap3d'
const Item = List.Item;
@navigatorDecorator @loadingDecorator
export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            model: null,
        }
    }
    componentWillMount() {
        DataAction.GetBase(this.props.id).then(({ suc, data }) => {
            if (data != null && data.length != 0) {
                data.coordinate = { longitude: data.lng, latitude: data.lat }
                this.setState({ model: data })
            }
            else {
                MyToast.info('数据获取失败，稍后尝试');
            }
            this.setState({ loading: false })
        })
    }


    render() {
        return (
            <ScrollView style={{ backgroundColor: '#f2f2f2' }}>
                <DetailItem title="基地认证名称" content={this.state.model.name} />
                <DetailItem title="基地规模（亩）" content={this.state.model.area} />
                <DetailItem title="省/市/区" content={this.state.model.provinceName + this.state.model.cityName + this.state.model.townName + this.state.model.countyName} />
                <DetailItem title="基地地址" content={this.state.model.address} />
                {this.state.model.coordinate ? <MapView style={{ flex: 1, height: 200 }}
                    coordinate={this.state.model.coordinate}
                ><Marker
                        coordinate={this.state.model.coordinate}
                        clickDisabled={true}
                    />
                </MapView> : null}
                <List renderHeader="地块信息">
                    {this.state.model.landName ? this.state.model.landName.map((item, index) => {
                        return <View style={styles.bgBorder} key={index}>
                            <View style={styles.rowsLine}>
                                <View><Text>地块名称：{item.landName}</Text></View>
                                <View><Text>面积：{item.area}</Text></View>
                            </View>
                        </View>
                    }) : null}
                </List>
            </ScrollView>
        );
    }
}

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

