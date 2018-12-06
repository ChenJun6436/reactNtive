import * as qrCodeService from '../services/qrCode';

//二维码扫描
export async function searchQRCode({ qrCode }) {
    const { data, msg, success } = await qrCodeService.searchQRCode(qrCode)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, msg };
}

export async function AddSearchLog({ input }) {
    const { data, msg, success } = await qrCodeService.AddSearchLog(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, msg };
}
