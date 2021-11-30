<template>
    <div class="info-content">
        <div class="custom-nav">
            <m-nav-bar fixed title="详情" left-text="Back" left-arrow @click-left="goback">
                <template #left>
                    <isc-svg-icon name="iscon-arrow-left-low" size="20px"></isc-svg-icon>
                </template>
            </m-nav-bar>
        </div>

        <div class="info-cards page-height">
            <div class="info-status">
                <div class="box-line cards-title"><span></span><span>活动内容</span></div>
                <div class="box-line under-line">
                    <span>活动主题</span> <span>{{ kytInfo.record.activityName }}</span>
                </div>
                <div class="text-problem under-line">
                    <div>活动内容</div>
                    <m-field
                        v-model="kytInfo.record.activityContent"
                        rows="3"
                        autosize
                        type="textarea"
                        maxlength="100"
                        placeholder="请输入"
                        show-word-limit
                        style="padding: 0"
                    />
                </div>
                <div class="box-line">
                    <span>活动日期</span>
                    <span>{{ kytInfo.record.createTime ? kytInfo.record.createTime.split(' ')[0] : '' }}</span>
                </div>
            </div>
            <div class="info-text">
                <div class="box-line cards-title"><span></span><span>人员互动</span></div>
                <div class="box-line under-line">
                    <span>人员</span> <span>{{ kytInfo.record.personName }}</span>
                </div>
                <div class="box-line under-line">
                    <span>互动模式</span> <span>{{ kytInfo.record.interactiveType }}</span>
                </div>
                <div class="box-line under-line">
                    <span>互动评价</span> <span>{{ kytInfo.record.assessType }}</span>
                </div>
                <pics-videos
                    v-if="kytInfo.pictures.length"
                    :imgs="kytInfo.pictures"
                    up-type="img"
                    is-top="2"
                    is-btm="1"
                    img-title="互动拍照"
                ></pics-videos>
                <div class="text-problem">
                    <div>活动输出</div>
                    <m-field
                        v-model="kytInfo.record.activityInput"
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
                    v-if="kytInfo.videos.length"
                    :videos="kytInfo.videos"
                    up-type="video"
                    is-top="1"
                    is-btm="2"
                ></pics-videos>
            </div>
        </div>
    </div>
</template>

<script>
import picsVideos from '@/components/pics-videos/index.vue';
import { queryLeanKytActivity } from '../service';
export default {
    name: 'Info',
    components: { picsVideos },
    data() {
        return {
            kytInfo: {
                pictures: [],
                record: {},
                videos: []
            } //违规记录详情
        };
    },
    async created() {
        const res = await queryLeanKytActivity(this.$route.query.id);
        this.kytInfo = res;
    },
    methods: {
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
        padding: 12px 12px 0;
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
