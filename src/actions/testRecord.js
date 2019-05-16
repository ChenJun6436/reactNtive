import * as StoreService from '../services/testRecord';




//新增  使用记录
export async function AddUse({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.AddUse(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//查询--使用记录
export async function ListUse({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.ListUse(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//详情--检测详情
export async function GetUse( input ) {
    const { data, msg, success, dataExtend } = await StoreService.GetUse(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}



export async function gettraceCodeList(input) {
    const { data, msg, success, dataExtend } = await StoreService.gettraceCodeList(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//编辑--使用记录
export async function EditUse({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.EditUse(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}

//删除
export async function DeleteUse( input ) {
    const { data, msg, success, dataExtend } = await StoreService.DeleteUse(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//获取检测机构
export async function GetUnitList( input ) {
    const { data, msg, success, dataExtend } = await StoreService.GetUnitList(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
