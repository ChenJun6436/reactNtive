import { Post } from '../utils/request';


//新增人员
export async function StaffAdd(data) {
    console.log(data)
    return Post(`/Api/Staff/Add`, {
        body: JSON.stringify(data)
    });
}
//人员列表
export async function StaffList(data) {
    return Post(`/Api/Staff/GetPageList `, {
        body: JSON.stringify(data)
    });
}
//人员详情
export async function StaffDetail(data) {
    return Post(`/Api/Staff/GetDetail?id=`+ data);
}
//删除人员
export async function StaffDelete(data) {
    return Post(`/Api/Staff/Delete`, {
        body: JSON.stringify(data)
    });
}
//编辑人员
export async function StaffEditor(data) {
    return Post(`/Api/Staff/Update`, {
        body: JSON.stringify(data)
    });
}

