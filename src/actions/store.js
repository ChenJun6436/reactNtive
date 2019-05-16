import * as StoreService from '../services/store';

//搜索附近农资店
export async function SearchNearByStore({ input }) {
    const { data, totalCount, msg, success } = await StoreService.SearchNearByStore(input)
    if (!success)
        return { suc: false, msg };
    return { data, totalCount };
}

//搜索农资
export async function SearchGoods({ input }) {
    const { data, totalCount, msg, success } = await StoreService.SearchGoods(input)
    if (!success)
        return { suc: false, msg };
    return { data, totalCount };
}
//农资店详情
export async function ViewStore({ input }) {
    const { data, msg, success } = await StoreService.ViewStore(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data };
}

//农资详情
export async function GetGoods({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.GetGoods(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//新增农资店
export async function AddStore({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.AddStore(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}

//发送绑定申请
// Api/Enterprise/SetState