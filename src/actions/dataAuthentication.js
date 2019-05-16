import * as DataService from '../services/dataAuthentication';

// 获取基地列表
export async function getBaseList({ input }) {
    const { data, msg, success, totalCount } = await DataService.getBaseList(input)
    if (!success)
        return { suc: false, msg };
    return { data, totalCount };
}
// 获取基地-详情
export async function GetBase(input) {
    const { data, msg, success } = await DataService.GetBase(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data };
}
//添加基地
export async function AddBase({ input }) {
    const { data, msg, success, totalCount } = await DataService.AddBase(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true };
}
//修改基地
export async function UpdateBase({ input }) {
    const { data, msg, success, totalCount } = await DataService.UpdateBase(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true };
}
//删除基地
export async function DeleteBase(input) {
    const { data, msg, success, totalCount } = await DataService.DeleteBase(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true };
}
// 获取企业情况-详情
export async function GetEnterpriseSituation(input) {
    const { data, msg, success } = await DataService.GetEnterpriseSituation(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data };
}
// 获取企业情况-列表
export async function getEnterpriseList({input}) {
    const { data, msg, success, totalCount } = await DataService.getEnterpriseList(input)
    if (!success)
        return { suc: false, msg };
    return { data, totalCount };
}
// 获取企业情况-绑定
export async function AddEnterprise(input) {
    const { data, msg, success } = await DataService.AddEnterprise(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data };
}
// 获取企业情况-解绑
export async function DeleteEnterprise(input) {
    const { data, msg, success } = await DataService.DeleteEnterprise(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data };
}
// 获取绑定状态
export async function GetState() {
    const { data , dataExtend , msg, success } = await DataService.GetState()
    if (!success)
        return { suc: false, msg };
    return { data , dataExtend };
}
// 申请加入企业
export async function SetState({input}) {
    const { data, msg, success, dataExtend } = await DataService.SetState(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true ,dataExtend};
}


// 获取审批情况-列表
export async function GetApplyList({input}) {
    const { data, msg, success, totalCount } = await DataService.GetApplyList(input)
    if (!success)
        return { suc: false, msg };
    return { data, totalCount };
}
// 审批操作
export async function SetApplyState({input}) {
    const { data, msg, success, dataExtend } = await DataService.SetApplyState(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true ,dataExtend};
}
