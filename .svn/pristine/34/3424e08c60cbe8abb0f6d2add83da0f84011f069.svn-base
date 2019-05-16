import { Post } from '../utils/request';


//新增人员
export async function ToolsAdd(data) {
    return Post(`/Api/AgriMachine/Add`, {
        body: JSON.stringify(data)
    });
}
//人员列表
export async function ToolsList(data) {
    return Post(`/Api/AgriMachine/GetPageList `, {
        body: JSON.stringify(data)
    });
}
//人员详情
export async function ToolsDetail(data) {
    return Post(`/Api/AgriMachine/GetDetail?id=`+ data);
}
//删除人员
export async function ToolsDelete(data) {
    return Post(`/Api/AgriMachine/Delete?ids=`, {
        body: JSON.stringify(data.ids)
    });
}
//编辑人员
export async function ToolsEditor(data) {
    return Post(`/Api/AgriMachine/Update`, {
        body: JSON.stringify(data)
    });
}

