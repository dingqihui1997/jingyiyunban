import axios from '@/utils/axios';

// 5s——历史记录
export const queryHisRecord = async (params) => {
    return (await axios.get(`/api/cloudTeamModule/lean5sactivityRecord/hisRecord?orgId=${params.orgId}`)) || [];
};

// 5s——区域信息
export const queryQueryAll = async (params) => {
    let res = await axios.get('/api/cloudTeamModule/leanArea/queryAll', params);
    if (res.length) {
        res.forEach((element) => {
            element.name = element.areaName;
        });
    } else {
        res = [];
    }
    return res;
};

// 5s——分区域列表信息
export const queryGetDivisionsByAreaId = async (id) => {
    return (await axios.get(`/api/cloudTeamModule/leanAreaDivision/getDivisionsByAreaId?areaId=${id}`)) || [];
};

// 5s——分区域详细信息
export const queryLeanAreaDivision = async (id) => {
    const res = await axios.get(`/api/cloudTeamModule/leanAreaDivision/${id}`);
    if (res.status == 'UNCHECKED') {
        res.statusName = '未发牌';
    } else if (res.status == 'GOOD') {
        res.statusName = '绿牌';
    } else if (res.status == 'MID') {
        res.statusName = '黄牌';
    } else {
        res.statusName = '红牌';
    }
    return res;
};

// 5s——分区域发牌
export const insertLean5sactivityRecor = async (params) => {
    return await axios.post('/api/cloudTeamModule/lean5sactivityRecord', params);
};

// 5s——分区域检查标准
export const queryQueryFileList = async (params) => {
    return (await axios.post(`/api/cloudTeamModule/leanUploadfileRecord/queryFileList`, params)) || [];
};
