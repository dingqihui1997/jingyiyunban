<template>
    <div>
        <m-popup v-model="show" round :style="{ height: '460px', width: '300px' }">
            <div>
                <div class="popup disFlex-sba">
                    <div>{{ detailedObj.checkName }}</div>
                    <div style="height: 24px" @click="close">
                        <isc-svg-icon name="iscon-close" color="#a0a0a0" size="24px"></isc-svg-icon>
                    </div>
                </div>
                <div class="detailedContent">
                    <div class="fontSize16 materialName">{{ detailedObj.checkType }}</div>
                    <div v-html="detailedObj.checkRemark"></div>
                </div>
                <div class="subregion-btn">
                    <div @click="close">确定</div>
                </div>
            </div>
        </m-popup>
    </div>
</template>

<script>
export default {
    props: {
        detailedObj: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            show: false
        };
    },
    methods: {
        close() {
            this.show = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.popup {
    height: 48px;
    border-bottom: 1px solid #eee;
    padding: 0 18px 0 12px;
}
.materialName {
    height: 40px;
    padding-top: 12px;
    color: #000000;
    font-weight: 700px;
}
.subregion-btn {
    position: fixed;
    bottom: 0;
    background: #fff;
    height: 60px;
    width: 300px;
    box-shadow: 0px -8px 8px rgba(239, 243, 250, 0.25);
    padding: 10px 12px;
    box-sizing: border-box;
    div {
        height: 40px;
        background: #479aff;
        border-radius: 10px;
        font-family: PingFang SC;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        letter-spacing: 4px;
        color: #ffffff;
        text-align: center;
        line-height: 40px;
    }
}
.detailedContent {
    height: calc(460px - 108px);
    overflow-y: scroll;
    padding: 0 12px;
    box-sizing: border-box;
}
</style>
