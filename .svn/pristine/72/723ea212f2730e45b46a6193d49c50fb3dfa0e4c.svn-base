import * as EnumsService from '../services/enums';
// import TestStore from '../stores/test';
//获取种植习惯
export async function getPlantingHabits({ input }) {
    const { data, msg, success } = await EnumsService.getPlantingHabits(input)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data };
}

