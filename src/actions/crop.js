import * as StoreService from '../services/crop';

//新增关注作物
export async function AddAttentionCrop({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.AddAttentionCrop(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}

//查询--关注作物
export async function List({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.List(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//详情--关注作物
export async function Get( input ) {
    const { data, msg, success, dataExtend } = await StoreService.Get(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//编辑--关注作物
export async function Edit({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.Edit(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//删除--关注作物
export async function Delete({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.Delete(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}