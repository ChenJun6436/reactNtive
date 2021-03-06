import { Post } from '../utils/request';





//新增 使用记录
export async function AddUse(data) {
    return Post(`/Api/Examin/Add`, {
        body: JSON.stringify(data)
    });
}
//查询 使用记录
export async function ListUse(data) {
    return Post(`/Api/Examin/GetPage`, {
        body: JSON.stringify(data)
    });
}

//查询 批次
export async function gettraceCodeList(data) {
    return Post(`/Api/ProductStock/GetCropTraceCodes?breedId=` + data);
}
//详情--使用详情
export async function GetUse(data) {
    return Post(`/Api/Examin/Get?id=` + data);
}
//编辑--使用记录
export async function EditUse(data) {
    return Post(`/Api/Examin/Edit`, {
        body: JSON.stringify(data)
    });
}
//删除--使用记录
export async function DeleteUse(data) {
    return Post(`/Api/Examin/Delete?id=`+ data, {
        body: JSON.stringify(data)
    });
}
//获取检测机构
export async function GetUnitList() {
    return Post(`/Api/ExaminUnit/GetUnitList`);
}
