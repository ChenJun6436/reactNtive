import { AsyncStorage } from 'react-native'
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status == 401) {
    //跳转到登陆页面
    Global.Navigate.startLoginScreen()
  }
  return false;
}
export async function GetJson(url) {
  const response = await fetch(url + "?_=" + Date.now(), {});
  const data = await response.json();
  return data;

}
export async function Get(url, options) {
  if (!options)
    options = {};
  options.method = "GET";
  return Request(url, options)
}
export async function Post(url, options, mock) {
  if (!options)
    options = {};
  options.method = "POST";
  return Request(url, options, mock)
}
export async function Upload(url, options, mock, img) {
  if (!options)
    options = {};
  options.method = "POST";
  return Request(url, options, mock, 1)
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export async function Request(url, options, mock, img) {
  if (!mock)
    url = BaseApiUrl + url;
  //Token
  let token = storage.get('token')
  options.headers = {
    // clientUrl: 'window.location.pathname',
    // "clientUrlName": 'encodeURI(document.title)',
    "clientDeviceNo": 'androidSUMI',
    "clientSourceType": "moblie",
    // "userIp": "userIp",
    // "clientDeviceSN": 'erpDeviceSN',
    "Authorization": "Bearer " + (token ? token : null),
    'clientToken': '101a715be332a3970c01242a757cecb8',
    'clientPlatformCode': 'P_FARMER_UI',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  if (img) {
    options.headers = {
      // "clientUrl": 'window.location.pathname',
      // "clientUrlName": 'encodeURI(document.title)',
      "clientDeviceNo": 'androidSUMI',
      "clientSourceType": "moblie",
      // "userIp": 'userIp',
      // "clientDeviceSN": 'erpDeviceSN',
      "Authorization": "Bearer " + (token ? token : "123456"),
      'clientToken': '101a715be332a3970c01242a757cecb8',
      'clientPlatformCode': 'P_FARMER_UI',
      'Accept': 'multipart/form-data;charset=utf-8',
      'Content-Type': 'multipart/form-data;charset=utf-8',
    };
  }
  const response = await fetch(url, options);
  if (!checkStatus(response)) {
    Toast.fail("系统出错")
    return {
      success: false
    };
  }
  const data = await response.json();
  console.log(url)
  console.log(data)
  let success;
  if (data.code == 0) {
    //接口错误给出统一错误提示
    success = false;
    Toast.fail(data.msg)
  }
  else if (data.code == 2) {
    //接口错误给出统一错误提示
    success = false;
    Toast.fail(data.msg)
  }
  else {
    //操作成功，给出成功提示，主要用于大多数非查询接口
    success = true;
    if (data.token)
      storage.set('token', data.token)
    if (data.Token)
      storage.set('token', data.Token)
  }
  //返回数据和成功与否标识
  let ret = {
    success: success,
    data: data.data,
    totalCount: data.totalCount,
    dataExtend: data.dataExtend,
    msg: data.msg,
    Data: data.Data,
    Msg: data.Msg,
  };
  return ret;
  
}


