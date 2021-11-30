<template>
    <div class="info-content">
        <div class="custom-nav">
            <m-nav-bar title="详情" left-text="Back" left-arrow @click-left="goback">
                <template #left>
                    <isc-svg-icon name="iscon-arrow-left-low" size="20px"></isc-svg-icon>
                </template>
            </m-nav-bar>
        </div>

        <div class="info-cards">
            <div class="info-status">
                <div class="box-line cards-title"><span></span><span>点检状态</span></div>
                <div class="box-line">
                    <span>状态</span> <span>{{ safetyInfo.record.resultType }}</span>
                </div>
                <!-- <div class="box-line"><span>通过时间</span> <span>2021/08/31 16:32:23</span></div> -->
            </div>
            <div class="info-text">
                <div class="box-line cards-title">
                    <span></span><span>点检内容</span><span @click="checkDetailed">查看清单</span>
                </div>
                <div class="box-line under-line">
                    <span>员工</span> <span>{{ safetyInfo.record.personName }}</span>
                </div>
                <div class="box-line under-line">
                    <span>工号</span> <span>{{ safetyInfo.record.personCode }}</span>
                </div>
                <div class="box-line under-line">
                    <span>岗位</span> <span>{{ safetyInfo.record.postCodeName }}</span>
                </div>
                <div class="box-line under-line">
                    <span>点检时间</span> <span>{{ safetyInfo.record.createTime }}</span>
                </div>
                <div class="text-problem">
                    <div>问题备注</div>
                    <m-field
                        v-model="safetyInfo.record.reasonDesc"
                        rows="3"
                        autosize
                        type="textarea"
                        maxlength="100"
                        placeholder="请输入"
                        show-word-limit
                        style="padding: 0"
                    />
                </div>
                <pics-videos
                    v-if="safetyInfo.pictures.length"
                    :imgs="safetyInfo.pictures"
                    up-type="img"
                    is-top="1"
                    is-btm="2"
                ></pics-videos>
            </div>
        </div>
        <detailed-list-popup ref="popup" :detailed-obj="detailedObj"></detailed-list-popup>
    </div>
</template>

<script>
import picsVideos from '@/components/pics-videos/index.vue';
import detailedListPopup from '@/components/detailedList-popup/index.vue';
import { querySafetyCheck, queryLeanChecklist } from '../service';
export default {
    name: 'Info',
    components: { picsVideos, detailedListPopup },
    data() {
        return {
            safetyInfo: {
                pictures: [],
                record: {}
            }, //安全点检详情
            detailedObj: {} //清单数据
        };
    },
    async created() {
        const res = await querySafetyCheck(this.$route.query.id);
        this.safetyInfo = res;
    },
    methods: {
        //查看清单
        async checkDetailed() {
            this.detailedObj = await queryLeanChecklist(this.safetyInfo.record.checkCode);
            this.$refs.popup.show = true;
        },
        //返回上一级
        goback() {
            this.$router.go(-1);
        },
        afterRead(file) {
            console.log(file);
        }
    }
};
</script>

<style lang="scss" scoped>
.info-content {
    .info-cards {
        padding: 12px;
        .info-status,
        .info-text {
            background: #ffffff;
            border-radius: 10px;
            padding: 0 0 12px;
            margin-bottom: 12px;
            .box-line {
                height: 48px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-family: PingFang SC;
                font-style: normal;
                font-weight: normal;
                font-size: 16px;
                padding: 0 12px;
                span:first-child {
                    color: rgba(0, 0, 0, 0.7);
                }
                span:last-child {
                    color: rgba(0, 0, 0, 0.8);
                }
            }
            .cards-title {
                position: relative;
                span:first-child {
                    position: absolute;
                    left: 3.42%;
                    right: 95.44%;
                    top: 33.33%;
                    bottom: 33.33%;
                    background: #479aff;
                    border-radius: 22px;
                }
                span:nth-child(2) {
                    position: absolute;
                    left: 7.98%;
                    right: 71.51%;
                    top: 22.92%;
                    bottom: 25%;
                    font-family: PingFang SC;
                    font-weight: 500;
                    font-size: 18px;
                    line-height: 25px;
                    color: #000000;
                }
                span:nth-child(3) {
                    position: absolute;
                    top: 14px;
                    right: 12px;
                    font-family: PingFang SC;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 14px;
                    text-align: right;
                    color: #479aff;
                }
            }
            .text-problem {
                flex-direction: column;
                padding: 0 12px 10px;
                color: rgba(0, 0, 0, 0.7);
                div:first-child {
                    height: 48px;
                    line-height: 48px;
                }
            }
        }
    }
    .under-line {
        box-shadow: inset 0px -0.5px 0px rgba(0, 0, 0, 0.15);
    }
}
</style>
