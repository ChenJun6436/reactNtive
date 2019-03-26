import { Post, Upload } from '../utils/request';
export async function GetCropType() {
    return Post(`/Api/CropPestImageDistinguish/GetCropType`);
}
export async function Distinguish({ input, cropEnName }) {
    console.log(input)
    return Upload(`/Api/CropPestImageDistinguish/Distinguish?CropEnName=${cropEnName}`, {
        body: input
    });
}