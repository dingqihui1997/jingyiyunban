<template>
    <div class="dailyBox">
        <div class="custom-nav">
            <m-nav-bar
                fixed
                placeholder
                :border="false"
                title="早上巡检"
                @click-left="onClickLeft"
                @click-right="onClickRight"
            >
                <template #left>
                    <isc-svg-icon name="iscon-arrow-left-low" />
                </template>
                <template #right>
                    <div>历史记录</div>
                </template>
            </m-nav-bar>
        </div>
        <div class="contentBox">
            <div class="checkList">
                <div class="disFlex-a infoTitle">
                    <div class="patrolPlace"></div>
                    <div>检查清单</div>
                </div>
                <div class="detailed" v-html="detailed"></div>
            </div>
            <the-patrol-infor ref="infor" :flag="flag"></the-patrol-infor>
        </div>
        <tips-popup
            ref="popup"
            :title="tipsTitle"
            :text="tipsText"
            url="/safety/history"
            :is-back="isBack"
            @send="send"
        ></tips-popup>
    </div>
</template>

<script>
import ThePatrolInfor from './components/the-patrol-infor.vue';
import { queryGetListByWtIdOrCheckType, queryLeanChecklist } from './service';
export default {
    name: 'KeepAlive',
    components: { ThePatrolInfor },
    data() {
        return {
            checkCode: '',
            isBack: false,
            tipsTitle: '',
            tipsText: '',
            detailed: '',
            flag: false
        };
    },
    async mounted() {
        let wtId = localStorage.getItem('organize') ? JSON.parse(localStorage.getItem('organize')).id : ''; //班主id
        this.checkCode = await queryGetListByWtIdOrCheckType({
            //获取检查清单通过班组id或者清单类型
            wtId: wtId,
            checkType: '早上巡检清单',
            postCode: ''
        });
        if (this.checkCode) {
            const res = await queryLeanChecklist(this.checkCode); //获取清单详情
            this.detailed = res.checkRemark;
        }
    },
    deactivated() {
        this.flag = false;
    },
    methods: {
        onClickRight() {
            this.$router.push('/morningPatrolHistory');
        },
        onClickLeft() {
            if (this.isKeep()) {
                this.isBack = true;
                this.tipsTitle = '提示';
                this.tipsText = '有未保存的内容,请注意数据丢失';
                this.$refs.popup.show = true;
            } else {
                this.$router.go(-1);
            }
        }, //确认返回
        isKeep() {
            let staff = localStorage.getItem('staff');
            let params = this.$refs.infor.params;
            if (
                staff ||
                params.problemDesc ||
                params.conditionType ||
                this.$refs.infor.isUpImg ||
                this.$refs.infor.isUpVideo
            ) {
                return true;
            }
        },
        send() {
            this.flag = true;
        }
    }
};
</script>

<style lang="scss" scoped>
.dailyBox {
    height: 100%;
    background: #f6f8fb;
}
.checkList {
    width: 351px;
    max-height: 424px;
    background: #ffffff;
    border-radius: 10px;
    margin: 12px;
    padding: 0 12px 12px 12px;
}
.detailed {
    max-height: calc(424px - 50px);
    overflow: overlay;
}
.infoTitle {
    height: 48px;
}

.materialName {
    height: 40px;
    padding-top: 12px;
    color: #333333;
    font-weight: 700px;
}
.materialItem {
    padding: 4px 12px;
    background: #f1f5ff;
    border-radius: 120px;
    margin-bottom: 10px;
    margin-right: 20px;
    color: #00000099;
}

.contentBox {
    height: calc(100vh - 100px);
    overflow-y: overlay;
}
</style>
