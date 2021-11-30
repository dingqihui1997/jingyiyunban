<template>
    <div class="homeBox">
        <div class="homeTop">
            <div class="welcome colorFFF">你好，欢迎使用精益云班！</div>
        </div>
        <div class="disFlex-ja">
            <div class="homeUser disFlex">
                <div class="homeUserImg"><img src="../../assets/image/home.png" alt="" /></div>
                <div>
                    <div class="disFlex userName disFlex-a">
                        <div class="fontSize18 font-W500 homename">{{ userInfo.loginName }}</div>
                        <div class="color0009 fontSize14 homeID">ID：{{ userInfo.userId }}</div>
                    </div>
                    <div class="section fontSize14">{{ empidOrg }}</div>
                </div>
                <div class="disFlex-a leaveFor" @click="gotoMy">
                    <isc-svg-icon name="iscon-angle-right" color="#00000066" size="16px"></isc-svg-icon>
                </div>
            </div>
        </div>
        <div class="modular">
            <div
                v-for="(item, index) in aclList"
                :key="index"
                class="flex-dji"
                :class="{ modularLeft: !index, Examine: index === 1, Data: index === 2 }"
                @click="goto(item, index)"
            >
                <div class="flex-dji">
                    <div>
                        <img :src="item.icon" :class="{ richangIcon: !index, shenp: index == 1, shuju: index == 2 }" />
                    </div>
                    <div class="fontSize18 colorFFF">{{ item.name.substring(3) }}</div>
                </div>
            </div>
        </div>
        <tips-popup ref="popup" title="无法查看" text="暂无权限，请联系管理员"></tips-popup>
    </div>
</template>

<script>
import { queryRentalInfo, queryBackUpperOrgTree } from './service';
import store from '@/store';
export default {
    data() {
        return {
            userInfo: {}, //用户信息
            organize: {}, //班组信息
            empidOrg: '',
            aclList: [],
            iconUrl: [
                { icon: require('../../assets/image/richang.png'), url: '/daily' },
                { icon: require('../../assets/image/shenji.png'), url: '/examine' },
                { icon: require('../../assets/image/shuju.png'), url: '/daily' }
            ]
        };
    },
    async mounted() {
        let a = localStorage.getItem('userInfo');
        let b = localStorage.getItem('token');
        if (a && b) {
            this.userInfo = JSON.parse(a);
            this.organize = await queryRentalInfo(this.userInfo.rental[0]); //查询组织详情获取班组信息 班主id
            localStorage.setItem('organize', JSON.stringify(this.organize)); //班组信息
            this.empidOrg = await queryBackUpperOrgTree(this.organize.id); //班组上级部门
        } else {
            this.$router.push('/login');
        }
    },
    async created() {
        this.getMenu();
    },
    methods: {
        goto(item, index) {
            if (!item.hasAcl) {
                this.$refs.popup.show = true;
            } else {
                this.$router.push({ path: item.url, query: { num: index } });
            }
        },
        gotoMy() {
            this.$router.push('/my');
        },
        getMenu() {
            const data = store.state.menu.menu;
            this.aclList = JSON.parse(JSON.stringify(data));
            this.aclList.splice(1, 1, ...this.aclList.splice(2, 1, this.aclList[1]));
            this.iconUrl.map((item, index) => {
                this.aclList[index].url = item.url;
                this.aclList[index].icon = item.icon;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.homeBox {
    height: 100vh;
}
.homeTop {
    width: 100%;
    height: 252px;
    background: url('../../assets/image/homeBack.png');
    background-size: cover;
}
.homeUser {
    margin-top: -60px;
    width: 351px;
    height: 120px;
    background: #ffffff;
    box-shadow: 0px 4px 22px -7px rgba(30, 95, 255, 0.4);
    border-radius: 20px;
}
.homeUserImg {
    padding: 24px 16px 24px 12px;
}
.userName {
    padding-top: 32px;
}
.homeID {
    padding-left: 12px;
    width: 110px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.section {
    padding: 4px 12px;
    background: #f1f5ff;
    border-radius: 120px;
    margin-top: 9px;
    width: 212px;
    height: 28px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: PingFang SC;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0px;
    color: #00000099;
}
.modular {
    height: 320px;
    width: 335px;
    margin: 40px 20px 149px 20px;
    position: relative;
}
.modularLeft {
    width: 160px;
    height: 320px;
    background: linear-gradient(169.8deg, #64c2ff 1.43%, #005dff 98.14%);
    box-shadow: 0px 12px 25px -7px rgba(17, 86, 255, 0.4);
    border-radius: 20px;
    margin-right: 15px;
    position: absolute;
    left: 0;
    top: 0;
}
.Examine {
    background: linear-gradient(144.71deg, #ffd100 5.05%, #f7b303 89.64%);
    box-shadow: 0px 12px 22px -7px rgba(253, 199, 2, 0.4);
    border-radius: 20px;
    width: 160px;
    height: 160px;
    position: absolute;
    right: 0;
    top: 0;
}
.Data {
    width: 160px;
    height: 145px;
    background: linear-gradient(136.13deg, #a48bff 7.84%, #7826ff 91.96%);
    box-shadow: 0px 8px 22px -7px #9d7aff;
    border-radius: 20px;
    margin-top: 15px;
    position: absolute;
    right: 0;
    bottom: 0;
}
.richang {
    width: 60px;
    height: 60px;
    margin-bottom: 6px;
}
.richangIcon {
    width: 74px;
    height: 74px;
}
.shenp {
    width: 60px;
    height: 60px;
}
.shuju {
    width: 50px;
    height: 48px;
}
.leaveFor {
    margin-right: 15px;
}
.welcome {
    font-size: 24px;
    padding-left: 30px;
    padding-top: 70px;
}
</style>
