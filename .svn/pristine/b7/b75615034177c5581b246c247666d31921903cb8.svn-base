import * as StoreService from '../services/land';

//获取土地类型
export async function Type({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.Type(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//新增
export async function Add({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.Add(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}

//查询
export async function List({ input }) {
    const { data, msg, totalCount, success, dataExtend } = await StoreService.List(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend, totalCount };
}
//详情
export async function Get(input) {
    const { data, msg, success, dataExtend } = await StoreService.Get(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//编辑
export async function Edit({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.Edit(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//删除
export async function Delete({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.Delete(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}