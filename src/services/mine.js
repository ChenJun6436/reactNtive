import { Post } from '../utils/request';

//获取土地的主要种植（养殖）
export async function GetPlantList(data) {
    return Post(`/Api/Plant/GetPlantList?iscurrent=${data}`);
}
//保存主要种植
export async function AddPlant(data) {
    return Post(`/Api/Plant/Submit`, {
        body: JSON.stringify(data)
    });
}

//新增发布
export async function AddPublish(data) {
    return Post(`/Api/Publishment/Add`, {
        body: JSON.stringify(data)
    });
}
//获取发布
export async function GetPublish(data) {
    return Post(`/Api/Publishment/GetList`, {
        body: JSON.stringify(data)
    });
}
//发布详情
export async function PublishDetail(data) {
    return Post(`/Api/Publishment/GetDetail`, {
        body: JSON.stringify(data)
    });
}
//删除发布
export async function DeletePublish(data) {
    return Post(`/Api/Publishment/Delete?id=${data}`);
}
//设置状态
export async function SetPublish(data) {
    return Post(`/Api/Publishment/SetState`, {
        body: JSON.stringify(data)
    });
}
//获取积分
export async function GetUserScore() {
    return Post(`/Api/User/GetUserScore`);
}