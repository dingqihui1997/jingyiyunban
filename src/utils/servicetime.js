import axios from '@/utils/axios';

// 系统时间——精确到天
export const queryNow = async (params) => {
    const res = await axios.get('/api/cloudTeamModule/system/time/now', params);
    const { date } = res;
    return date;
};
