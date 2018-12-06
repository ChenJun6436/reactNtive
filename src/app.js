//全局常量
import './constants';
//decorator
import './utils/decorator';
import { AsyncStorage } from 'react-native';
import { registerScreens } from './screens';
import storage from 'react-native-sync-storage';
import SplashScreen from 'react-native-smart-splash-screen';
import './utils/globalTools.js'
import Geolocation from 'Geolocation';
global.storage = storage;

//注册页面
registerScreens();
Navigation.events().registerAppLaunchedListener(async () => {
  //初始化存储
  await storage.init;
  Geolocation.getCurrentPosition(
    location => {
      storage.set('longitude', location.coords.longitude)
      storage.set('latitude', location.coords.latitude)
    }
  )
  //设置默认样式
  Global.Navigate.setDefaultOptions();
  //如果有token跳转到首页，否则跳转到登录页
  if (storage.get("token")) {
    Global.Navigate.startIndexScreen()
  }
  else {
    Global.Navigate.startLoginScreen()
  }
  //关闭启动画面
  SplashScreen.close({
    animationType: SplashScreen.animationType.scale,
    duration: 850,
    delay: 500,
  })
});
