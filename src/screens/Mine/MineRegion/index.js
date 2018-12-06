// @flow

import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ImageBackground,
    Dimensions,
    Image,
    findNodeHandle,
    Alert,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';
// import Divide from 'react-native-divide'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Button, InputItem, List, Picker } from 'antd-mobile-rn';
import requestPermission from 'root/src/utils/requestPermissions';//获取相机及其他权限
import * as AccountAction from 'root/src/actions/account';
import Geolocation from 'Geolocation';
const { connect } = require('remx');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BG_IMAGE = require('root/img/login.jpg');
const LOGO_IMAGE = require('root/img/logo.png');

const QQ_IMAGE = require('root/img/qq.png');
const WCHAT_IMAGE = require('root/img/wChat.png');
const BaiduMap_URL = 'https://api.map.baidu.com/geocoder/v2/?output=json&ak=Xl9hFQvnrH57BX1AnkBCVaWB&location='
// import { district } from 'antd-mobile-demo-data';
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

@navigatorDecorator
export default class MineRegion extends Component {

    constructor(props: Props) {
        super(props);
        this.provinceCode = '';
        this.provinceName = '';
        this.cityCode = '';
        this.cityName = '';
        this.townCode = '';
        this.townName = '';
        this.countyCode = '';
        this.countyName = '';
        this.regionName = [];
        this.state = {
            viewRef: null,
            district: [],
            areasData: [],
            regionId: this.props.regionId ? this.props.regionId : [],
            regionName: [],
            address: this.props.address,
        };

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
        if (this.state.address && this.state.regionId && this.regionName && this.state.regionId.length > 0 && this.regionName.length > 0) {
            let data = {
                regionId: this.state.regionId,
                regionName: this.regionName,
                address: this.state.address
            }
            this.props.getAears && this.props.getAears(data)
            this.pop();
        }
        else {
            MyToast.info('请填写完整的区域信息');
        }

    }
    componentWillMount() {
        const areasData = getAreas()
        this.setState({ areasData })
    }

    getLongitudeAndLatitude = () => {
        //获取位置再得到城市先后顺序，通过Promise完成
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                location => {
                    //可以获取到的数据
                    var result = "速度：" + location.coords.speed +
                        "\n经度：" + location.coords.longitude +
                        "\n纬度：" + location.coords.latitude +
                        "\n准确度：" + location.coords.accuracy +
                        "\n行进方向：" + location.coords.heading +
                        "\n海拔：" + location.coords.altitude +
                        "\n海拔准确度：" + location.coords.altitudeAccuracy +
                        "\n时间戳：" + location.timestamp;

                    // ToastAndroid.show("UTIl" + location.coords.longitude, ToastAndroid.SHORT);
                    // alert(result);
                    resolve([location.coords.longitude, location.coords.latitude]);
                },
                error => {
                    // Alert.alert("获取位置失败：" + error, "")
                    reject(error);
                }
            );
        })
    }

    getCityLocation = () => {
        return new Promise((resolve, reject) => {
            //获取经纬度的方法返回的是经纬度组成的数组
            this.getLongitudeAndLatitude().then((locationArr) => {
                // Alert.alert("", "" + locationArr[1]);
                let longitude = locationArr[0];
                let latitude = locationArr[1];
                this.getNetData(BaiduMap_URL + latitude + "," + longitude)
                    .then((data) => {
                        if (data.status == 0) {
                            resolve(data);
                        } else {
                        }
                    }).catch((data) => {
                    })

            }).catch((data) => {
            })

        })
    }

    //获取网络数据
    getNetData = (url) => {
        return new Promise((resolve, reject) => {
            fetch(url).then((response) => response.json())
                .then((responseData) => {
                    resolve(responseData);
                })
                .catch((error) => {
                })
                .done()
        })
    }
    //获取位置
    getLocation = () => {
        this.getCityLocation().then((data) => {
            this._confirmCity(data);

        }).catch((error) => {
        });
    }

    _confirmCity = (data) => {
        let address = data.result.addressComponent;
        if (address != "") {
            let city;
            let district;
            let town;
            let pr = address.province.substring(0, address.province.length - 1);
            let province = this.state.areasData.find(item => {
                return item.label == pr
            })
            if (province && address.city) {
                city = province.children && province.children.length > 0 ? province.children.find(item => {
                    return item.label == address.city
                }) : null
            }
            if (city && address.district) {
                district = city.children && city.children.length > 0 ? city.children.find(item => {
                    return item.label == address.district
                }) : null
            }
            if (district && address.town) {
                town = district.children && district.children.length > 0 ? district.children.find(item => {
                    return item.label == address.town
                }) : null
            }

            this.provinceCode = province ? province.value : '';
            this.provinceName = province ? province.label : '';
            this.cityCode = city ? city.value : '';
            this.cityName = city ? city.label : '';
            this.townCode = town ? town.value : '';
            this.townName = town ? town.label : '';
            this.countyCode = district ? district.value : '';
            this.countyName = district ? district.label : '';
            if (province && city && district && town) {
                this.regionName = [province.label, city.label, district.label, town.label];
                this.setState({
                    regionId: [province.value, city.value, district.value, town.value]
                })
            }
            if (province && city && district && !town) {
                this.regionName = [province.label, city.label, district.label];
                this.setState({
                    regionId: [province.value, city.value, district.value]
                })
            }
            if (province && city && !district && !town) {
                this.regionName = [province.label, city.label];
                this.setState({
                    regionId: [province.value, city.value]
                })
            }
            if (province && !city && !district && !town) {
                this.regionName = [province.label];
                this.setState({
                    regionId: [province.value]
                })
            }
        }
    }

    imageLoaded = () => {
        this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }
    format = (value) => {
        if (value && value.length > 0) {
            // this.setState({
            //     regionName: value,
            // })
            this.regionName = value
            return value.join(',')
        }
        else {
            return value
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.loginView}>
                    <View style={styles.loginInput}>
                        <View style={{ marginVertical: 15, height: 40, width: '90%', borderBottomWidth: 1, borderBottomColor: '#999' }}>
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
                        </View>
                        <View style={{ marginVertical: 15 }}>
                            <InputItem
                                style={{ height: 40, width: '90%', backgroundColor: 'transparent', borderBottomWidth: 1, borderBottomColor: '#999', padding: 0, color: '#999' }}
                                clear
                                textAlign="right"
                                value={this.state.address}
                                onChange={(value: any) => {
                                    this.setState({
                                        address: value,
                                    });
                                }}
                                labelNumber={4}
                                placeholder='详细地址'
                                placeholderTextColor='#999'

                            >
                                详细地址
                            </InputItem>
                        </View>
                        <View style={{ marginVertical: 35, width: '100%', alignItems: 'center', }}>
                            <Button
                                style={{ height: 40, width: '90%', backgroundColor: 'green', borderWidth: 2, borderColor: 'white', borderRadius: 30 }}
                                onClick={this.getLocation}
                            >
                                <Text style={{ fontWeight: 'bold', color: 'white' }}>一键获取位置</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    travelText: {
        color: '#ffffff',
        fontSize: 26,
        fontFamily: 'bold',
        textAlign: 'center',
        width: '100%',
        height: 40,
        lineHeight: 40,
    },
    loginView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    register: {
        position: 'absolute',
        top: 30,
        right: 20,
    },
    loginTitle: {
        marginTop: 80,
    },
    loginInput: {
        width: '100%',
        alignItems: 'center',
    },

})


