import * as DistinguishService from '../services/distinguish';

//二维码扫描
export async function GetCropType() {
    const { data, msg, success } = await DistinguishService.GetCropType()
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, msg };
}

export async function Distinguish({ input,cropEnName }) {
    console.log(input,'input')
    const { Data, Msg, success } = await DistinguishService.Distinguish({input,cropEnName})
    console.log(Data)
    console.log(Msg)
    console.log(success)
    if (!success)
        return { suc: false, Msg };
    return { suc: true, Data, Msg };
}
