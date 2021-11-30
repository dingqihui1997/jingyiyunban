import axios from '@/utils/axios';

// kyt——历史记录
export const queryHisRecord = async (params) => {
    return (await axios.get(`/api/cloudTeamModule/leanKytActivity/hisRecord?orgId=${params.orgId}`)) || [];
};

// kyt——新增
export const insertLeanKytActivity = async (params) => {
    return await axios.post('/api/cloudTeamModule/leanKytActivity', params);
};

// kyt——详情
export const queryLeanKytActivity = async (id) => {
    return await axios.get(`/api/cloudTeamModule/leanKytActivity/${id}`);
};
