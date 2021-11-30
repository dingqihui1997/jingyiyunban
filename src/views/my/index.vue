<template>
    <div>
        <div class="dailyMan colorFFF">
            <m-nav-bar fixed placeholder :border="false" title="个人中心" @click-left="goback">
                <template #left>
                    <isc-svg-icon name="iscon-arrow-left-low" color="#ffffff" />
                </template>
            </m-nav-bar>
        </div>
        <div class="myInfo">
            <div class="disFlex-a infoTitle">
                <div class="patrolPlace"></div>
                <div class="info">基本信息</div>
            </div>
            <div class="disFlex-sba patrol-infor bottom">
                <div>姓名</div>
                <div>{{ userInfo.loginName }}</div>
            </div>
            <div class="disFlex-sba patrol-infor bottom">
                <div>ID</div>
                <div>{{ userInfo.userId }}</div>
            </div>
            <div class="disFlex-sba patrol-infor bottom">
                <div>头像</div>
                <div class="userImg"><img src="../../assets/image/touxiang.png" class="userImg" /></div>
            </div>
            <div class="disFlex-sba patrol-infor bottom">
                <div>所属部门</div>
                <div>{{ section }}</div>
            </div>
            <div class="modify disFlex-ja" @click="onClick">修改密码</div>
        </div>
        <div class="signOut disFlex-ja" @click="logout">退出登录</div>
        <tips-popup ref="popup" url="/login" text="" title="确定要退出登录?" :is-back="true" @send="send"></tips-popup>
    </div>
</template>

<script>
import { logout, queryBackUpperOrgTree } from './service';
export default {
    name: '',
    components: {},
    data() {
        return {
            userInfo: {},
            organize: {}, //班组信息
            section: ''
        };
    },
    async mounted() {
        this.userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
        this.organize = localStorage.getItem('organize') ? JSON.parse(localStorage.getItem('organize')) : {};
        this.section = await queryBackUpperOrgTree(this.organize.id);
    },
    methods: {
        onClick() {
            this.$router.push('/modifyInfo');
        },
        goback() {
            this.$router.back();
        },
        logout() {
            this.$refs.popup.show = true;
        },
        async send() {
            await logout();
            localStorage.clear();
        }
    }
};
</script>

<style lang="scss" scoped>
.myInfo {
    width: 351px;
    height: 308px;
    background: #ffffff;
    border-radius: 10px;
    margin: 12px 12px 38px 12px;
}
.infoTitle {
    height: 48px;
    padding-left: 12px;
}
.info {
    font-family: PingFang SC;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    text-align: left;
    color: #000000cc;
}
.userImg {
    width: 32px;
    height: 32px;
}
.bottom {
    border-bottom: 1px solid #eee;
}
.modify {
    margin: 24px;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    color: #479aff;
}
.signOut {
    padding: 10px;
    width: 335px;
    height: 48px;
    background: #479aff;
    border-radius: 10px;
    margin: 0 20px;
    color: #ffffff;
}
.patrol-infor {
    div:first-child {
        font-family: PingFang SC;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0px;
        text-align: left;
        color: #000000b2;
    }
}
</style>
