import { Post } from '../utils/request';

//新增关注作物
export async function AddAttentionCrop(data) {
    return Post(`/Api/AttentionCrop/Add`, {
        body: JSON.stringify(data)
    });
}
//查询--关注作物
export async function List(data) {
    return Post(`/Api/AttentionCrop/List`, {
        body: JSON.stringify(data)
    });
}
//详情--关注作物
export async function Get(data) {
    return Post(`/Api/AttentionCrop/Get?id=`+ data);
}
//编辑--关注作物
export async function Edit(data) {
    return Post(`/Api/AttentionCrop/Edit`, {
        body: JSON.stringify(data)
    });
}
//删除--关注作物
export async function Delete(data) {
    return Post(`/Api/AttentionCrop/Delete`, {
        body: JSON.stringify(data)
    });
}