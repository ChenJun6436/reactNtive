import * as MineService from '../services/mine';
import AccountStore from '../stores/account';
//获取土地种植养殖列表
export async function GetPlantList(input) {
    const { data, msg, success } = await MineService.GetPlantList(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, msg };
}

//保存土地种植养殖列表
export async function AddPlant({ input }) {
    const { data, msg, success } = await MineService.AddPlant(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, msg };
}

//新增发布
export async function AddPublish({ input }) {
    const { data, msg, success } = await MineService.AddPublish(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, msg };
}
//获取发布
export async function GetPublish({ input }) {
    const { data, msg, success, totalCount } = await MineService.GetPublish(input)
    if (!success)
        return { suc: false, msg };
    return { data, totalCount };
}
//删除发布
export async function DeletePublish(input) {
    const { data, msg, success } = await MineService.DeletePublish(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, msg };
}
//发布详情
export async function PublishDetail(input) {
    const { data, msg, success } = await MineService.PublishDetail(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, msg };
}
//发布状态
export async function SetPublish({ input }) {
    const { data, msg, success } = await MineService.SetPublish(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, msg };
}

//获取积分
export async function GetUserScore() {
    const { data, msg, success } = await MineService.GetUserScore()
    if (!success)
        return { suc: false, msg };
    AccountStore.setScore(data);
    return { suc: true, data, msg };
}