<template>
    <div class="history-content">
        <div class="custom-nav">
            <m-nav-bar fixed title="历史记录" left-text="Back" left-arrow @click-left="goback">
                <template #left>
                    <isc-svg-icon name="iscon-arrow-left-low" size="20px"></isc-svg-icon>
                </template>
            </m-nav-bar>
        </div>
        <div v-if="showLoading" class="page-height disFlex-ja">
            <m-loading size="24px" vertical>数据加载中...</m-loading>
        </div>
        <div v-else>
            <div v-if="historyList.length" class="history-list page-height">
                <div v-for="(i, index) in historyList" :key="index" class="card-box" @click="gotoHistory(i)">
                    <div class="box-title">
                        <div>
                            <img src="@/assets/kyt/activity.svg" alt="" />
                        </div>
                        <div>{{ i.record.activityName }}</div>
                    </div>
                    <div class="box-time">{{ i.hisDate }}</div>
                </div>
            </div>
            <load v-if="!historyList.length" @refresh="refresh"></load>
        </div>
    </div>
</template>

<script>
import { queryHisRecord } from '../service';

export default {
    name: 'History',
    data() {
        return {
            showLoading: true, //加载中
            orgId: '', //班组id
            historyList: [] //历史记录列表
        };
    },
    async created() {
        this.orgId = this.$route.query.orgId || '';
        this.getList();
    },
    methods: {
        //获取列表
        async getList() {
            this.historyList = await queryHisRecord({ orgId: this.orgId });
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
        gotoHistory(item) {
            this.$router.push({ path: '/kyt/info', query: { id: item.record.id } });
        }
    }
};
</script>

<style lang="scss" scoped>
.history-content {
    .history-list {
        padding: 12px 12px 0;
        .card-box {
            height: 48px;
            padding: 0 9px 0 15px;
            background: #fff;
            margin-bottom: 12px;
            border-radius: 10px;
            font-family: PingFang SC;
            font-style: normal;
            font-weight: 500;
            font-size: 18px;
            color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: space-between;
            align-items: center;
            .box-title {
                display: flex;
                align-items: center;
                div:first-child {
                    width: 16px;
                    height: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 12px;
                }
                div:last-child {
                    width: 198px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .box-time {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.7);
            }
        }
    }
}
</style>
