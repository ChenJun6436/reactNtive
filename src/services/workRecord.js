import { Post } from '../utils/request';



//新增
export async function AddUse(data) {
    return Post(`/Api/RetrospectWork/Add`, {
        body: JSON.stringify(data)
    });
}
//查询
export async function ListUse(data) {
    return Post(`/Api/RetrospectWork/GetPageList`, {
        body: JSON.stringify(data)
    });
}
//详情
export async function GetUse(data) {
    return Post(`/Api/RetrospectWork/GetDetail?id=` + data);
}
//编辑
export async function EditUse(data) {
    return Post(`/Api/RetrospectWork/Update`, {
        body: JSON.stringify(data)
    });
}
//删除
export async function DeleteUse(data) {
    return Post(`/Api/RetrospectWork/Delete?id=` + data, {
        body: JSON.stringify(data)
    });
}