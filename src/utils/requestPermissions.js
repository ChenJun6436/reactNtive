import { PermissionsAndroid, Platform } from 'react-native';
import { Modal } from 'antd-mobile-rn';
const requestPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.CAMERA
      ]
    )
  } catch (err) {
    alert("获取权限出错")
  }
}
const checkLocationPermissions = async () => {
  const canLocation = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
  );
  if (!canLocation) {
    return await (function () {
      return new Promise(
        function (resolve, reject) {
          Modal.alert('定位服务未开启', '请在设置里面开启该应用定位，优农帮才能提供更好的服务', [
            { text: '暂不', onPress: () => { resolve(false) } },
            {
              text: '去开启', onPress: async () => {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
                resolve(granted === PermissionsAndroid.RESULTS.GRANTED || granted == true);
              }
            },
          ])
        }
      )
    })();
  }
  return true;
}

export { requestPermissions, checkLocationPermissions }