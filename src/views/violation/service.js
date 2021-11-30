import axios from '@/utils/axios';

// 违规记录——历史记录
export const queryHisRecord = async (params) => {
    return (await axios.get(`/api/cloudTeamModule/leanIllegalRecord/hisRecord?orgId=${params.orgId}`)) || [];
};

// 违规记录——新增
export const insertLeanIllegalRecord = async (params) => {
    return await axios.post('/api/cloudTeamModule/leanIllegalRecord', params);
};

// 违规记录——详情
export const queryLeanIllegalRecord = async (id) => {
    return await axios.get(`/api/cloudTeamModule/leanIllegalRecord/${id}`);
};
