import axios, { axios1 } from '@/utils/axios';
// 退出登录
export const logout = async () => {
    return await axios.delete('/api/permission/auth/logout');
};

// 校验登录名密码是否正确
export const queryverify = async (params) => {
    return await axios.post('/api/permission/auth/verify', params);
};

// 用户信息查询
export const queryUser = async (userId) => {
    return await axios.get(`/api/cloudTeamModule/workCenter/queryUser?userId=${userId}`);
};

// 修改密码
export const changePwd = async (params) => {
    return await axios1.put(`/api/permission/user/changePwd`, params);
};
// 根据组织机构id查询上级组织架构信息
export const queryBackUpperOrgTree = async (empidOrgid) => {
    const res = await axios.get(`/api/cloudTeamModule/workCenter/backUpperOrgTree?empOrgId=${empidOrgid}`);
    res.reverse();
    const rentalName = res.map((item) => item.rentalName).join(' | ');
    return rentalName;
};
