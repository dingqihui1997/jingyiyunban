import axios from '@/utils/axios';
import { dateStringify } from '@isyscore/utils/date';

// 获取班前会议历史记录
export const queryHisRecord = async (orgId) => {
    const res = await axios.get(`/api/cloudTeamModule/leanMorningMeeting/hisRecord?orgId=${orgId}`);
    res.map((item) => {
        item.record.orgTreeName = item.record.orgTreeName.split(',').join('');
    });
    return res;
};
// 新增班前会议
export const insertLeanMorningMeeting = async (params) => {
    return await axios.post('/api/cloudTeamModule/leanMorningMeeting', params);
};
// 班前会议详情信息
export const queryLeanMorningMeeting = async (id) => {
    const res = await axios.get(`/api/cloudTeamModule/leanMorningMeeting/${id}`);
    res.record.createTime = dateStringify(res.record.createTime, 'YYYY-MM-DD');
    return res;
};

export const uploadFile = async (params) => {
    return await axios.post(`/api/cloudTeamModule/leanUploadfileRecord/uploadFile/multipart/form-data`, params, {
        ContentType: 'multipart/form-data	'
    });
};
