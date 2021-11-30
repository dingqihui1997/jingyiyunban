<template>
    <div class="loading">
        <div class="loadImg">
            <img src="../../assets/image/error1.png" alt="" />
        </div>
        <div class="data">数据丢失，请刷新</div>
        <div class="disFlex-ja">
            <div class="refresh disFlex-ja" @click="refresh">刷新</div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        refresh() {
            this.$emit('refresh', '');
        }
    }
};
</script>

<style lang="scss" scoped>
.refresh {
    padding: 0px 12px;
    width: 120px;
    height: 36px;
    background: #479aff;
    border-radius: 4px;
    color: #fff;
}
.loadImg {
    width: 160px;
    height: 160px;
    margin: 208px 107px 0 108px;
}
.data {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    color: rgba(0, 0, 0, 0.2);
    margin-top: 12px;
    margin-bottom: 24px;
}
</style>
