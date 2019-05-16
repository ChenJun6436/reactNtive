import * as remx from 'remx';


const initialState = {
  account: null
};

const state = remx.state(initialState);

const getters = remx.getters({
  getAccount() {
    //store里面有得话直接返回
    if (state.account && (typeof (state.account) != undefined)) {
      return state.account;
    }
    //sotre没有看缓存里有没有
    let account = typeof (storage.get('account')) == undefined ? account : {};
    //都没有返回默认值{}
    return account
  },
  // getMenuList() {
  //   if (state.menuList)
  //     return state.menuList;
  //   let menuList = storage.get('menuList');
  //   return menuList ? menuList : [];
  // },
  getUserId() {
    //默认值为undefined的写法
    return state.userId ? state.userId : storage.get('userId');
  },
  getAvatar() {
    return state.avatar ? state.avatar : storage.get('avatar');
  },
  getScore() {
    return state.score ? state.score : storage.get('score');
  }
});

const setters = remx.setters({
  setAccount(account) {
    storage.set('account', account)
    state.account = account;
  },
  // setMenuList(menuList) {
  //   storage.set('menuList', menuList)
  //   state.menuList = menuList;
  // },
  setUserId(userId) {
    storage.set('userId', userId)
    state.userId = userId;
  },
  setAvatar(avatar) {
    storage.set('avatar', avatar)
    state.avatar = avatar;
  },
  setScore(score) {
    storage.set('score', score)
    state.score = score;
  }
});

export default store = {
  ...setters,
  ...getters
};