import * as MARService from '../services/medicationRecord';
//新增
export async function Add({ input }) {

    const { data, msg, success, totalCount } = await MARService.Add(input)
    if (!success)
        return { suc: false, msg };
    return { data, suc: success };
}
//修改
export async function Update({ input }) {
    const { data, msg, success, totalCount } = await MARService.Update(input)
    if (!success)
        return { suc: false, msg };
    return { data, suc: success };
}
//列表
export async function GetPageList({ input }) {
    const { data, msg, success, totalCount } = await MARService.GetPageList(input)
    if (!success)
        return { suc: false, msg };
    return { data, totalCount };
}
//删除
export async function Delete({ ids }) {
    const { data, msg, success, totalCount } = await MARService.Delete(ids)
    if (!success)
        return { suc: false, msg };
    return { data, suc: success };
}
//详情
export async function GetDetail({ id }) {
    const { data, msg, success } = await MARService.GetDetail(id)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, msg };
}

//获取类型
export async function GetPesticideEffectEnum() {
    const { data, msg, success } = await MARService.GetPesticideEffectEnum()
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, msg };
}

//列表
export async function GoodsSearch({ input }) {
    const { data, msg, success, totalCount } = await MARService.GoodsSearch(input)
    if (!success)
        return { suc: false, msg };
    return { data, totalCount };
}