import * as AcountService from '../services/account';
import AccountStore from '../stores/account';

//登陆
export async function login({ input }) {
    const { data, msg, success } = await AcountService.login(input);
    if (!success) {
        return { suc: false, msg };
    }
    saveUserInfo(input, data);
    return { suc: true, msg };
}
function saveUserInfo(input, data) {
    storage.set('loginName', input.loginName);
    storage.set('loginPwd', input.loginPwd);
    if (data.loginInfo) {
        storage.set('enterpriseId', data.loginInfo.enterpriseId);
        data.loginInfo.isCharger = data.isCharger
        AccountStore.setAccount(data.loginInfo);
        AccountStore.setAvatar(data.loginInfo.avatar);
    }
}
//注册
export async function register({ input }) {
    const { data, msg, success } = await AcountService.register(input)
    if (!success)
        return { suc: false, msg };
    saveUserInfo(input, data);
    return { suc: true, msg };
}

//忘记密码
export async function modifyPwd({ input }) {
    const { data, msg, success } = await AcountService.modifyPwd(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, msg };
}

//发送验证码
export async function sendVerifiedCode({ input }) {
    const { data, msg, success } = await AcountService.sendVerifiedCode(input)
    if (!success)
        return { suc: false, msg };

    return { suc: true, msg };
}

//验证验证码是否正确
export async function verification({ input }) {
    const { data, msg, success } = await AcountService.verification(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, msg };
}
//验证手机号码是否正确
export async function existIdentifier({ input }) {
    const { data, msg, success } = await AcountService.existIdentifier(input)
    if (!success)
        return { suc: false };
    return { suc: true, msg, data };
}
//完善个人信息
export async function modifyUser({ input }) {
    const { data, msg, success } = await AcountService.modifyUser(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, msg, data };
}
//获取用户信息
export async function getUserInfo() {
    const { data, msg, success } = await AcountService.getUserInfo()

    if (!success)
        return { suc: false, msg };
    return { suc: true, data };
}
