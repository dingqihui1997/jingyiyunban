import axios from '@/utils/axios';
import { dateStringify } from '@isyscore/utils/date';

// 获取早上巡检历史记录
export const queryHisRecord = async (orgId) => {
    const res = await axios.get(`/api/cloudTeamModule/leanInspectionRecord/hisRecord?orgId=${orgId}`);
    res.map((item) => {
        if (item.record.orgTreeName) {
            item.record.orgTreeName = item.record.orgTreeName.split(',').join('');
        }
    });
    return res;
};
// 新增早上巡检信息
export const insertInspectionRecord = async (params) => {
    return await axios.post('/api/cloudTeamModule/leanInspectionRecord', params);
};
// 获取早上巡检信息 详情
export const queryLeanInspectionRecord = async (id) => {
    const res = axios.get(`/api/cloudTeamModule/leanInspectionRecord/${id}`);
    return res;
};

// 获取检查清单通过班组id或者清单类型
export const queryGetListByWtIdOrCheckType = async (params) => {
    const res = await axios.get(
        `/api/cloudTeamModule/leanChecklist/getListByWtIdOrCheckType?wtId=${params.wtId}&checkType=${params.checkType}&postCode=${params.postCode}`
    );
    const { checkCode } = res;
    return checkCode;
};
// 获取清单详情
export const queryLeanChecklist = async (checkCode) => {
    return await axios.get(`/api/cloudTeamModule/leanChecklist/${checkCode}`);
};
// 分页查询检查清单
export const queryPageData = async () => {
    return await axios.get(`/api/cloudTeamModule/leanChecklist/pageData`);
};

// 空间模型——删除
export const deleteSpaceModel = async (id) => {
    return await axios.delete(`/api/factoryModel/spaceModel/${id}`);
};

// 层级配置信息-元数据树形结构
export const queryLevelConfigTree = async (id) => {
    const res = await axios.get(`/api/factoryModel/levelConfig/tree/${id}`);
    const { enterprise } = await axios.get('/api/factoryModel/levelConfig/getBasicConfigInfo');
    const nodeTree = {
        metadataCodeName: enterprise,
        parentMetadataCode: 'L0',
        id: 'L0',
        childTreeList: res
    };

    return [nodeTree];
};

// 查询可使用的空间对象信息
export const querySpaceObjectListAva = async (smid) => {
    const res = await axios.get('/api/factoryModel/spaceObject/listAva?smid=' + smid);

    return res.map((item) => {
        return { label: item.metadataName, value: item.metadataCode };
    });
};

// 层级信息-新增
export const insertLevel = async (params) => {
    return await axios.post('/api/factoryModel/levelConfig', params);
};

// 层级信息-修改
export const updateLevel = async (params) => {
    return await axios.put('/api/factoryModel/levelConfig', params);
};

// 层级信息-删除
export const deleteLevel = async (id) => {
    return await axios.delete(`/api/factoryModel/levelConfig/${id}`);
};
