import { Post } from '../utils/request';
export async function UploadPestImage(data) {
    return Post(`/Api/PestImage/UploadPestImage`, {
        body: JSON.stringify(data)
    });
}

export async function GetPestImageByPest(data) {
    return Post(`/Api/PestImage/GetPestImageByPest`, {
        body: JSON.stringify(data)
    });
}

export async function SearchGround(data) {
    return Post(`/Api/PestImage/SearchGround`, {
        body: JSON.stringify(data)
    });
}