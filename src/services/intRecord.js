import { Post } from '../utils/request';

//新增 购买记录
export async function AddBuy(data) {
    return Post(`/Api/InvestmentPurchase/Add`, {
        body: JSON.stringify(data)
    });
}
//查询 购买记录
export async function ListBuy(data) {
    return Post(`/Api/InvestmentPurchase/GetPageList`, {
        body: JSON.stringify(data)
    });
}
//详情--购买记录
export async function GetBuy(data) {
    return Post(`/Api/InvestmentPurchase/GetDetail?id=`+ data);
}
//编辑--购买记录
export async function EditBuy(data) {
    return Post(`/Api/InvestmentPurchase/Update`, {
        body: JSON.stringify(data)
    });
}
//删除--购买记录
export async function DeleteBuy(data) {
    return Post(`/Api/InvestmentPurchase/Delete?id=`+ data, {
        body: JSON.stringify(data)
    });
}
//查询所有植物
export async function GetAllCrop(data) {
    return Post(`/Api/GardenCrop/List`, {
        body: JSON.stringify(data)
    });
}
//查询所有投入品
export async function GetAllInt() {
    return Post(`/Api/InvestmentPurchase/GetAll`);
}
//新增 使用记录
export async function AddUse(data) {
    return Post(`/Api/InvestmentUse/Add`, {
        body: JSON.stringify(data)
    });
}
//查询 使用记录
export async function ListUse(data) {
    return Post(`/Api/InvestmentUse/GetPage`, {
        body: JSON.stringify(data)
    });
}
//详情--使用记录
export async function GetUse(data) {
    return Post(`/Api/InvestmentUse/Get?id=`+ data);
}
//编辑--使用记录
export async function EditUse(data) {
    return Post(`/Api/InvestmentUse/Edit`, {
        body: JSON.stringify(data)
    });
}
//删除--使用记录
export async function DeleteUse(data) {
    return Post(`/Api/InvestmentUse/Delete?id=`+ data, {
        body: JSON.stringify(data)
    });
}
//查询所有农产品
export async function SearchGoodsList(data) {
    return Post(`/Api/InvestmentPurchase/SearchGoodsList`, {
        body: JSON.stringify(data)
    });
}
//获取包装
export async function GetPackUnit() {
    return Post(`/Api/InvestmentPurchase/GetPackUnit`);
}
//获取单位
export async function GetSpectUnit() {
    return Post(`/Api/InvestmentPurchase/GetSpectUnit`);
}