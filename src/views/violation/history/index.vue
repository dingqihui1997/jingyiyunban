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
            <div v-if="historyList.length" class="history-card page-height">
                <div v-for="(i, index) in historyList" :key="index" class="card-box" @click="gotoInfo(i)">
                    <div class="box-time">{{ i.record.personName }}【{{ i.record.personCode }}】</div>
                    <div class="box-info">
                        <div>
                            <span>违规类型</span><span>{{ i.record.illegalType }}</span>
                        </div>
                        <div>
                            <span>违规备注</span><span>{{ i.record.illegalDesc }}</span>
                        </div>
                        <div>
                            <span>提交时间</span><span>{{ i.record.createTimeStr }}</span>
                        </div>
                    </div>
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
        gotoInfo(item) {
            this.$router.push({ path: '/violation/info', query: { id: item.record.id } });
        }
    }
};
</script>

<style lang="scss" scoped>
.history-content {
    .history-card {
        padding: 12px 12px 0;
        .card-box {
            height: 148px;
            background: #ffffff;
            border-radius: 10px;
            padding: 0 12px;
            margin-bottom: 12px;
            .box-time {
                height: 44px;
                font-family: PingFang SC;
                font-style: normal;
                font-weight: 500;
                font-size: 18px;
                line-height: 44px;
                color: rgba(0, 0, 0, 0.7);
            }
            .box-info {
                height: 104px;
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
                    width: 66px;
                }
                span:nth-child(2),
                span:nth-child(3) {
                    margin-right: 8px;
                    color: rgba(0, 0, 0, 0.8);
                }
            }
        }
    }
}
</style>
