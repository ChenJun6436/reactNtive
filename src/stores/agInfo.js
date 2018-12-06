import * as remx from 'remx';

//remx.registerLoggerForDebug(console.log);

const initialState = {
  replyUser: null
};

const state = remx.state(initialState);

const getters = remx.getters({
  getReplyUser() {
    return state.replyUser
  },
});

const setters = remx.setters({
  setReplyUser(User) {
    state.replyUser = User;
  }
});

export default store = {
  ...setters,
  ...getters
};