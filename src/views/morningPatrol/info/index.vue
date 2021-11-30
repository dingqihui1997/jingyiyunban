<template>
    <div>
        <div class="custom-nav">
            <m-nav-bar fixed placeholder :border="false" title="详情" @click-left="onClickLeft">
                <template #left>
                    <isc-svg-icon name="iscon-arrow-left-low" />
                </template>
            </m-nav-bar>
        </div>
        <div class="pageHeight">
            <div class="top disFlex-sba">
                <div class="disFlex-a">
                    <div class="patrolPlace"></div>
                    <div class="fontSize18">检查清单</div>
                </div>
                <div class="list fontSize14" @click="see">查看</div>
            </div>
            <div class="patrolInfor">
                <div class="disFlex-a patrolBox">
                    <div class="patrolPlace"></div>
                    <div>检查信息</div>
                </div>
                <div>
                    <div class="disFlex-sba patrol-infor">
                        <div style="width: 76px">检查人</div>
                        <div>{{ details.record && details.record.personName }}</div>
                    </div>
                    <div class="disFlex-sba patrol-infor">
                        <div>班组</div>
                        <div class="disFlex-a">{{ details.record && details.record.orgTreeName }}</div>
                    </div>
                    <div class="disFlex-sba patrol-infor">
                        <div>现场状况</div>
                        <div class="disFlex-a">{{ details.record && details.record.conditionType }}</div>
                    </div>
                    <div class="disFlex-sba patrol-infor">
                        <div>日期</div>
                        <div class="disFlex-a">{{ details.record && details.record.productTime }}</div>
                    </div>
                    <div v-if="details.record && details.record.conditionType == '异常'" class="problem">
                        <div class="problemRecord disFlex-sba">问题记录</div>
                        <div style="min-height: 88px">
                            {{ details.record && details.record.problemDesc }}
                        </div>
                    </div>
                    <div v-if="details.record && details.record.conditionType == '异常'" class="dutyBox disFlex-sba">
                        <div>责任人</div>
                        <div class="disFlex-a patrolName">{{ details.record.respEmpName }}</div>
                    </div>
                </div>
                <pics-videos
                    :up-type="upType"
                    img-title="图片上传"
                    video-title="视频上传"
                    :videos="details.videos"
                    :imgs="details.pictures"
                    is-btm="2"
                ></pics-videos>
            </div>
        </div>
        <detailed-list-popup ref="popup" :detailed-obj="detailedObj"></detailed-list-popup>
    </div>
</template>

<script>
import { queryLeanInspectionRecord, queryLeanChecklist } from '../service';
import picsVideos from '@/components/pics-videos/index.vue';
import detailedListPopup from '../../../components/detailedList-popup/index.vue';
export default {
    name: '',
    components: { detailedListPopup, picsVideos },
    data() {
        return {
            show: false,
            details: {},
            detailedObj: {}, //清单数据
            flag: false,
            upType: 'all'
        };
    },
    async mounted() {
        this.details = await queryLeanInspectionRecord(this.$route.query.id); //获取历史记录详情
        this.details.record.orgTreeName = this.details.record.orgTreeName.split(',').join('');
        if (this.details.record.conditionType == '异常') {
            this.details.record.respEmpName = this.details.record.respEmpName.split(',').join(' | ');
            this.upType = 'all';
        } else {
            this.upType = 'video';
        }
    },
    methods: {
        onClickLeft() {
            this.$router.back();
        },
        //获取清单详情
        async see() {
            this.detailedObj = await queryLeanChecklist(this.details.record.checkCode);
            this.$refs.popup.show = true; //查看清单详情
        }
    }
};
</script>

<style lang="scss" scoped>
.top {
    width: 351px;
    height: 48px;
    margin: 12px;
    padding-left: 12px;
    background: #fff;
}
.list {
    padding-right: 14px;
    color: #479aff;
}
.patrolInfor {
    width: 351px;
    margin: 12px;
    background: #ffffff;
    border-radius: 10px;
    padding-bottom: 10px;
}
.patrol-infor {
    min-height: 48px;
    border-bottom: 1px solid #eee;
    padding: 0 12px;
    color: #000000cc;
    div:first-child {
        color: #000000b2;
    }
}
.patrolBox {
    padding-left: 12px;
    height: 48px;
}
.problem {
    padding-left: 12px;
    border-bottom: 1px solid #eee;
}
.problemRecord {
    height: 48px;
    color: #000000b2;
}
.dutyBox {
    position: relative;
    min-height: 48px;
    padding-left: 12px;
    div:first-child {
        color: #000000b2;
    }
}

.patrolName {
    width: 220px;
    min-height: 48px;
    margin: 0 12px;
    display: flex;
    justify-content: flex-end;
}
.pageHeight {
    height: calc(100vh - 46px);
    overflow-y: overlay;
}
</style>
