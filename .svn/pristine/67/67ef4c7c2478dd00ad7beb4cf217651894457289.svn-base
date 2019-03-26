import * as remx from 'remx';

//remx.registerLoggerForDebug(console.log);

const initialState = {
    pesticidesData: null,
    goodsData: null,
};

const state = remx.state(initialState);

const getters = remx.getters({
    getPesticidesData() {
        return state.pesticidesData
    },
    getGoodsData() {
        return state.goodsData
    },

});

const setters = remx.setters({

    setPesticidesData(pesticidesData) {
        state.pesticidesData = pesticidesData;
    },
    setGoodsData(goodsData) {
        state.goodsData = goodsData;
    }
});

export default store = {
    ...setters,
    ...getters
};