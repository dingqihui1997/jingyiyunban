import axios from '@/utils/axios';

// 安全点检——历史记录
export const queryCheckRecord = async (params) => {
    return (await axios.get(`/api/cloudTeamModule/safetyCheck/checkRecord?orgId=${params.orgId}`)) || [];
};

// 安全点检——新增
export const insertSafetyCheck = async (params) => {
    return await axios.post('/api/cloudTeamModule/safetyCheck', params);
};

// 安全点检——详情
export const querySafetyCheck = async (id) => {
    return await axios.get(`/api/cloudTeamModule/safetyCheck/${id}`);
};

// 安全点检——获取清单code
export const queryGetListByWtIdOrCheckType = async (params) => {
    return await axios.get(
        `/api/cloudTeamModule/leanChecklist/getListByWtIdOrCheckType?wtId=${params.wtId}&checkType=${params.checkType}&postCode=${params.postCode}`,
        params
    );
};

// 安全点检——检查清单
export const queryLeanChecklist = async (checkCode) => {
    return (await axios.get(`/api/cloudTeamModule/leanChecklist/${checkCode}`)) || {};
};
