import { Post } from '../utils/request';

//搜索附近农资店
export async function SearchNearByStore(data) {
    return Post(`/Api/Store/SearchNearByStore`, {
        body: JSON.stringify(data)
    });
}
//搜索农资
export async function SearchGoods(data) {
    return Post(`/Api/Store/SearchGoods`, {
        body: JSON.stringify(data)
    });
}

//农资店详情
export async function ViewStore(data) {
    return Post(`/Api/Store/ViewStore`, {
        body: JSON.stringify(data)
    });
}

//农资店详情
export async function GetGoods(data) {
    return Post(`/Api/Store/GetGoods`, {
        body: JSON.stringify(data)
    });
}
//新增农资店
export async function AddStore(data) {
    return Post(`/Api/UploadStore/Add`, {
        body: JSON.stringify(data)
    });
}