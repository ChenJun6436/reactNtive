// @flow

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    // Button,
    ScrollView,
    TextInput,
    Alert,
    StatusBar,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import { List, InputItem, TextareaItem, DatePicker, Picker, ImagePicker, Button } from 'antd-mobile-rn';
import * as CommonAction from 'root/src/actions/common';
import * as StoreAction from 'root/src/actions/store';
import storage from 'react-native-sync-storage';
import ImageCropPicker from 'react-native-image-crop-picker';
const { connect } = require('remx');
const Item = List.Item;
const SCREEN_WIDTH = Dimensions.get('window').width;
@navigatorDecorator
class AddStore extends Component {

    constructor(props) {
        super(props);
        this.loading = false
        this.state = {
            id: '',
            userName: '',
            storeName: '',
            storePhone: '',
            regionName: '',
            avatar: '',
            provinceCode: '',
            provinceName: '',
            cityCode: '',
            cityName: '',
            townCode: '',
            townName: '',
            countyCode: '',
            countyName: '',
            regionId: '',
            address: '',
            avatarSource: null,
            longitude: '',
            latitude: '',
            userLocation: ''
        }
        Navigation.mergeOptions(this.props.componentId, {
            topBar: {
                rightButtons: [
                    {
                        ...confirmRightBtn, text: '确定'
                    }
                ]
            }
        });
        Navigation.events().bindComponent(this);
    }
    componentDidMount() {

    }
    navigationButtonPressed() {
        let vm = this
        var formData = new FormData();
        let uri = this.state.avatarSource
        if (this.loading) {
            return false
        }
        if (!uri) {
            MyToast.info('请拍照上传门店图片')
            return false
        }
        if (!this.state.regionId) {
            MyToast.info('请填写区域')
            return false
        }
        if (!this.state.storeName) {
            MyToast.info('请填写农资店名称')
            return false
        }
        if (!this.state.userName) {
            MyToast.info('请填写联系人')
            return false
        }
        let file = { uri: uri.uri, type: 'application/octet-stream', name: 'image.jpg' };
        formData.append('avatar', file);
        if (this.state.files.length < 1) {
            MyToast.info('请拍照上传门店图片')
            return false
        }
        let req = {
            name: this.state.storeName,
            legalPersonName: this.state.userName,
            storeManPhone: this.state.storePhone,
            // longitude : ,
            // latitude : ,
            address: this.state.address,
            provinceCode: this.state.provinceCode,
            provinceName: this.state.provinceName,
            cityCode: this.state.cityCode,
            cityName: this.state.cityName,
            townCode: this.state.townCode,
            townName: this.state.townName,
            countyCode: this.state.countyCode,
            countyName: this.state.countyName,
            requestStoreImageList: [
                {
                    id: this.state.files[0].id,
                    imageUrl: this.state.files[0].url,
                    imageType: 4
                }
            ],
            regionId: this.state.regionId,
        }
        this.loading = true
        //新增成功后返回首页
        StoreAction.AddStore({ input: req }).then((suc) => {
            if (suc.suc) {
                MyToast.success('保存成功')
                setTimeout(() => {
                    this.loading = false
                }, 2000)
            } else {
                this.loading = false
                MyToast.info(suc.msg)
            }
        })
    }

    //图片上传
    handleFile2Change = (files, type, index) => {
        if (type == 'add') {
            var formData = new FormData();
            let file = { uri: files[0].url, type: 'application/octet-stream', name: 'image.jpg' };
            formData.append('avatar', file);
            CommonAction.UploadImg({ input: { formData, type: 1 } }).then((suc) => {
                if (suc.suc) {
                    this.setState({
                        avatar: suc.Data.url,
                    })
                    this.setState({
                        files: [{
                            url: ImgUrl + suc.Data.url,
                            id: suc.Data.url,
                        }],
                    });
                }
                else {
                    MyToast.info('上传失败')
                }
            })
        }
        else {
            this.setState({
                files,
                avatar: ''
            });
        }
    }
    //获取位置
    getAears = (data) => {
        if (data) {
            this.setState({
                provinceCode: data.regionId[0],
                provinceName: data.regionName[0],
                cityCode: data.regionId[1],
                cityName: data.regionName[1],
                townCode: data.regionId[2],
                townName: data.regionName[2],
                countyCode: data.regionId[3],
                countyName: data.regionName[3],
                regionId: data.regionId.join('/'),
                regionName: data.regionName.join(','),
                address: data.address
            })
        }
    }
    showCamera() {
        ImageCropPicker.openCamera({
            width: 600,
            height: 600,
            cropping: true
        }).then(image => {
            let sources = { uri: image.path }
            this.setState({
                avatarSource: sources
            });
            var formData = new FormData();
            let file = { uri: sources.uri, type: 'application/octet-stream', name: 'image.jpg' };
            formData.append('avatar', file);
            CommonAction.UploadImg({ input: { formData, type: 1 } }).then((suc) => {
                if (suc.suc) {
                    this.setState({
                        avatar: suc.Data.url,
                    })
                    this.setState({
                        files: [{
                            url: ImgUrl + suc.Data.url,
                            id: suc.Data.url,
                        }],
                    });
                }
                else {
                    MyToast.info('上传头像失败')
                }
            })

        });
    }
    render() {
        return (
            <ScrollView style={{ backgroundColor: '#F5FCFF' }}>
                <StatusBar
                    backgroundColor="#ff0000"
                    translucent={true}
                    hidden={true}
                    animated={true} />
                <View style={styles.middle}>
                    <View style={styles.imgView}>
                        {
                            this.state.avatarSource ?
                                <Image
                                    source={this.state.avatarSource}
                                    style={styles.imgStyle}
                                /> : <Image
                                    source={require('root/img/nopic.gif')}
                                    style={styles.imgStyle}
                                />
                        }
                    </View>
                </View>
                <View style={{ alignItems: 'center', padding: 5, height: 90 }}>
                    <TouchableOpacity
                        onPress={this.showCamera.bind(this)}
                    >
                        <Image
                            source={require('root/img/camera1.png')}
                            style={styles.photos}
                        />
                    </TouchableOpacity>
                </View>
                <List style={{ marginTop: 10 }}>
                    <InputItem
                        textAlign="right"
                        clear
                        onChange={text => this.setState({ storeName: text })}
                        placeholder="农资店名称"
                        value={this.state.storeName}
                        placeholderTextColor='#cccccc'
                    // style={{ fontSize: 12, color: 'gray' }}
                    ><Text style={{ color: 'gray' }}>农资店名称</Text>
                    </InputItem>
                    <InputItem
                        // style={{ fontSize: 12, color: 'gray' }}
                        textAlign="right"
                        clear
                        onChange={text => this.setState({ userName: text })}
                        placeholder="联系人"
                        value={this.state.userName}
                        labelNumber={9}
                        placeholderTextColor='#cccccc'
                    ><Text style={{ color: 'gray' }}>联系人</Text>
                    </InputItem>
                    <InputItem
                        textAlign="right"
                        clear
                        onChange={text => this.setState({ storePhone: text })}
                        placeholder="联系方式"
                        value={this.state.storePhone}
                        labelNumber={9}
                        placeholderTextColor='#cccccc'
                        maxLength={11}
                        type={'number'}
                    ><Text style={{ color: 'gray' }}>联系方式</Text>
                    </InputItem>
                    <Item arrow="horizontal" wrap extra={<Text style={{ color: 'gray' }}>{this.state.regionName}</Text>}
                        // style={{ fontSize: 12, color: 'gray' }}
                        onClick={() => {
                            this.pushPage({
                                component: {
                                    ...Global.Screens.MineRegion,
                                    passProps: { getAears: this.getAears },
                                }
                            })
                        }}><Text style={{ color: 'gray' }}>所在区域</Text></Item>
                </List>
            </ScrollView>
        );
    }
}
function mapStateToProps() {
    return {
    };
}

module.exports = connect(mapStateToProps)(AddStore);

const styles = StyleSheet.create({
    middle: {
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgView: {
        width: '90%',
        height: 200,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        marginBottom: 10,
        shadowOffset: { width: 8, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowColor: '#000',
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgStyle: {
        width: '95%',
        height: '95%',
        borderRadius: 5,
    },
    photos: {
        width: 90,
        height: 90,
        borderRadius: 45,
    }
});
