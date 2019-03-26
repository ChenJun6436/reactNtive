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
import * as MineAction from 'root/src/actions/intRecord';
import CropStore from 'root/src/stores/crop';
@navigatorDecorator
export default class BarcodeScanner extends Component {
    barcodeReceived(e) {
        let url = e.data;
        if (this.props.type == 'buyGoods') {
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
            console.log(url)
        } else {
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