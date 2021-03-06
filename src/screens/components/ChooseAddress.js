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
import { MapView } from 'react-native-amap3d'
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchBarCopy from 'root/src/screens/components/SearchBarCopy';
export default class ChooseAddress extends Component {
    state = {
        address: '',
        list: [],
        coordinate: undefined
    }
    statusChangeComplete = ({ nativeEvent }) => {
        fetch('http://restapi.amap.com/v3/geocode/regeo?key=' + AMapWebServiceAk + '&location=' + nativeEvent.longitude + ',' + nativeEvent.latitude + '&poitype=&radius=1000&extensions=all&batch=false&roadlevel=0').then((response) => response.json())
            .then((data) => {
                if (data.status == 1) {
                    data.regeocode.pois && this.setState({
                        list: data.regeocode.pois.map(item => {
                            return {
                                name: item.name,
                                address: item.address,
                                location: item.location
                            }
                        }),
                    })
                    if (data.regeocode.pois && data.regeocode.pois[0]) {
                        let coordinate = { longitude: Number(data.regeocode.pois[0].location.split(',')[0]), latitude: Number(data.regeocode.pois[0].location.split(',')[1]) };
                    }
                    this.cityCode = data.regeocode.addressComponent.citycode;
                }
            }).catch((error) => {
            }).done()
    }
    render() {
        return <View style={{ flex: 1 }}>
            <SearchBarCopy placeholder="请输入关键字" onTouchStart={() => {
                this.props.onSearch && this.props.onSearch(this.cityCode)
            }} />
            <View style={{ flex: 1 }}>
                <MapView style={{ flex: 1 }}
                    locationEnabled
                    locationInterval={8000}
                    onLocation={({ nativeEvent }) => {
                        this.setState({ coordinate: { longitude: nativeEvent.longitude, latitude: nativeEvent.latitude } })
                    }}
                    centerPinEnabled
                    coordinate={this.state.coordinate}
                    showsLocationButton
                    onStatusChangeComplete={this.statusChangeComplete}
                /></View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={this.state.list}
                    keyExtractor={(item, index) => "" + index}
                    renderItem={({ item, index }) => {
                        let coordinate = { longitude: Number(item.location.split(',')[0]), latitude: Number(item.location.split(',')[1]) };
                        return <TouchableHighlight onPress={() => { this.props.onChoosed(coordinate, item.name); this.setState({ coordinate: coordinate }) }} style={{ marginHorizontal: 10 }} activeOpacity={0.3} underlayColor={'#eee'}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ marginTop: 4 }}>
                                    <Text>{item.name}</Text>
                                    <Text style={{ fontSize: 10, color: '#999' }}>{item.address}</Text>
                                </View>
                                {index == 0 ? <Icon
                                    name='check'
                                    color='#fd7e14'
                                    size={22} /> : null}
                            </View>
                        </TouchableHighlight>
                    }}
                />
            </View>
        </View>
    }
}

