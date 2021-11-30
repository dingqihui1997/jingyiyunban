import axios from '@/utils/axios';

let config = {
    headers: {
        //添加请求头
        'Content-Type': 'multipart/form-data'
    }
};
// 公共上传——上传
export const insertUploadFile = async (businessKey, businessModule, params) => {
    const res = await axios.post(
        `/api/cloudTeamModule/leanUploadfileRecord/uploadFile?businessKey=${businessKey}&businessModule=${businessModule}`,
        params,
        config
    );
    const { id } = res;
    return id;
};

// 公共上传——删除文件
export const deleteLeanUploadfileRecord = async (id) => {
    return await axios.delete(`/api/cloudTeamModule/leanUploadfileRecord/${id}`);
};
