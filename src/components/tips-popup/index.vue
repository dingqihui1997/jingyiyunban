<template>
    <div>
        <m-popup v-model="show" round style="width: 240px; height: 136px; overflow: hidden">
            <div class="message flex-dji" :class="text ? 'isPadding' : 'padding'">
                <div class="disFlex-ja">{{ title }}</div>
                <div v-if="text" class="disFlex-ja text">{{ text }}</div>
            </div>
            <div class="confirmBnts">
                <div v-if="isBack" class="confirmBnt disFlex-ja" style="color: #00000066" @click="concel">取消</div>
                <div
                    class="confirmBnt disFlex-ja"
                    :style="{ 'border-left': isBack ? '1px solid #f1f1f1' : '0' }"
                    @click="confirm"
                >
                    确定
                </div>
            </div>
        </m-popup>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        title: {
            type: String,
            require: true
        },
        text: {
            type: String,
            default: '有未填写或未上传的内容'
        },
        url: {
            type: String,
            default: ''
        },
        isBack: {
            type: Boolean,
            default: false
        } //是否显示按钮
    },
    data() {
        return { show: false };
    },
    methods: {
        concel() {
            this.show = false;
        },
        confirm() {
            if (this.isBack) {
                this.show = false;
                localStorage.removeItem('staff');
                localStorage.removeItem('staffList');
                this.url == '/login' ? this.$router.push(this.url) : this.$router.go(-1);
                this.$emit('send', '');
            } else {
                this.show = false;
                if (this.url && this.title == '提交成功') this.$router.push(this.url);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.message {
    height: 88px;
    width: 100%;
    font-family: PingFang SC;
    font-style: normal;
}
.isPadding {
    padding: 23px 12px 17px 12px;
}
.padding {
    padding: 37px 12px 31px 12px;
}
.title {
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    color: #000000cc;
}
.text {
    font-size: 12px;
    font-weight: 400;
    color: #00000066;
    margin-top: 8px;
}
.confirmBnts {
    display: flex;
    width: 100%;
    justify-content: space-around;
    border-top: 1px solid #f1f1f1;
    div {
        width: 100%;
        flex: 1;
    }
}
.confirmBnt {
    height: 48px;
    color: #479aff;
}
</style>
