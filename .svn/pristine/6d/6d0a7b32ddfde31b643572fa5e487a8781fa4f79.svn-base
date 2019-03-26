import { Post } from '../utils/request';

export async function GetList(data) {
    return Post(`/Api/Solution/GetList`, {
        body: JSON.stringify(data)
    });
}
export async function GetDetail(id) {
    return Post(`/Api/Solution/GetDetail?id=${id}`);
}

export async function SolutionNotReadCount(id) {
    return Post(`/Api/Solution/GetNotReadCount`);
}