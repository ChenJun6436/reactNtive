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
import QRScannerView from '../components/QRScannerView.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as QrCodeAction from 'root/src/actions/qrCode';
@navigatorDecorator
export default class BarcodeScanner extends Component {
    barcodeReceived(e) {
        let url = e.data;
        QrCodeAction.searchQRCode({ qrCode: url }).then((suc) => {
            if (suc.data) {
                this.pushPage({
                    component: {
                        ...Global.Screens.BarcodeWeb,
                        passProps: { data: suc.data, url: url },
                    }
                })
            }
            else {
                MyToast.info('失败');
            }
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

            < QRScannerView onScanResultReceived={this.barcodeReceived.bind(this)}
                renderTopBarView={() => this._renderTitleBar()}
                renderBottomMenuView={() => this._renderMenu()} />
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
});