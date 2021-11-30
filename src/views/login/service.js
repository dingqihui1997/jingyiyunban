import axios, { axios1 } from '@/utils/axios';

// 登录
export const querylogin = async (params) => {
    return await axios1.post('/api/permission/auth/login', params);
};

// 校验登录名密码是否正确
export const queryverify = async (params) => {
    return await axios.post('/api/permission/auth/verify', params);
};
