<template>
    <div class="history-content custom-nav-bg">
        <div class="custom-nav">
            <m-nav-bar fixed :title="teamInfo.className" left-text="Back" left-arrow @click-left="goback">
                <template #left>
                    <isc-svg-icon name="iscon-arrow-left-low" size="20px"></isc-svg-icon>
                </template>
            </m-nav-bar>
        </div>

        <div class="team-tab">
            <m-tabs
                v-model="active"
                line-width="63px"
                line-height="4px"
                title-active-color="#000000cc"
                title-inactive-color="#00000099"
            >
                <m-tab title="需审批"></m-tab>
                <m-tab title="需知情"></m-tab>
            </m-tabs>
            <div v-if="showLoading" class="page-height disFlex-ja">
                <m-loading size="24px" vertical>数据加载中...</m-loading>
            </div>
            <div v-else>
                <div v-if="examineList.length" class="history-card">
                    <div v-for="(i, index) in examineList" :key="index">
                        <div v-if="i.title == '调岗记录'" class="card-box" @click="gotoInfo(i)">
                            <div class="box-time">
                                <span v-if="i.readFlag == 2" class="point"></span>
                                <span>调岗申请</span>
                                <span class="fontSize15">【{{ i.applyCode }}】</span>
                            </div>
                            <div class="box-info">
                                <div>
                                    <span>员工</span><span>{{ i.personName }}</span
                                    ><span>{{ i.personCode }}</span>
                                </div>
                                <div>
                                    <span>原岗位</span><span>{{ i.postCodeName }}</span>
                                </div>
                                <div>
                                    <span>新岗位</span><span>{{ i.newPostCodeName }}</span>
                                </div>
                                <div>
                                    <span>时间</span><span>{{ i.createTime }}</span>
                                </div>
                            </div>
                            <div
                                class="box-label"
                                :style="{ background: i.applyStatusName == '待处理' ? '#FCB306' : '#5ED582' }"
                            >
                                {{ i.applyStatusName }}
                            </div>
                        </div>
                        <div v-else class="card-box" @click="gotoInfo(i)">
                            <div class="box-time">
                                <span v-if="i.readFlag == 2" class="point"></span>
                                <span>{{ i.title }}</span>
                                <span v-if="i.title == '早上巡检'">【{{ i.inspectionCode }}】</span>
                                <span v-else-if="i.title == '安全点检'">【{{ i.safetyCheckcode }}】</span>
                                <span v-else>【{{ i.recordCode }}】</span>
                            </div>
                            <div class="box-info">
                                <div>
                                    <span>员工</span><span>{{ i.personName }} ({{ i.personCode }})</span>
                                </div>
                                <div>
                                    <span>班组</span><span>{{ i.orgName }}</span>
                                </div>
                                <div v-if="i.title == '早上巡检'">
                                    <span>违规备注</span><span>{{ i.problemDesc }}</span>
                                </div>
                                <div v-else-if="i.title == '安全点检'">
                                    <span>违规备注</span><span>{{ i.reasonDesc }}</span>
                                </div>
                                <div v-else>
                                    <span>违规备注</span><span>{{ i.illegalDesc }}</span>
                                </div>
                                <div>
                                    <span>时间</span><span>{{ i.createTimeStr }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <load v-if="!examineList.length" @refresh="refresh"></load>
            </div>
        </div>
    </div>
</template>

<script>
import {
    queryGetRecordByOrgId,
    queryGetLeanInspectionRecord,
    queryFindSafetyCheckMsg,
    queryGetleanIllegalRecord,
    queryChangeReadFlag
} from '../service';
export default {
    name: 'Team',
    data() {
        return {
            showLoading: true, //加载中
            active: 0, //选中班组状态
            teamInfo: {}, //班组信息
            examineList: [], //待审核列表
            applyStatus: 1, //状态 1未审核
            readFlag: 2 //需知情状态 2需知情
        };
    },
    watch: {
        active() {
            this.showLoading = true;
            this.getList();
        }
    },
    async created() {
        this.teamInfo = JSON.parse(this.$route.query.team);
        this.getList();
    },
    methods: {
        //获取列表
        async getList() {
            if (this.active == 0) {
                this.examineList = await queryGetRecordByOrgId({
                    empidOrgid: this.teamInfo.id,
                    applyStatus: this.applyStatus
                });
            } else {
                let newList1 = await queryGetleanIllegalRecord({
                    empidOrgid: this.teamInfo.id
                });
                let newList2 = await queryFindSafetyCheckMsg({
                    empidOrgid: this.teamInfo.id
                });
                let newList3 = await queryGetLeanInspectionRecord({
                    empidOrgid: this.teamInfo.id
                });
                this.examineList = [...newList1, ...newList2, ...newList3];
            }
            this.showLoading = false;
        },
        //刷新
        refresh() {
            this.showLoading = true;
            this.getList();
        },
        //返回上一级
        goback() {
            this.$router.go(-1);
        },
        //前去详情页
        async gotoInfo(item) {
            if (this.active == 1) {
                if (item.title == '早上巡检') {
                    await queryChangeReadFlag({ applyCode: item.inspectionCode });
                    this.$router.push({ path: '/morningPatrolInfo', query: { id: item.id } });
                } else if (item.title == '安全点检') {
                    await queryChangeReadFlag({ applyCode: item.safetyCheckcode });
                    this.$router.push({ path: '/safety/info', query: { id: item.id } });
                } else if (item.title == '违规记录') {
                    await queryChangeReadFlag({ applyCode: item.recordCode });
                    this.$router.push({ path: '/violation/info', query: { id: item.id } });
                }
            } else {
                await queryChangeReadFlag({ applyCode: item.applyCode });
                localStorage.setItem('examineInfo', JSON.stringify(item));
                this.$router.push({ path: '/examine/info', query: { team: JSON.stringify(this.teamInfo) } });
            }
        }
    }
};
</script>
<style lang="scss">
.team-tab {
    .m-tab__text--ellipsis {
        font-family: PingFang SC;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 22px;
    }
    .m-tabs__line {
        background-color: #479aff;
    }
}
</style>
<style lang="scss" scoped>
.history-content {
    .team-tab {
        margin-top: 46px;
    }
    .history-card {
        padding: 12px 12px 0;
        height: calc(100vh - 94px);
        overflow-y: overlay;
        .card-box {
            position: relative;
            height: 176px;
            background: #ffffff;
            border-radius: 10px;
            padding: 0 12px;
            margin-bottom: 12px;
            font-family: PingFang SC;
            font-style: normal;
            font-weight: 500;
            .box-time {
                height: 44px;
                font-size: 18px;
                line-height: 44px;
                color: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                .point {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #ff6969;
                    margin-right: 10px;
                }
            }
            .box-info {
                height: 132px;
                font-size: 14px;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                span {
                    color: rgba(0, 0, 0, 0.4);
                    margin-right: 16px;
                }
                span:first-child {
                    display: inline-block;
                    width: 60px;
                }
                span:nth-child(2),
                span:nth-child(3) {
                    margin-right: 8px;
                    color: rgba(0, 0, 0, 0.8);
                }
            }
            .box-label {
                position: absolute;
                width: 80px;
                height: 44px;
                right: 0;
                top: 0;
                border-radius: 0px 10px;
                font-size: 16px;
                text-align: center;
                line-height: 44px;
                color: #ffffff;
            }
        }
    }
    .listItem {
        width: 351px;
        height: 100px;
        margin: 0 0 12px 0;
        background: #fff;
        border-radius: 10px;
        padding: 12px;
    }
    .xunjian {
        margin-right: 8px;
    }
    .title {
        margin-top: 20px;
        color: rgba(0, 0, 0, 0.7);
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
    }
}
</style>
