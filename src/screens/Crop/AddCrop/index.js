// @flow

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Alert,
    TouchableWithoutFeedback
} from 'react-native';
import { List, InputItem, TextareaItem, DatePicker, Picker, ImagePicker, Button, WhiteSpace } from 'antd-mobile-rn';
import * as CropAction from 'root/src/actions/crop';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bold } from 'ansi-colors';
import InputWriteSelect from 'root/src/screens/baseComon/InputWriteSelect.js'
import moment from 'moment';
import CropStore from 'root/src/stores/crop';
// import { runInThisContext } from 'vm';
const { connect } = require('remx');
const Item = List.Item;
@navigatorDecorator
class AddCrop extends Component {
    constructor(props) {
        super(props);
        this.loading = false
        this.state = {
            freshData: 0
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
    navigationButtonPressed() {
        if (this.loading) {
            return false
        }
        if(!this.props.cropData){
            MyToast.info('请填写或选择作物')
            return false
        }
        const postData = {
            cropName: this.props.cropData[0],
            pestName: this.props.pestData
        }
        this.loading = true
        if (this.props.id) {
            postData.id = this.props.id
            CropAction.Edit({ input: postData }).then((data) => {
                if (data.suc) {
                    MyToast.success('修改成功');
                    CropStore.setCropData(null)
                    CropStore.setPestData(null)
                    this.props._fresh()
                    this.pop()
                } else {
                    this.loading = false
                    MyToast.info(data.msg);
                }
            })
        } else {
            CropAction.AddAttentionCrop({ input: postData }).then((data) => {
                if (data.suc) {
                    MyToast.success('新增成功');
                    CropStore.setCropData(null)
                    CropStore.setPestData(null)
                    this.props._fresh()
                    this.pop()
                } else {
                    this.loading = false
                    MyToast.info(data.msg);
                }
            })
        }
    }
    fresh = () => {
        this.setState({
            freshData: 1
        })
    }
    componentWillUnmount() {
        CropStore.setCropData(null)
        CropStore.setPestData(null)
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f5f5f5' }}>
                <List>
                    <InputWriteSelect _name={'作物名称'} _value={this.props.cropData} _type={'crop'} _selectCrop={() => {
                        this.pushPage({
                            component: {
                                passProps: { isSelect: true, fresh: this.fresh, isSolo: true },
                                ...Global.Screens.ERPDiagnosis
                            }
                        })
                    }} />
                </List>
                <List>
                    <InputWriteSelect _name={'病害名称'} _value={this.props.pestData} _type={'pest'} _selectCrop={() => {
                        if (this.props.cropData) {
                            this.pushPage({
                                component: {
                                    passProps: { cropName: this.props.cropData[0], isSelect: true, fresh: this.fresh },
                                    ...Global.Screens.ERPDiagnosisDetail
                                }
                            })
                        } else {
                            MyToast.info('请先填写或选择作物');
                        }
                    }} />
                </List>
            </View>
        );
    }
}
function mapStateToProps() {
    return {
        cropData: CropStore.getCropData(),
        pestData: CropStore.getPestData()
    };
}

module.exports = connect(mapStateToProps)(AddCrop);
const styles = StyleSheet.create({
    // userInfo: store.getAccount()
});
