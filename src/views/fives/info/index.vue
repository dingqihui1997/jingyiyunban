<template>
    <div class="info-content">
        <div class="custom-nav">
            <m-nav-bar fixed title="详情" left-text="Back" left-arrow @click-left="goback">
                <template #left>
                    <isc-svg-icon name="iscon-arrow-left-low" size="20px"></isc-svg-icon>
                </template>
                <template v-if="fivesInfo.isEdit" #right> <div @click="dealAgain">修改</div> </template>
            </m-nav-bar>
        </div>
        <div class="info-cards page-height">
            <div class="info-status">
                <div class="box-line cards-title">
                    <span></span><span>5S区域</span><span @click="openStandard">区域5S标准</span>
                </div>
                <div class="box-line under-line">
                    <span>活动日期</span> <span>{{ fivesInfo.hisDate }}</span>
                </div>
                <div class="box-line under-line">
                    <span>区域</span> <span>{{ fivesInfo.areaName }}</span>
                </div>
                <div class="box-line under-line">
                    <span>分区域</span> <span>{{ fivesInfo.divisionName }}</span>
                </div>
                <div class="box-line under-line">
                    <span>分区域负责人</span> <span>{{ fivesInfo.record[0].responsiblePerson }}</span>
                </div>
                <div class="box-line">
                    <span>5S评价</span> <span>{{ fivesInfo.record[0].cardType }}</span>
                </div>
            </div>
            <div class="info-text">
                <div class="box-line cards-title"><span></span><span>区域信息</span></div>
                <div v-for="(i, index) in fivesInfo.record" :key="index">
                    <div class="box-line under-line">
                        <span>上传日期</span> <span>{{ i.createTime.split(' ')[0] }}</span>
                    </div>
                    <pics-videos
                        v-if="i.pictures.length"
                        :imgs="i.pictures"
                        up-type="img"
                        is-top="2"
                        is-btm="2"
                    ></pics-videos>
                    <div class="text-problem">
                        <div>备注</div>
                        <m-field
                            v-model="i.reasonRemark"
                            rows="3"
                            autosize
                            type="textarea"
                            maxlength="100"
                            placeholder="请输入"
                            show-word-limit
                            style="padding: 0"
                        />
                    </div>
                    <div v-if="index != fivesInfo.record.length - 1" style="height: 16px; background: #f6f8fb"></div>
                </div>
            </div>
        </div>
        <m-popup v-model="showStandard" round>
            <the-fives-standard :images="images" @closeModel="closeStandard"></the-fives-standard>
        </m-popup>
    </div>
</template>

<script>
import { queryQueryFileList } from '../service';
import picsVideos from '@/components/pics-videos/index.vue';
import TheFivesStandard from '../components/the-fives-standard';
export default {
    name: 'Info',
    components: { picsVideos, TheFivesStandard },
    data() {
        return {
            fivesInfo: {}, //违规记录详情
            showStandard: false, //5s区域标准图片弹框
            images: [] //5s区域标准图片列表
        };
    },
    async created() {
        this.fivesInfo = JSON.parse(localStorage.getItem('fivesInfo'));
    },
    methods: {
        //再次发牌
        dealAgain() {
            this.$router.push({
                path: '/fives/licensing',
                query: {
                    areaId: this.fivesInfo.record[0].areaId,
                    divisionId: this.fivesInfo.record[0].divisionId,
                    divisionName: this.fivesInfo.divisionName,
                    personName: this.fivesInfo.record[0].responsiblePerson,
                    id: this.fivesInfo.record[0].empid
                }
            });
        },
        //打开5s检查标准
        async openStandard() {
            this.images = await queryQueryFileList({
                businessModule: '5s分区域管理',
                businesskey: this.fivesInfo.record[0].divisionId
            });
            if (this.images.length > 0) {
                this.showStandard = true;
            } else {
                this.$toast('暂无图片');
            }
        },
        //关闭5s检查标准弹框
        closeStandard() {
            this.showStandard = false;
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
