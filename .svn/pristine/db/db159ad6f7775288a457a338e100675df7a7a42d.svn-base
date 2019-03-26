import * as StoreService from '../services/staff';

//新增人员
export async function StaffAdd({ input }) {
    const { data, totalCount, msg, success } = await StoreService.StaffAdd(input)
    if (!success)
        return { suc: false, msg };
    return {suc: true , data, totalCount };
}

//人员列表
export async function StaffList({ input }) {
    const { data, totalCount, msg, success } = await StoreService.StaffList(input)
    if (!success)
        return { suc: false, msg };
    return { data, totalCount };
}
//人员详情
export async function StaffDetail( input ) {
    const { data, msg, success } = await StoreService.StaffDetail(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data };
}

//删除人员
export async function StaffDelete( input ) {
    const { data, msg, success, dataExtend } = await StoreService.StaffDelete(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//编辑人员
export async function StaffEditor({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.StaffEditor(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}