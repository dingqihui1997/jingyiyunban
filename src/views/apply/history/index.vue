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
            <div v-if="historyList.length">
                <div
                    v-for="(item, index) in historyList"
                    :key="index"
                    class="historyBox"
                    @click="onClick(item.applyCode)"
                >
                    <div class="disFlex-sba historyState">
                        <div class="apply">
                            调岗申请<span class="fontSize16">【{{ item.applyCode }}】</span>
                        </div>
                    </div>
                    <div v-if="item.applyStatus === 1" class="await boxLabel">待审核</div>
                    <div v-if="item.applyStatus === 2" class="fulfil boxLabel">已通过</div>
                    <div v-if="item.applyStatus === 3" class="refuse boxLabel">拒绝</div>
                    <div class="fontSize14">
                        <div class="disFlex-a OriPostBox">
                            <div class="OriPost color0006">员工</div>
                            <div>{{ item.personName }}{{ item.personCode }}</div>
                        </div>
                        <div class="disFlex-a OriPostBox">
                            <div class="OriPost color0006">原岗位</div>
                            <div>{{ item.postCodeName }}</div>
                        </div>
                        <div class="disFlex-a OriPostBox">
                            <div class="OriPost color0006">新岗位</div>
                            <div>{{ item.newPostCodeName }}</div>
                        </div>
                        <div class="disFlex-a OriPostBox">
                            <div class="OriPost color0006">时间</div>
                            <div>{{ item.createTime }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <load v-else @refresh="refresh"></load>
        </div>
    </div>
</template>

<script>
import { queryhisRecord } from '../service';
export default {
    name: '',
    data() {
        return {
            historyList: [],
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
            this.historyList = await queryhisRecord(this.orgId); //获取历史记录列表
            this.showLoading = false;
        },
        onClickLeft() {
            this.$router.back();
        },
        onClick(id) {
            this.$router.push({ path: '/applyInfo', query: { applyCode: id } });
        },
        refresh() {
            this.showLoading = true;
            this.getData();
        }
    }
};
</script>

<style lang="scss" scoped>
.historyBox {
    width: 351px;
    height: 176px;
    background: #ffffff;
    border-radius: 10px;
    margin: 12px;
    padding-left: 12px;
    position: relative;
}
.boxLabel {
    position: absolute;
    width: 80px;
    height: 44px;
    right: 0px;
    top: 0px;
    border-radius: 0px 10px;
    font-size: 16px;
    text-align: center;
    line-height: 44px;
    color: #ffffff;
}
.historyState {
    height: 44px;
}
.apply {
    font-family: PingFang SC;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0px;
    text-align: left;
}

.await {
    background: #fcb306;
}
.fulfil {
    background: #5ed582;
}
.refuse {
    background: #ff6969;
}
.OriPostBox {
    margin-bottom: 8px;
}
.OriPost {
    width: 50px;
    margin-right: 16px;
}
.showLoad {
    margin: 208px 107px 0 108px;
}
</style>
