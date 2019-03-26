import { Post } from '../utils/request';

//获取基地列表
export async function getBaseList(data) {
    return Post(`/Api/BaseLand/Search`, {
        body: JSON.stringify(data)
    });
}
//获取基地-详情
export async function GetBase(data) {
    return Post(`/Api/BaseLand/Get?id=` + data );
}
//添加基地
export async function AddBase(data) {
    return Post(`/Api/BaseLand/Add`, {
        body: JSON.stringify(data)
    });
}
//编辑基地
export async function UpdateBase(data) {
    return Post(`/Api/BaseLand/Edit`, {
        body: JSON.stringify(data)
    });
}
//删除基地
export async function DeleteBase(data) {
    return Post(`/Api/BaseLand/Delete`, {
        body: JSON.stringify(data)
    });
}
//获取企业情况-详情
export async function GetEnterpriseSituation(data) {
    return Post(`/Api/Enterprise/Get?id=` + data );
}
//获取企业情况-列表
export async function getEnterpriseList(data) {
    return Post(`/Api/Enterprise/Search`, {
        body: JSON.stringify(data)
    });
}
//获取企业情况-绑定
export async function AddEnterprise(data) {
    return Post(`/Api/Enterprise/Add`, {
        body: JSON.stringify(data)
    });
}
//获取企业情况-解绑
export async function DeleteEnterprise(data) {
    return Post(`/Api/Enterprise/Delete`, {
        body: JSON.stringify(data)
    });
}