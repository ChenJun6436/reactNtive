import { Post, GetJson } from '../utils/request';
//登陆
export async function login(data) {
  return Post(`/Api/Home/Login`, {
    body: JSON.stringify(data)
  });
}

//注册
export async function register(data) {
  return Post(`/Api/Home/RegistUser`, {
    body: JSON.stringify(data)
  });
}

//忘记密码
export async function modifyPwd(data) {
  return Post(`/Api/Home/ModifyPwd`, {
    body: JSON.stringify(data)
  });
}

//发送短信验证码
export async function sendVerifiedCode(data) {
  return Post(`/Api/Home/SendPhoneMsg`, {
    body: JSON.stringify(data)
  });
}


//验证验证码是否正确
export async function verification(data) {
  return Post(`/Api/Home/Verification`, {
    body: JSON.stringify(data)
  });
}
//验证手机是否已经注册
export async function existIdentifier(data) {
  return Post(`/Api/Home/ExistIdentifier`, {
    body: JSON.stringify(data)
  });
}

//完善个人信息
export async function modifyUser(data) {
  return Post(`/Api/User/ModifyUser`, {
    body: JSON.stringify(data)
  });
}
//获取用户信息
export async function getUserInfo() {
  return Post(`/Api/User/Get`);
}