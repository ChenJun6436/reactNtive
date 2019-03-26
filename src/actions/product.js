import * as StoreService from '../services/product';

//新增  采收
export async function AddProductRecovery({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.AddProductRecovery(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//查询--采收
export async function ListProductRecovery({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.ListProductRecovery(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//详情--采收
export async function GetProductRecovery( input ) {
    const { data, msg, success, dataExtend } = await StoreService.GetProductRecovery(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//编辑--采收
export async function EditProductRecovery({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.EditProductRecovery(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//删除--采收
export async function DeleteProductRecovery( input ) {
    const { data, msg, success, dataExtend } = await StoreService.DeleteProductRecovery(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//获取 -所有土壤
export async function GetAllType( ) {
    const { data, msg, success, dataExtend } = await StoreService.GetAllType()
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//获取 -所有基地
export async function GetAllBase( ) {
    const { data, msg, success, dataExtend } = await StoreService.GetAllBase()
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//获取 -所有工人和客户
export async function GetAllPeople(input) {
    const { data, msg, success, dataExtend } = await StoreService.GetAllPeople(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//查询天气
export async function GetAllWeather( ) {
    const { data, msg, success, dataExtend } = await StoreService.GetAllWeather()
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}

//获取 -所有园区
export async function GetAllGarden(input ) {
    const { data, msg, success, dataExtend } = await StoreService.GetAllGarden(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//获取 -所有地块
export async function GetAllLand( input ) {
    const { data, msg, success, dataExtend } = await StoreService.GetAllLand(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}

//获取 -所有作物
export async function GetAllCrop( input ) {
    const { data, msg, success, dataExtend } = await StoreService.GetAllCrop(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//获取库存作物列表
export async function GetAllPackCrop( ) {
    const { data, msg, success, dataExtend } = await StoreService.GetAllPackCrop()
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//根据作物ID查询批次
export async function GetAllCropTrace( input ) {
    const { data, msg, success, dataExtend } = await StoreService.GetAllCropTrace(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//新增  销售
export async function AddProductSale({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.AddProductSale(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//查询--销售
export async function ListProductSale({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.ListProductSale(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//详情--销售
export async function GetProductSale( input ) {
    const { data, msg, success, dataExtend } = await StoreService.GetProductSale(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//编辑--销售
export async function EditProductSale({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.EditProductSale(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//删除--销售
export async function DeleteProductSale( input ) {
    const { data, msg, success, dataExtend } = await StoreService.DeleteProductSale(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}