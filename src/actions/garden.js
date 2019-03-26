import * as StoreService from '../services/garden';

//新增  标准园
export async function AddGarden({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.AddGarden(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//查询--标准园
export async function ListGarden({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.ListGarden(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//详情--标准园
export async function GetGarden( input ) {
    const { data, msg, success, dataExtend } = await StoreService.GetGarden(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//编辑--标准园
export async function EditGarden({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.EditGarden(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//删除--标准园
export async function DeleteGarden( input ) {
    const { data, msg, success, dataExtend } = await StoreService.DeleteGarden(input)
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
//获取 -劳作内容
export async function GetAllWorkContent(input) {
    const { data, msg, success, dataExtend } = await StoreService.GetAllWorkContent(input)
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
    console.log(input)
    const { data, msg, success, dataExtend } = await StoreService.GetAllCrop(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}


//新增  使用记录
export async function AddGardenCrop({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.AddGardenCrop(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//查询--使用记录
export async function ListGardenCrop({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.ListGardenCrop(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//详情--使用记录
export async function GetGardenCrop( input ) {
    const { data, msg, success, dataExtend } = await StoreService.GetGardenCrop(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//编辑--使用记录
export async function EditGardenCrop({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.EditGardenCrop(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//删除--使用记录
export async function DeleteGardenCrop( input ) {
    const { data, msg, success, dataExtend } = await StoreService.DeleteGardenCrop(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//获取园区植物
export async function GetAllGardenCrop( ) {
    const { data, msg, success, dataExtend } = await StoreService.GetAllGardenCrop()
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
