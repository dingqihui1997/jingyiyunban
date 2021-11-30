import axios from '@/utils/axios';

//组织架构管理----  查询组织详情  os
export const queryRentalInfo = async (code) => {
    return await axios.get(`/api/permission/rentalInfo/queryRentalInfo?code=${code}`);
};
// 查询当前用户所属组织的下级组织机构信息
export const queryCurrentChildOrgList = async () => {
    return await axios.get(`/api/cloudTeamModule/workCenter/queryCurrentChildOrgList`);
};
// 根据组织机构ID查询下级组织机构信息
export const queryChildOrgList = async (id) => {
    return await axios.get(`/api/cloudTeamModule/workCenter/queryChildOrgList?id=${id}`);
};
// 用户信息
export const queryUser = async (userId) => {
    return await axios.get(`/api/cloudTeamModule/workCenter/queryUser?userId=${userId}`);
};
// 根据组织机构id查询上级组织架构信息
export const queryBackUpperOrgTree = async (empidOrgid) => {
    const res = await axios.get(`/api/cloudTeamModule/workCenter/backUpperOrgTree?empOrgId=${empidOrgid}`);
    if (res.length) {
        res.reverse();
        const rentalName = res.map((item) => item.rentalName).join(' | ');
        return rentalName;
    }
};
