import { PermissionsAndroid, Platform } from 'react-native';

const requestPermissions1 = async (hasVideoAndAudio, CameraManager, permissionDialogTitle, permissionDialogMessage) => {
    if (Platform.OS === 'ios') {
        let check = hasVideoAndAudio
            ? CameraManager.checkDeviceAuthorizationStatus
            : CameraManager.checkVideoAuthorizationStatus;

        if (check) {
            const isAuthorized = await check();
            return isAuthorized;
        }
    } else if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
            title: permissionDialogTitle,
            message: permissionDialogMessage,
          });
    
          // On devices before SDK version 23, the permissions are automatically granted if they appear in the manifest,
          // so check and request should always be true.
          // https://github.com/facebook/react-native-website/blob/master/docs/permissionsandroid.md
          const isAuthorized =
            Platform.Version >= 23 ? granted === PermissionsAndroid.RESULTS.GRANTED : granted === true;
    
          return isAuthorized;
    }
    return true;
}

export default requestPermissions  = async ()=> {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera")
      } else {
        console.log("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
    return true;
  }
  