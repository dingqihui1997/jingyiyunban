import axios from '@/utils/axios';

export async function queryAclList() {
    try {
        const res = await axios({
            // 权限接口二次封装
            url: `/api/cloudTeamModule/workCenter/queryUserAcl?qryPcMenuFlag=false`
        });
        const { aclsList } = res[0];

        return aclsList;
    } catch {
        return [];
    }
}
