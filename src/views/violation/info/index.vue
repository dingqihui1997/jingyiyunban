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
            <div class="info-text">
                <div class="box-line cards-title"><span></span><span>违规内容</span></div>
                <div class="box-line">
                    <span>员工</span> <span>{{ violationInfo.personName }}</span>
                </div>
                <div class="box-line">
                    <span>工号</span> <span>{{ violationInfo.personCode }}</span>
                </div>
                <div class="box-line">
                    <span>岗位</span> <span>{{ violationInfo.postCodeName }}</span>
                </div>
                <div class="box-line">
                    <span>上报类型</span> <span>{{ violationInfo.submitType }}</span>
                </div>
                <div class="box-line">
                    <span>提交时间</span> <span>{{ violationInfo.createTime }}</span>
                </div>
                <div class="text-problem">
                    <div>问题备注</div>
                    <m-field
                        v-model="violationInfo.illegalDesc"
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
                    v-if="violationInfo.pictures.length"
                    :imgs="violationInfo.pictures"
                    up-type="img"
                    is-top="2"
                    is-btm="2"
                ></pics-videos>
            </div>
        </div>
    </div>
</template>

<script>
import picsVideos from '@/components/pics-videos/index.vue';
import { queryLeanIllegalRecord } from '../service';
export default {
    name: 'Info',
    components: { picsVideos },
    data() {
        return {
            violationInfo: {} //违规记录详情
        };
    },
    async created() {
        const res = await queryLeanIllegalRecord(this.$route.query.id);
        this.violationInfo = res;
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
            }
            div:nth-child(2) {
                box-shadow: inset 0px -0.5px 0px rgba(0, 0, 0, 0.15);
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
        .info-text {
            div {
                box-shadow: inset 0px -0.5px 0px rgba(0, 0, 0, 0.15);
            }
            div:nth-child(1),
            div:last-child {
                box-shadow: inset 0px -0.5px 0px rgba(0, 0, 0, 0);
            }
        }
    }
}
</style>
