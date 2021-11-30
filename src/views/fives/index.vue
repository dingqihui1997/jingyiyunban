<template>
    <div class="fives-content">
        <div class="custom-nav">
            <m-nav-bar fixed title="5S活动" left-text="Back" left-arrow @click-left="goback" @click-right="gotoHistory">
                <template #left>
                    <isc-svg-icon name="iscon-arrow-left-low"></isc-svg-icon>
                </template>
                <template #right> <div>历史记录</div> </template>
            </m-nav-bar>
        </div>
        <div class="page-height-btn">
            <div class="content">
                <div class="content-title">
                    <div></div>
                    <div>选择5S区域</div>
                    <div @click="openStandard">区域5S标准</div>
                </div>
                <div class="content-box content-box-height">
                    <div><span class="required-point">*</span>活动日期</div>
                    <div class="color0008">{{ activityDate }}</div>
                </div>
                <div class="content-box content-box-height">
                    <div><span class="required-point">*</span>区域</div>
                    <div :class="{ color0008: regionObj.areaName }" @click="openRegion">
                        <div class="line-height48">{{ regionObj.areaName || '请选择' }}</div>
                        <isc-svg-icon name="iscon-arrow-right-low"></isc-svg-icon>
                    </div>
                </div>
                <div class="content-box content-box-height">
                    <div><span class="required-point">*</span>分区域</div>
                    <div :class="{ color0008: subregionObj.divisionName }" @click="openSubregion">
                        <div class="line-height48">{{ subregionObj.divisionName || '请选择' }}</div>
                        <isc-svg-icon name="iscon-arrow-right-low"></isc-svg-icon>
                    </div>
                </div>
                <!-- 根据条件是否显示 -->
                <div v-if="isRegion" class="content-box content-box-height">
                    <div><span class="required-point">*</span>分区域负责人</div>
                    <div class="color0008">{{ subregionDetailInfo.responsiblePerson || '未选择' }}</div>
                </div>
                <div v-if="isRegion" class="content-box content-box-height">
                    <div><span class="required-point">*</span>5S评价</div>
                    <div class="color0008">{{ subregionDetailInfo.statusName }}</div>
                </div>
            </div>
            <div v-if="isRegion && subregionDetailInfo.files" class="content">
                <div class="content-title">
                    <div></div>
                    <div>区域信息</div>
                </div>
                <div v-for="i in 3" :key="i">
                    <div class="content-box content-box-height">
                        <div>上传日期</div>
                        <div>2021.08.09</div>
                    </div>
                    <uploader up-type="img" is-top="2"></uploader>
                    <div class="content-box content-problem">
                        <div>备注</div>
                        <m-field
                            rows="3"
                            autosize
                            type="textarea"
                            maxlength="100"
                            placeholder="请输入"
                            show-word-limit
                            style="padding: 0"
                        />
                    </div>
                    <div v-if="i != 3" style="height: 16px; background: #f6f8fb"></div>
                </div>
            </div>
        </div>
        <div class="content-btn" :style="{ opacity: isRegion ? '1' : '0.4' }">
            <div @click="gotoLicensing">发牌</div>
        </div>
        <m-popup v-model="showSubregion" round>
            <the-fives-subregion
                :subregion-list="subregionList"
                :area-name="regionObj.areaName"
                @closeModel="closeSubregion"
                @success="sureSubregion"
            ></the-fives-subregion>
        </m-popup>
        <m-popup v-model="showStandard" round>
            <the-fives-standard :images="images" @closeModel="closeStandard"></the-fives-standard>
        </m-popup>
        <div class="new-actionsheet">
            <m-action-sheet
                v-model="showRegion"
                :actions="actions"
                cancel-text="取消"
                description="5s区域"
                @select="onSelect"
            />
        </div>
    </div>
</template>

<script>
import { queryNow } from '@/utils/servicetime.js';
import { queryQueryAll, queryLeanAreaDivision, queryQueryFileList, queryGetDivisionsByAreaId } from './service';
import TheFivesSubregion from './components/the-fives-subregion';
import TheFivesStandard from './components/the-fives-standard';
import uploader from '../../components/uploader/index.vue';
export default {
    name: 'Fives',
    components: { TheFivesSubregion, uploader, TheFivesStandard },
    data() {
        return {
            isRegion: false, //是否已经选择区域分区域
            showRegion: false, //区域弹框
            regionObj: {}, //区域对象信息
            showSubregion: false, //分区域弹框
            subregionObj: {}, //分区域对象信息
            actions: [], //区域弹出框
            activityDate: '', //活动时间
            subregionDetailInfo: {}, //分区域详细信息
            showStandard: false, //5s区域标准图片弹框
            images: [], //5s区域标准图片列表
            subregionList: [] //分区域列表
        };
    },
    async created() {
        this.actions = await queryQueryAll();
    },
    async mounted() {
        this.activityDate = await queryNow();
    },
    methods: {
        //打开5s检查标准
        async openStandard() {
            if (this.subregionObj.divisionName) {
                this.images = await queryQueryFileList({
                    businessModule: '5s分区域管理',
                    businesskey: this.subregionDetailInfo.id
                });
                if (this.images.length > 0) {
                    this.showStandard = true;
                } else {
                    this.$toast('暂无图片');
                }
            } else {
                this.$toast('请选择分区域');
            }
        },
        //关闭5s检查标准弹框
        closeStandard() {
            this.showStandard = false;
        },
        //获取到的分区域信息
        async sureSubregion(item) {
            this.subregionObj = item;
            this.subregionDetailInfo = await queryLeanAreaDivision(item.id);
            this.closeSubregion();
            this.isRegion = true;
        },
        //打开区域弹框
        openRegion() {
            if (this.actions.length) {
                this.showRegion = true;
            } else {
                this.$toast('请在后台配置区域信息');
            }
        },
        //打开分区域弹框
        async openSubregion() {
            if (!this.regionObj.id) {
                this.$toast('请选择区域');
                return;
            }
            this.subregionList = await queryGetDivisionsByAreaId(this.regionObj.id);
            if (this.subregionList.length < 1) {
                this.$toast('请在后台配置区域信息');
            } else {
                this.showSubregion = true;
            }
        },
        //关闭分区域弹框
        closeSubregion() {
            this.showSubregion = false;
        },
        //选择区域
        onSelect(item) {
            this.regionObj = item;
            this.showRegion = false;
        },
        //返回上一级
        goback() {
            this.$router.go(-1);
        },
        //前去历史记录页面
        gotoHistory(item) {
            this.$router.push('/fives/history');
        },
        //前去发牌页面
        gotoLicensing() {
            if (this.isRegion) {
                this.$router.push({
                    path: '/fives/licensing',
                    query: {
                        areaId: this.regionObj.id,
                        divisionId: this.subregionDetailInfo.id,
                        divisionName: this.subregionDetailInfo.divisionName
                    }
                });
            }
        },
        afterRead(file) {
            console.log(file);
        }
    }
};
</script>
<style lang="scss" scoped>
.fives-content {
    .content {
        margin: 12px 12px 0;
        border-radius: 10px;
        background: #ffffff;
        padding-bottom: 10px;
        .content-title {
            height: 48px;
            position: relative;
            div:first-child {
                position: absolute;
                left: 3.42%;
                right: 95.44%;
                top: 33.33%;
                bottom: 33.33%;
                background: #479aff;
                border-radius: 22px;
            }
            div:nth-child(2) {
                position: absolute;
                left: 7.98%;
                top: 22.92%;
                bottom: 25%;
                font-family: PingFang SC;
                font-weight: 500;
                font-size: 18px;
                color: #000000;
            }
            div:nth-child(3) {
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
        .content-problem {
            flex-direction: column;
            padding-bottom: 10px;
            div:first-child {
                height: 48px;
            }
        }
        div:last-child {
            box-shadow: inset 0px -0.5px 0px rgba(0, 0, 0, 0);
        }
    }
    .content-btn {
        position: fixed;
        width: 100%;
        height: 100px;
        background: #fff;
        bottom: 0;
        padding: 16px 16px 40px;
        box-shadow: 0px -8px 8px #eff3fa;
        div {
            width: 100%;
            height: 44px;
            background: #479aff;
            border-radius: 10px;
            font-family: Poppins;
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 44px;
            text-align: center;
            color: #ffffff;
        }
    }
    .content-box {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 3.42%;
        font-family: PingFang SC;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.7);
        box-shadow: inset 0px -0.5px 0px rgba(0, 0, 0, 0.15);
        div {
            display: flex;
            align-items: center;
            height: 100%;
        }
        div:last-child {
            color: rgba(0, 0, 0, 0.4);
        }
        .isc-svg-icon {
            margin-left: 8px;
        }
    }
    .content-box-height {
        height: 48px;
    }
}
</style>
