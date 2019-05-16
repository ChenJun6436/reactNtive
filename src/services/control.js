import { Post } from '../utils/request';
//获取作物信息
export async function GetPlantList() {
    return Post(`/Api/Plant/GetPlantList?isCurrent=true`);
}
//获取几把
export async function GetAgriPreventionControlClass(data) {
    return Post(`/Api/PreventionControl/GetAgriPreventionControlClass`, {
        body: JSON.stringify(data)
    });
}
//新增防控
export async function ControlAdd(data) {
    return Post(`/Api/PreventionControl/Add`, {
        body: JSON.stringify(data)
    });
}
//防控列表
export async function ControlList(data) {
    return Post(`/Api/PreventionControl/GetPageList `, {
        body: JSON.stringify(data)
    });
}
//防控详情
export async function ControlDetail(data) {
    return Post(`/Api/PreventionControl/GetDetail`, {
        body: JSON.stringify(data)
    });
}
//删除防控
export async function ControlDelete(data) {
    return Post(`/Api/PreventionControl/Delete`, {
        body: JSON.stringify(data)
    });
}
//编辑防控
export async function ControlEditor(data) {
    return Post(`/Api/PreventionControl/Update`, {
        body: JSON.stringify(data)
    });
}

