import * as StoreService from '../services/tools';

//新增人员
export async function ToolsAdd({ input }) {
    const { data, totalCount, msg, success } = await StoreService.ToolsAdd(input)
    if (!success)
        return { suc: false, msg };
    return {suc: true , data, totalCount };
}

//人员列表
export async function ToolsList({ input }) {
    const { data, totalCount, msg, success } = await StoreService.ToolsList(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true,data, totalCount };
}
//人员详情
export async function ToolsDetail( input ) {
    const { data, msg, success } = await StoreService.ToolsDetail(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data };
}

//删除人员
export async function ToolsDelete( input ) {
    const { data, msg, success, dataExtend } = await StoreService.ToolsDelete(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}
//编辑人员
export async function ToolsEditor({ input }) {
    const { data, msg, success, dataExtend } = await StoreService.ToolsEditor(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, dataExtend };
}