import * as PortraitService from '../services/farmersPortrait';

//获取农资店列表
export async function getStoreByMember({ input }) {
    const { data, totalCount, msg, success } = await PortraitService.getStoreByMember(input)
    if (!success)
        return { suc: false, msg };
    return { data, totalCount };
}
//绑定
export async function addBind({ id }) {
    const { data, msg, success } = await PortraitService.addBind(id)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data };
}
//解绑
export async function deleteBind({ id }) {
    const { data, msg, success } = await PortraitService.deleteBind(id)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data };
}
//购买记录
export async function getMemberOrder({ input }) {
    const { data, totalCount, msg, success } = await PortraitService.getMemberOrder(input)
    if (!success)
        return { suc: false, msg };
    return { data, totalCount };
}

//购买详情
export async function getMemberOrderDetail(input) {
    const { data, msg, success } = await PortraitService.getMemberOrderDetail(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, msg };
}
//购买农药占比图
export async function getMemberPortrait(input) {
    const { data, msg, success } = await PortraitService.getMemberPortrait(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, msg };
}