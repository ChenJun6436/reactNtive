import * as StoreService from '../services/intRecord';

//新增  购买记录
export async function AddBuy({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.AddBuy(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//查询--购买记录
export async function ListBuy({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.ListBuy(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//详情--购买记录
export async function GetBuy( input ) {
    const { data, msg, success, dataExtend } = await StoreService.GetBuy(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//编辑--购买记录
export async function EditBuy({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.EditBuy(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//删除--购买记录
export async function DeleteBuy( input ) {
    const { data, msg, success, dataExtend } = await StoreService.DeleteBuy(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//获取 -所有植物
export async function GetAllCrop( input) {
    const { data, msg, success, dataExtend } = await StoreService.GetAllCrop(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//获取 -所有投入品
export async function GetAllInt( ) {
    const { data, msg, success, dataExtend } = await StoreService.GetAllInt()
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
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
//详情--使用记录
export async function GetUse( input ) {
    const { data, msg, success, dataExtend } = await StoreService.GetUse(input)
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
//删除--使用记录
export async function DeleteUse( input ) {
    const { data, msg, success, dataExtend } = await StoreService.DeleteUse(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//查询所有农产品
export async function SearchGoodsList({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.SearchGoodsList(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//获取包装
export async function GetPackUnit( ) {
    const { data, msg, success, dataExtend } = await StoreService.GetPackUnit()
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//获取单位
export async function GetSpectUnit( ) {
    const { data, msg, success, dataExtend } = await StoreService.GetSpectUnit()
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}