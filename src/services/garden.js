import { Post } from '../utils/request';

//新增 标准园
export async function AddGarden(data) {
    return Post(`/Api/Garden/Add`, {
        body: JSON.stringify(data)
    });
}
//查询 标准园
export async function ListGarden(data) {
    return Post(`/Api/Garden/Search`, {
        body: JSON.stringify(data)
    });
}
//详情--标准园
export async function GetGarden(data) {
    return Post(`/Api/Garden/Get?id=`+ data);
}
//编辑--标准园
export async function EditGarden(data) {
    return Post(`/Api/Garden/Edit `, {
        body: JSON.stringify(data)
    });
}
//删除--标准园
export async function DeleteGarden(data) {
    return Post(`/Api/Garden/Delete?id=`+ data, {
        body: JSON.stringify(data)
    });
}

//查询所有基地
export async function GetAllBase() {
    return Post(`/Api/BaseLand/List`);
}
//查询劳作内容
export async function GetAllWorkContent(data) {
    return Post(`/Api/RetrospectWork/GetWorkContentByCropId?cropId=` + data);
}

//查询土地类型
export async function GetAllType() {
    return Post(`/Api/Garden/Type`);
}

//查询所有园区
export async function GetAllGarden(data) {
    return Post(`/Api/Garden/List?name=`+ data);
}
//根据Id获取地块
export async function GetAllLand(data) {
    return Post(`/Api/BaseLand/Land?id=`+ data);
}

//查询所有植物
export async function GetAllCrop(data) {
    console.log(data)
    return Post(`/Api/GardenCrop/List`, {
        body: JSON.stringify(data)
    });
}

//获取园区植物
export async function GetAllGardenCrop() {
    return Post(`/Api/GardenCrop/GetAllBreed`);
}


//新增 园区植物
export async function AddGardenCrop(data) {
    return Post(`/Api/GardenCrop/Add`, {
        body: JSON.stringify(data)
    });
}
//查询 园区植物
export async function ListGardenCrop(data) {
    return Post(`/Api/GardenCrop/Search`, {
        body: JSON.stringify(data)
    });
}
//详情--园区植物
export async function GetGardenCrop(data) {
    return Post(`/Api/GardenCrop/Get?id=`+ data);
}
//编辑--园区植物
export async function EditGardenCrop(data) {
    return Post(`/Api/GardenCrop/Edit`, {
        body: JSON.stringify(data)
    });
}
//删除--园区植物
export async function DeleteGardenCrop(data) {
    return Post(`/Api/GardenCrop/Delete?id=`+ data, {
        body: JSON.stringify(data)
    });
}