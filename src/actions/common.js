import * as CommonService from '../services/common';

//登陆
export async function UploadImg({ input }) {
    const { Data, msg, success } = await CommonService.UploadImg(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, Data, msg };
}