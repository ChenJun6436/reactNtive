import * as StoreService from '../services/cure';

//新增人员
export async function AddCure({ input }) {
    const { data, totalCount, msg, success } = await StoreService.AddCure(input)
    if (!success)
        return { suc: false, msg };
    return {suc: true , data, totalCount };
}

//人员列表
export async function cureList({ input }) {
    const { data, totalCount, msg, success } = await StoreService.cureList(input)
    if (!success)
        return { suc: false, msg };
    return { data, totalCount };
}
//获取作物
export async function GetAllCrop( ) {
    const { data, totalCount, msg, success } = await StoreService.GetAllCrop()
    if (!success)
        return { suc: false, msg };
    return { suc:true,data };
}
export async function GetPhyPrevention( ) {
    const { data, totalCount, msg, success } = await StoreService.GetPhyPrevention()
    if (!success)
        return { suc: false, msg };
    return { suc:true,data };
}
//人员详情
export async function GetDetail( input ) {
    const { data, msg, success } = await StoreService.GetDetail(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data };
}

//删除人员
export async function Deletecure( input ) {
    const { data, msg, success, dataExtend } = await StoreService.Deletecure(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//编辑人员
export async function Editcure({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.Editcure(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}