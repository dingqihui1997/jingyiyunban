<template>
    <div class="the-fives-standard" style="height: 400px">
        <div class="standard-title">
            <div>5s检查标准</div>
            <isc-svg-icon name="iscon-bold-close" @click="closeModel"></isc-svg-icon>
        </div>
        <div class="standard-img">
            <m-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <m-swipe-item v-for="(ele, i) in images" :key="i" @click="openBigImg">
                    <img :src="ele.filePath" alt="" />
                </m-swipe-item>
            </m-swipe>
        </div>
        <!-- <m-image-preview v-model="show" :images="images" @change="onChange">
            <template v-slot:index>第{{ index }}页</template>
        </m-image-preview> -->
    </div>
</template>

<script>
export default {
    name: 'TheFivesStandard',
    props: {
        images: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            show: false,
            index: 0
        };
    },
    methods: {
        onChange(index) {
            this.index = index;
        },
        //查看大图
        openBigImg() {
            return;
        },
        sureSubmit() {
            this.closeModel();
        },
        closeModel() {
            this.$emit('closeModel');
        }
    }
};
</script>
<style lang="scss">
.the-fives-standard {
    width: 300px;
    height: 460px !important;
    .standard-title {
        padding: 0 12px;
        height: 48px;
        font-family: PingFang SC;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: inset 0px -0.5px 0px rgba(0, 0, 0, 0.15);
    }
    .standard-img {
        padding: 12px 12px 0;
        .my-swipe .m-swipe-item {
            color: #fff;
            font-size: 20px;
            height: 370px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
