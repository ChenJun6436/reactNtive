import * as solutionService from '../services/solution';

export async function GetList({ input }) {
    const { data, msg, success, totalCount } = await solutionService.GetList(input)
    if (!success)
        return { suc: false, msg };
    return { data, totalCount };
}

export async function GetDetail({ id }) {
    const { data, msg, success } = await solutionService.GetDetail(id)
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, msg };
}
export async function SolutionNotReadCount() {
    const { data, msg, success } = await solutionService.SolutionNotReadCount()
    if (!success)
        return { suc: false, msg };
    return { suc: true, data, msg };
}