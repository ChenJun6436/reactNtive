import { Post } from '../utils/request';

//获取土地类型
export async function Type(data) {
    return Post(`/Api/Land/GetLandEnum`);
}
//新增土地
export async function Add(data) {
    return Post(`/Api/Land/Add`, {
        body: JSON.stringify(data)
    });
}
//查询
export async function List(data) {
    return Post(`/Api/Land/GetPageList`, {
        body: JSON.stringify(data)
    });
}
//详情
export async function Get(data) {
    return Post(`/Api/Land/GetDetail?id=`+ data);
}
//编辑
export async function Edit(data) {
    return Post(`/Api/Land/Update`, {
        body: JSON.stringify(data)
    });
}
//删除
export async function Delete(data) {
    return Post(`/Api/Land/Delete`, {
        body: JSON.stringify(data)
    });
}