
import { Toast } from 'antd-mobile-rn';
import { Navigation } from 'react-native-navigation';
import Global from './global'
//api地址
//  global.BaseApiUrl = process.env.NODE_ENV == "development" ? "http://api.farmer.yoonop.com" : "http://api.farmer.yoonop.com"
//李蕊江  http://192.168.10.30:8100
global.BaseApiUrl = process.env.NODE_ENV == "development" ? "http://192.168.10.223:8017" : "http://192.168.10.223:8017"
global.ImgUrl = "http://yoonopfarmer.oss-cn-hangzhou.aliyuncs.com/";

//"http://192.168.10.215:8202"
//列表页每页多少条
global.PageSize = 16;
global.Global = Global;
global.Navigation = Navigation;
//公用轻提示
global.Toast = Toast;
//百度地图ak
global.BaiduMapAk = "Xl9hFQvnrH57BX1AnkBCVaWB";
//高德地图ak
global.AMapWebServiceAk = "22347ee38a17f12edd8c1886a73a9fcb";
global.AMapAndroidAk = "3d206fb4add7a227233e3b9735388bbd";
//右上角确定按钮参数
global.confirmRightBtn = {
    id: 'comfirmer',
    text: '确定',
    color: '#fff',
    fontSize: 16,
}
//右上角新增按钮参数
global.addRightBtn = {
    id: 'add',
    text: '新增',
    color: '#fff',
    fontSize: 16,
}
//右上角编辑按钮参数
global.editorRightBtn = {
    id: 'add',
    text: '编辑',
    color: '#fff',
    fontSize: 16,
}
// 多项目域名对应配置数组
const erpConfig = [
    // 农户app
    {
        href: "farmer",// 域名
        loginLogo: 'https://yoonopfarmer.oss-cn-hangzhou.aliyuncs.com/logo/logo.png'//登陆、注册、忘记密码logo
    },
    // 天津项目
    {
        href: "tianjin",// 域名
        loginLogo: 'https://yoonopfarmer.oss-cn-hangzhou.aliyuncs.com/logo/farmerlogo.png'//登陆、注册、忘记密码logo
    },
];
const projectSource = "farmer";// farmer:农户app;   tianjin:天津项目
global.projectConfig = erpConfig.filter(function (item) {
    if (item.href == projectSource) {
        return item;
    }
})[0]