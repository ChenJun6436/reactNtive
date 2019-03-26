// @flow

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableHighlight,
    FlatList
} from 'react-native';
import { SearchBar } from 'antd-mobile-rn';
import Icon from 'react-native-vector-icons/FontAwesome';
@navigatorDecorator
export default class ChooseAddress extends Component {
    state = {
        list: []
    }
    componentDidMount() {
        this.autoFocusInst.inputRef.focus();
    }
    render() {
        return <View>
            <SearchBar ref={ref => this.autoFocusInst = ref} placeholder="请输入关键字" maxLength={8} showCancelButton
                onChange={(val) => {
                    fetch('http://restapi.amap.com/v3/assistant/inputtips?key=' + AMapWebServiceAk + '&keywords=' + val + '&type=&location=&city=' + this.props.cityCode + '&datatype=poi').then((response) => response.json())
                        .then((data) => {
                            if (data.status == 1) {
                                //过滤掉location=[]的数据
                                data.tips && this.setState({
                                    list: data.tips.filter(item => { return item.location.length > 2 }).map(item => {
                                        return {
                                            name: item.name,
                                            address: item.address,
                                            location: item.location
                                        }
                                    })
                                })
                            }
                        }).catch((error) => {
                            console.log(error)
                        }).done()
                }}
                onCancel={() => {
                    this.pop();
                }
                } />
            <FlatList
                data={this.state.list}
                keyExtractor={(item, index) => "" + index}
                renderItem={({ item, index }) => {
                    return <TouchableHighlight onPress={() => {
                        let coordinate = { longitude: Number(item.location.split(',')[0]), latitude: Number(item.location.split(',')[1]) };
                        this.props.onChooseAddress(coordinate, item.name)
                        this.popTo("AddBase")
                    }} style={{ marginHorizontal: 10 }} activeOpacity={0.3} underlayColor={'#eee'}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon
                                style={{ marginRight: 10 }}
                                name='map-marker'
                                color='#999'
                                size={22} />
                            <View style={{ marginTop: 4 }}>
                                <Text>{item.name}</Text>
                                <Text style={{ fontSize: 10, color: '#999' }}>{item.address}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                }}
            />
        </View>
    }
}

