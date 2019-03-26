// @flow

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableHighlight
} from 'react-native';
import ChooseAddressCom from 'root/src/screens/components/ChooseAddress'
import { Geolocation } from "react-native-amap-geolocation"
@navigatorDecorator
export default class ChooseAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areasData: [],
            regionId: [],
            address: null,
            location: null,
        }
    }
    onChoosed = (coordinate, name) => {
        this.props.onChooseAddress(coordinate, name)
        this.pop();
    }
    render() {
        return <ChooseAddressCom onSearch={(cityCode) => {
            this.pushPage({
                component: {
                    ...Global.Screens.AddressAutoComplete,
                    passProps: { onChooseAddress: this.props.onChooseAddress, cityCode },
                }
            })
        }} onChoosed={this.onChoosed}
        />
    }
}

