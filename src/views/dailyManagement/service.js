import axios from '@/utils/axios';

// 审批中心——组织架构
export const queryOrgTreeList = async (params) => {
    return await axios.get('/api/cloudTeamModule/workCenter/queryOrgTreeList', params);
};
//
export const queryUserAcl = async () => {
    const res = await axios.get(`/api/cloudTeamModule/workCenter/queryUserAcl?qryPcMenuFlag=${false}`);
    const { aclsList } = res[0];
    return aclsList;
};
