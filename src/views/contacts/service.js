import axios from '@/utils/axios';
// 根据班组id查询人员信息
export const queryLeanEmployee = async (wtId) => {
    const res = await axios.get(`/api/cloudTeamModule/leanEmployee/queryByWtId?wtId=` + wtId);
    return res;
};
// 获取人员信息/lean-cloudteam
export const queryPageData = async () => {
    const res = await axios.get(`/api/cloudTeamModule/leanEmployee/pageData`);
    return res;
};

// 获取岗位
// 分页查询岗位信息
export const queryLeanPost = async () => {
    return await axios.get(`/api/cloudTeamModule/leanPost/pageData`);
};
// 查询不包含旧岗位信息
export const queryNotOldPost = async (id) => {
    return await axios.get(`/api/cloudTeamModule/leanPost/queryNotOldPost?id=${id}`);
};
