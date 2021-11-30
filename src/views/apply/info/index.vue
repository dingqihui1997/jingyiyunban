<template>
    <div>
        <div class="custom-nav">
            <m-nav-bar fixed placeholder :border="false" title="详情" @click-left="onClickLeft">
                <template #left>
                    <isc-svg-icon name="iscon-arrow-left-low" size="20px" />
                </template>
            </m-nav-bar>
        </div>
        <div class="checkList">
            <div class="disFlex-a infoTitle">
                <div class="patrolPlace"></div>
                <div>申请状态</div>
            </div>
            <div class="disFlex-sba patrol-infor borderBut">
                <div>申请单号</div>
                <div class="disFlex-ja state">{{ details.applyCode }}</div>
            </div>
            <div class="disFlex-sba patrol-infor">
                <div>状态</div>
                <div class="disFlex-ja state">{{ details.applyStatusName }}</div>
            </div>
        </div>
        <!-- 申请内容 -->
        <div class="contentBox">
            <div class="disFlex-a infoTitle">
                <div class="patrolPlace"></div>
                <div>申请内容</div>
            </div>
            <div class="disFlex-sba patrol-infor borderBut">
                <div>员工</div>
                <div class="disFlex-ja state">{{ details.personName }}</div>
            </div>
            <div class="disFlex-sba patrol-infor borderBut">
                <div>工号</div>
                <div class="disFlex-ja state">{{ details.personCode }}</div>
            </div>
            <div class="disFlex-sba patrol-infor borderBut">
                <div>原岗位</div>
                <div class="disFlex-ja state">{{ details.postCodeName }}</div>
            </div>
            <div class="disFlex-sba patrol-infor borderBut">
                <div>新岗位</div>
                <div class="disFlex-ja state">{{ details.newPostCodeName }}</div>
            </div>
            <div class="disFlex-sba patrol-infor">
                <div class="color0006">调岗时间</div>
            </div>
            <div class="disFlex-sba patrol-infor">
                <div>开始时间</div>
                <div class="disFlex-ja state">{{ details.changeTimeStr }}</div>
            </div>
            <div class="disFlex-sba patrol-infor borderBut">
                <div>结束时间</div>
                <div class="disFlex-ja state">{{ details.changeEndtime }}</div>
            </div>
            <div class="disFlex-sba patrol-infor">
                <div>原因备注</div>
            </div>
            <div class="remarks">
                {{ details.reasonDesc }}
            </div>
        </div>
    </div>
</template>

<script>
import { queryChangePostApply } from '../service';
export default {
    data() {
        return {
            details: {}
        };
    },
    async mounted() {
        this.details = await queryChangePostApply(this.$route.query.applyCode);
    },
    methods: {
        onClickLeft() {
            this.$router.back();
        }
    }
};
</script>

<style lang="scss" scoped>
.checkList {
    width: 351px;
    height: 156px;
    background: #ffffff;
    border-radius: 10px;
    margin: 12px;
}
.patrol-infor {
    div:first-child {
        color: #000000b2;
    }
    div:last-child {
        color: #000000b2;
    }
}
.infoTitle {
    height: 48px;
    padding-left: 12px;
}
.borderBut {
    border-bottom: 1px solid #eee;
}
.contentBox {
    width: 351px;
    min-height: 515px;
    margin: 12px;
    background: #ffffff;
    border-radius: 10px;
}
.remarks {
    width: 351px;
    min-height: 77px;
    // margin: 0 12px;
    padding: 10px 12px;
}
</style>
