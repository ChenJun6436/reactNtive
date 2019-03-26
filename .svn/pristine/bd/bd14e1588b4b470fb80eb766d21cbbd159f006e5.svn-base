import { Post } from '../utils/request';
export async function searchQRCode(qrCode) {
    return Post(`/Api/QrCode/Search?qrCode=${qrCode}`);
}
export async function AddSearchLog(data) {
    return Post(`/Api/QrCode/AddSearchLog`, {
        body: JSON.stringify(data)
    });
}