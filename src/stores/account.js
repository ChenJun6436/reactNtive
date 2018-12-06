import * as remx from 'remx';

//remx.registerLoggerForDebug(console.log);

const initialState = {

};

const state = remx.state(initialState);

const getters = remx.getters({
  getAccount() {
    //store里面有得话直接返回
    if (state.account)
      return state.account;
    //sotre没有看缓存里有没有
    let account = storage.get('account');
    //都没有返回默认值{}
    return account ? account : {};
  },
  getMenuList() {
    if (state.menuList)
      return state.menuList;
    let menuList = storage.get('menuList');
    return menuList ? menuList : [];
  },
  getUserId() {
    //默认值为undefined的写法
    return state.userId ? state.userId : storage.get('userId');
  },
  getAvatar() {
    return state.avatar ? state.avatar : storage.get('avatar');
  }
});

const setters = remx.setters({
  setAccount(account) {
    storage.set('account', account)
    state.account = account;
  },
  setMenuList(menuList) {
    storage.set('menuList', menuList)
    state.menuList = menuList;
  },
  setUserId(userId) {
    storage.set('userId', userId)
    state.userId = userId;
  },
  setAvatar(avatar) {
    storage.set('avatar', avatar)
    state.avatar = avatar;
  }
});

export default store = {
  ...setters,
  ...getters
};