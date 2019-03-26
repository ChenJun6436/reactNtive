import ScollInputItem from 'root/src/screens/components/ScollInputItem.js'
import Spacing from 'root/src/screens/components/Spacing.js'//上下间隔
import { Toast, Modal } from 'antd-mobile-rn';
import { Alert } from 'react-native';
import areasData from 'root/src/assets/data.json'
import { smartArrayToTree } from './';
import { Geolocation } from "react-native-amap-geolocation"
import AppStore from 'root/src/stores/app';
import { PermissionsAndroid } from "react-native"
import { checkLocationPermissions } from './requestPermissions'
global.ScollInputItem = ScollInputItem;
global.Spacing = Spacing;
global.MyToast = {
    loading: () => {
        Toast.loading('数据加载中', 10, null, false)
    },
    fail: (message) => {
        Toast.fail(message ? message : '系统出错', 3, null, false)
    },
    success: (content) => {
        setTimeout(function () {
            Toast.success(content ? content : '操作成功', 3, null, false)
        }, 100)

    },
    submiting: () => {
        Toast.loading('正在提交', 10, null, true)
    },
    hide: () => {
        Toast.hide()
    },
    info: (content) => {
        Toast.info(content ? content : '失败！', 3, null, false)
    },
}
//获取地区信息
global.getAreas = () => {
    let areaList = areasData.map(item => {
        return {
            label: item.n,
            value: item.i,
            pid: item.p
        }
    })
    areaList = smartArrayToTree(areaList, { id: "value", firstPid: "86" })
    return areaList
}
//根据城市名获取经纬度
global.getCityLocation = (city, callback) => {
    let cityObj;
    areasData.map(item => {
        if (item.n == city && item.i.length <= 9) {
            cityObj = item
        }
    })
    if (cityObj) {
        storage.set('regionId', cityObj.p + '/' + cityObj.i)
    }
    else {
        storage.set('regionId', '')
    }
    fetch('http://api.map.baidu.com/geocoder?address=' + city + '&output=json&ak=' + BaiduMapAk + '&city=' + city).then((response) => response.json())
        .then((data) => {
            storage.set('longitude', data.result.location.lng)
            storage.set('latitude', data.result.location.lat)
            callback && callback();
        }).catch((error) => {
            console.log(error)
            // reject(ErrorDeal.getError(NetWork_Error))
        })
        .done()
}


global.hasListener = false;
//根据定位，并获取regionId，cityName，longitude，latitude
global.startLocation = async (callback) => {
    const suc = await checkLocationPermissions();
    if (!suc)
        return;
    //初始化amap定位组件
    if (!hasListener) {
        hasListener = true;
        await Geolocation.init({
            android: AMapAndroidAk
        })
        Geolocation.setOptions({
            interval: 8000
        })
        Geolocation.addLocationListener(
            location => {
                //可以获取到的数据
                const longitude = location.longitude;
                const latitude = location.latitude;
                storage.set('longitude', longitude)
                storage.set('latitude', latitude)
                const BaiduMap_URL = 'https://api.map.baidu.com/geocoder/v2/?output=json&ak=' + BaiduMapAk + '&location='
                fetch(BaiduMap_URL + latitude + "," + longitude).then((response) => response.json())
                    .then((data) => {
                        //查找对应regionId
                        const areasData = getAreas()
                        let address = data.result.addressComponent;
                        if (address != "") {
                            AppStore.setCityName(address.city)
                            storage.set('cityName', address.city)
                            let regionId;
                            let city;
                            let district;
                            let town;
                            let pr = address.province.substring(0, address.province.length - 1);//获取的数据是：四川省，本地数据是：四川，所以要截掉最后一个字符串
                            let province = areasData.find(item => {
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

                            if (province && city && district && town) {
                                regionId = province.value + '/' + city.value + '/' + district.value + '/' + town.value
                            }
                            if (province && city && district) {
                                regionId = province.value + '/' + city.value + '/' + district.value
                            }
                            if (province && city) {
                                regionId = province.value + '/' + city.value
                            }
                            if (province) {
                                regionId = province.value
                            }
                            storage.set('regionId', regionId)
                            callback && callback();
                        }
                    })
                    .catch((error) => {
                        Geolocation.stop()
                        Alert.alert(
                            '提示',
                            "定位失败",
                            [{
                                text: '确定', onPress: () => {

                                }
                            }]
                        );
                        // Alert.alert("定位失败")
                    })
                    .done()
                Geolocation.stop()
            },
            error => {
                Geolocation.stop()
                Alert.alert(
                    '提示',
                    "获取位置失败：" + error,
                    [{
                        text: '确定', onPress: () => {

                        }
                    }]
                );
                // Alert.alert("获取位置失败：" + error, "")
            }
        );
    }
    Geolocation.start();
}
