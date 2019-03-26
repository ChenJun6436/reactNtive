import { Post, Upload } from '../utils/request';
// export async function UploadImg(data) {
//     return Upload(`/Api/Images/Upload?OSSDicType=1`, {
//         body: JSON.stringify(data)
//     });
// }
export async function UploadImg(data) {
    return Upload(`/Api/Images/Upload?OSSDicType=${data.type}`, {
        body: data.formData
    });
}