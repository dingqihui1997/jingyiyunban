import axios from '@/utils/axios';
import { dateStringify } from '@isyscore/utils/date';

// 获取调岗申请列表
export const queryList = async () => {
    const res = await axios.get('/api/cloudTeamModule/changePostApply/pageData');
    return res;
};
// 获取调岗申请历史记录
export const queryhisRecord = async (orgId) => {
    const res = await axios.get(`/api/cloudTeamModule/changePostApply/hisRecord?orgId=${orgId}`);
    return res;
};
// 获取调岗申请信息
export const queryChangePostApply = async (id) => {
    const res = await axios.get(`/api/cloudTeamModule/changePostApply/${id}`);
    return res;
};
// 新增调岗
export const insertChangePostApply = async (params) => {
    const res = await axios.post(`/api/cloudTeamModule/changePostApply`, params);
    return res;
};

//获取元数据列表
export const queryMetadataList = async (params) => {
    const { pageNum = 1, pageSize = 20, keywords } = params;
    const res = await axios.get('/api/dataModel/metadata/search', {
        params: {
            current: pageNum,
            size: pageSize,
            openStatus: 1,
            orders: 'created_at.desc',
            condition: keywords
        }
    });
    const { total, records } = res || {};

    return { total, records };
};

//获取元数据属性列表
export const queryMetadataPropList = async (metadataCode) => {
    const res = await axios.get('/api/dataModel/metadata/propList?metadataCode=' + metadataCode);

    return res.map((item) => {
        return { label: item.propertyName, value: item.propertyCode };
    });
};

// 空间对象——新增
export const insertSpaceObject = async (params) => {
    return await axios.post('/api/factoryModel/spaceObject', params);
};

// 空间对象——修改
export const updateSpaceObject = async (params) => {
    return await axios.put('/api/factoryModel/spaceObject', params);
};

// 空间对象——删除
export const deleteSpaceObject = async (id) => {
    return await axios.delete(`/api/factoryModel/spaceObject/${id}`);
};
