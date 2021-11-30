<template>
    <div>
        <div class="custom-nav">
            <m-nav-bar fixed placeholder :border="false" title="历史记录" @click-left="onClickLeft">
                <template #left>
                    <isc-svg-icon name="iscon-arrow-left-low" />
                </template>
            </m-nav-bar>
        </div>
        <div v-if="showLoading" class="showLoad disFlex-ja">
            <m-loading size="24px" vertical>数据加载中...</m-loading>
        </div>
        <div v-else>
            <div v-if="record.length">
                <div
                    v-for="(item, index) in record"
                    :key="index"
                    class="historyList disFlex-sba"
                    @click="goto(item.record)"
                >
                    <div class="disFlex-a">
                        <img src="../../../assets/image/xunjian.svg" alt="" />
                        <span class="fontSize14 orgTreeName">{{ item.record.orgTreeName }}</span>
                    </div>
                    <div>{{ item.hisDate }}</div>
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
            record: [],
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
            this.record = await queryHisRecord(this.orgId);
            this.showLoading = false;
        },
        refresh() {
            this.showLoading = true;
            this.getData();
        },
        onClickLeft() {
            this.$router.back();
        },
        goto(item) {
            this.$router.push({ path: '/meetingInfo', query: { id: item.id } });
        }
    }
};
</script>

<style lang="scss" scoped>
.historyList {
    width: 351px;
    height: 48px;
    margin: 12px;
    background: #ffffff;
    border-radius: 10px;
    padding: 0 12px 0 16px;
    img {
        margin-right: 8px;
    }
}
.showLoad {
    margin: 208px 107px 0 108px;
}
.orgTreeName {
    width: 180px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
