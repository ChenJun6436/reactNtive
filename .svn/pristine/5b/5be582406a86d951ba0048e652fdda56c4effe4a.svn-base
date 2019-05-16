import * as StoreService from '../services/control';

//获取作物信息
export async function GetPlantList() {
    const { data, totalCount, msg, success } = await StoreService.GetPlantList()
    if (!success)
        return { suc: false, msg };
    return {suc: true , data, totalCount };
}
//获取几把
export async function GetAgriPreventionControlClass({ input }) {
    const { data, totalCount, msg, success } = await StoreService.GetAgriPreventionControlClass(input)
    if (!success)
        return { suc: false, msg };
    return {suc: true , data, totalCount };
}
//新增防控
export async function ControlAdd({ input }) {
    const { data, totalCount, msg, success } = await StoreService.ControlAdd(input)
    if (!success)
        return { suc: false, msg };
    return {suc: true , data, totalCount };
}

//防控列表
export async function ControlList({ input }) {
    const { data, totalCount, msg, success } = await StoreService.ControlList(input)
    if (!success)
        return { suc: false, msg };
    return { data, totalCount };
}
//防控详情
export async function ControlDetail( {input} ) {
    const { data, msg, success } = await StoreService.ControlDetail(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data };
}

//删除防控
export async function ControlDelete( {input} ) {
    const { data, msg, success, dataExtend } = await StoreService.ControlDelete(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//编辑防控
export async function ControlEditor({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.ControlEditor(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}