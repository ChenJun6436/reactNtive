import React, { Component } from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import PropTypes from 'prop-types';
import QRScannerViewInt from '../components/QRScannerViewInt.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as MineAction from 'root/src/actions/intRecord';
import CropStore from 'root/src/stores/crop';
import AppStore from 'root/src/stores/app';
const { connect } = require('remx');
@navigatorDecorator
export default class BarcodeScannerInt extends Component {
    barcodeReceived(e) {
        if(this.props.nowComponentName == 'BarcodeScanner'){
            return false
        }
        let url = e.data;
        let postData = { search: url, pageIndex: 1, pageSize: 1, goodsCodeType: this.props.searchType }
        MineAction.SearchGoodsList({ input: postData }).then((data) => {
            CropStore.setClickCrop('none')
            if (data.suc == 1) {
                if (data.data.length > 0) {
                    CropStore.setClickCrop(data.data[0])
                }
            }
            this.pop();
        })
    }
    _renderTitleBar() {
        return (
            <Text style={{ color: 'white', textAlignVertical: 'center', textAlign: 'center', padding: 12 }} ></Text>
        );
    }

    _renderMenu() {
        return (
            <Text style={{ color: 'white', textAlignVertical: 'center', textAlign: 'center', padding: 12 }} ></Text>
        )
    }
    render() {
        return (

            < QRScannerViewInt onScanResultReceived={this.barcodeReceived.bind(this)}
                renderTopBarView={() => this._renderTitleBar()}
                renderBottomMenuView={() => this._renderMenu()} />
        )
    }

}
function mapStateToProps() {
    return {
        nowComponentName: AppStore.getNowComponent(),
    };
  }
  module.exports = connect(mapStateToProps)(BarcodeScannerInt);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
});