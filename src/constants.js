
import { Toast } from 'antd-mobile-rn';
import { Navigation } from 'react-native-navigation';
import Global from './global'
//api地址
global.BaseApiUrl = process.env.NODE_ENV == "development" ? "http://192.168.10.223:8017" : "http://api.farmer.yoonop.com"
global.ImgUrl = "http://yoonopfarmer.oss-cn-hangzhou.aliyuncs.com/";

//"http://192.168.10.215:8202"
//列表页每页多少条
global.PageSize = 16;
global.Global = Global;
global.Navigation = Navigation;
//公用轻提示
global.Toast = Toast
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