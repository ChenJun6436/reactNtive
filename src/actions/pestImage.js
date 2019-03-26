import * as pestImageService from '../services/pestImage';

export async function UploadPestImage({ input }) {
    const { data, msg, success } = await pestImageService.UploadPestImage(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, msg };
}

export async function GetPestImageByPest({ input }) {
    const { data, msg, success } = await pestImageService.GetPestImageByPest(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, msg };
}

export async function SearchGround({ input }) {
    const { data, msg, success } = await pestImageService.SearchGround(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, msg };
}