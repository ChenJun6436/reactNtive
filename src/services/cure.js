import { Post } from '../utils/request';


//新增人员
export async function AddCure(data) {
    return Post(`/Api/PhyPrevention/Add`, {
        body: JSON.stringify(data)
    });
}
//人员列表
export async function cureList(data) {
    return Post(`/Api/PhyPrevention/GetPageList`, {
        body: JSON.stringify(data)
    });
}
export async function GetAllCrop() {
    return Post(`/Api/Plant/GetPlantList?isCurrent=true` );
}
export async function GetPhyPrevention() {
    return Post(`/Api/PhyPrevention/GetPhyControlTypes` );
}
//人员详情
export async function GetDetail(data) {
    return Post(`/Api/PhyPrevention/GetDetail`,{
        body: JSON.stringify(data)
    });
}
//删除人员
export async function Deletecure(data) {
    return Post(`/Api/PhyPrevention/Delete`, {
        body: JSON.stringify(data)
    });
}
//编辑人员
export async function Editcure(data) {
    return Post(`/Api/PhyPrevention/Update`, {
        body: JSON.stringify(data)
    });
}

