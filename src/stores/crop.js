import * as remx from 'remx';

//remx.registerLoggerForDebug(console.log);

const initialState = {
  cropData: null,
  pestData: null,
  cropsList:null,
  clickCrop: null,
};

const state = remx.state(initialState);

const getters = remx.getters({
  getCropData() {
    return state.cropData
  },
  getPestData() {
    return state.pestData
  },
  getCropsList(){
    return state.cropsList
  },
  //购买农药列表 获取点击的数据
  getClickCrop(){
    return state.clickCrop
  }
});

const setters = remx.setters({
  setCropData(cropData) {
    state.cropData = cropData;
  },
  setPestData(pestData) {
    state.pestData = pestData;
  },
  setCropsList(value) {
    state.cropsList = value
  },
  //购买农药列表 点击的数据
  setClickCrop(value){
    state.clickCrop = value
  }
});

export default store = {
  ...setters,
  ...getters
};