<template>
    <div>
        <div class="custom-nav">
            <m-nav-bar fixed placeholder :border="false" title="历史记录" @click-left="onClickLeft">
                <template #left>
                    <isc-svg-icon name="iscon-arrow-left-low" />
                </template>
            </m-nav-bar>
        </div>
        <div v-if="showLoading" class="showLoading disFlex-ja">
            <m-loading size="24px" vertical>数据加载中...</m-loading>
        </div>
        <div v-else>
            <div v-if="HisRecord.length">
                <div v-for="(item, index) in HisRecord" :key="index" class="listItem" @click="goto(item.record)">
                    <div class="disFlex-sba listItemTop">
                        <div class="disFlex-a">
                            <div class="disFlex-ja">
                                <img src="../../../assets/image/xunjian.svg" class="xunjian" />
                            </div>
                            <div class="orgTreeName">{{ item.record.orgTreeName }}</div>
                        </div>
                        <div>{{ item.hisDate }}</div>
                    </div>
                    <div class="disFlex-sbe title">
                        <div>早上巡检</div>
                        <div>
                            <img
                                v-if="item.record.conditionType === '正常'"
                                src="../../../assets/image/zhengchang.svg"
                            />
                            <img v-else src="../../../assets/image/yichang.svg" />
                        </div>
                    </div>
                </div>
            </div>
            <load v-else @refresh="refresh"></load>
        </div>
    </div>
</template>

<script>
import { queryHisRecord } from '../service';
export default {
    name: '',
    data() {
        return {
            HisRecord: [],
            showLoading: true,
            orgId: ''
        };
    },
    mounted() {
        this.orgId = this.$route.query.orgId || '';
        this.getData();
    },
    methods: {
        async getData() {
            this.HisRecord = await queryHisRecord(this.orgId);
            this.showLoading = false;
        },
        onClickLeft() {
            this.$router.back();
        },
        goto(item) {
            this.$router.push({ path: '/morningPatrolInfo', query: { id: item.id } });
        },
        refresh() {
            this.showLoading = true;
            this.getData();
        }
    }
};
</script>

<style lang="scss" scoped>
.listItem {
    width: 351px;
    height: 100px;
    margin: 12px 13px 12px 11px;
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
.showLoading {
    margin: 208px 107px 0 108px;
}
.orgTreeName {
    width: 175px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>
