import axios from '@/utils/axios';

// 审批中心——组织架构
export const queryOrgTreeList = async (params) => {
    return await axios.get('/api/cloudTeamModule/workCenter/queryOrgTreeList', params);
};

// 审批中心——班组审批统计接口
export const queryStaticApproveByOrg = async (params) => {
    return await axios.get(`/api/cloudTeamModule/changePostApply/staticApproveByOrg?empidOrgid=${params.empidOrgid}`);
};

// 审批中心——按班组查询调岗申请记录
export const queryGetRecordByOrgId = async (params) => {
    let res = await axios.get(
        `/api/cloudTeamModule/changePostApply/getRecordByOrgId?empidOrgid=${params.empidOrgid}&applyStatus=${params.applyStatus}`
    );
    if (res) {
        res.forEach((element) => {
            element.title = '调岗记录';
        });
    }
    return res || [];
};

// 审批中心——调岗申请审批通过
export const insertApplyApprove = async (params) => {
    return await axios.post(`/api/cloudTeamModule/changePostApply/applyApproved`, params);
};

// 审批中心——调岗申请审批拒绝
export const insertApplyReject = async (params) => {
    return await axios.post(`/api/cloudTeamModule/changePostApply/applyReject`, params);
};

// // 审批中心——按班组查询需知情列表
// export const queryGetRecordByReadFlagId = async (params) => {
//     return await axios.get(`/api/cloudTeamModule/changePostApply/getRecordByReadFlagId?empidOrgid=${params.empidOrgid}&readFlag=${params.readFlag}`) || [];
// };

// 审批中心——按班组查询需知情早上巡检列表
export const queryGetLeanInspectionRecord = async (params) => {
    let res = await axios.get(
        `/api/cloudTeamModule/leanInspectionRecord/getLeanInspectionRecord?empidOrgid=${params.empidOrgid}`
    );
    if (res) {
        res.forEach((element) => {
            element.title = '早上巡检';
        });
    }
    return res || [];
};

// 审批中心——按班组查询需知情安全点检列表
export const queryFindSafetyCheckMsg = async (params) => {
    let res = await axios.get(`/api/cloudTeamModule/safetyCheck/findSafetyCheckMsg?empidOrgid=${params.empidOrgid}`);
    if (res) {
        res.forEach((element) => {
            element.title = '安全点检';
        });
    }
    return res || [];
};

// 审批中心——按班组查询需知情违规记录列表
export const queryGetleanIllegalRecord = async (params) => {
    let res = await axios.get(
        `/api/cloudTeamModule/leanIllegalRecord/getleanIllegalRecord?empidOrgid=${params.empidOrgid}`
    );
    if (res) {
        res.forEach((element) => {
            element.title = '违规记录';
        });
    }
    return res || [];
};

// 审批中心——修改需知情状态
export const queryChangeReadFlag = async (params) => {
    return await axios.get(`/api/cloudTeamModule/changePostApply/changeReadFlag?applyCode=${params.applyCode}`);
};
