import * as remx from 'remx';

//remx.registerLoggerForDebug(console.log);

const initialState = {
    buyProductTopIndex: 0,
    byLocation: true,
    cityName: null,
};

const state = remx.state(initialState);


const getters = remx.getters({
    //买农资页面tab选项卡
    getBuyProductTopIndex() {
        return state.buyProductTopIndex;
    },
    //首页城市名称
    getCityName() {
        return state.cityName;
    },
    //本地定位模式
    getByLocation() {
        return state.byLocation;
    },
});

const setters = remx.setters({
    setBuyProductTopIndex(index) {
        state.buyProductTopIndex = index;
    },
    setCityNameAndByLocation(cityName) {
        state.cityName = cityName;
        state.byLocation = false;
    },
    setCityName(cityName) {
        state.cityName = cityName;
    },
    setByLocation(byLocation) {
        state.byLocation = byLocation;
    },
});

export default store = {
    ...setters,
    ...getters
};