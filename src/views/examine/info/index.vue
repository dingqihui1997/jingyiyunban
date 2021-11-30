<template>
    <div class="info-content">
        <div class="custom-nav">
            <m-nav-bar fixed title="详情" left-text="Back" left-arrow @click-left="goback">
                <template #left>
                    <isc-svg-icon name="iscon-arrow-left-low" size="20px"></isc-svg-icon>
                </template>
            </m-nav-bar>
        </div>
        <div class="info-cards page-height-btn">
            <div class="info-status">
                <div class="box-line cards-title"><span></span><span>申请状态</span></div>
                <div class="box-line">
                    <span>申请单号</span> <span>{{ examineInfo.applyCode }}</span>
                </div>
                <div class="box-line"><span>状态</span> <span>待审核</span></div>
            </div>
            <div class="info-text">
                <div class="box-line cards-title"><span></span><span>申请内容</span></div>
                <div class="box-line under-line">
                    <span>员工</span> <span>{{ examineInfo.personName }}</span>
                </div>
                <div class="box-line under-line">
                    <span>工号</span> <span>{{ examineInfo.personCode }}</span>
                </div>
                <div class="box-line under-line">
                    <span>原岗位</span> <span>{{ examineInfo.postCodeName }}</span>
                </div>
                <div class="box-line under-line">
                    <span>新岗位</span> <span>{{ examineInfo.newPostCodeName }}</span>
                </div>
                <div class="box-line"><span style="color: rgba(0, 0, 0, 0.4)">调岗时间</span></div>
                <div class="box-line under-line">
                    <span>开始时间</span> <span>{{ examineInfo.changeTime }}</span>
                </div>
                <div class="box-line under-line">
                    <span>结束时间</span> <span>{{ examineInfo.changeEndtime }}</span>
                </div>
                <div class="text-problem">
                    <div>原因备注</div>
                    <m-field
                        v-model="examineInfo.reasonDesc"
                        rows="3"
                        autosize
                        type="textarea"
                        maxlength="100"
                        placeholder="请输入"
                        show-word-limit
                        style="padding: 0"
                    />
                </div>
            </div>
        </div>
        <div class="content-btn">
            <div @click="reject">拒绝</div>
            <div @click="approve">通过</div>
        </div>
    </div>
</template>

<script>
import { insertApplyApprove, insertApplyReject } from '../service';
export default {
    name: 'Info',
    data() {
        return {
            teamInfo: {}, //班组信息
            examineInfo: {} //调岗详情信息
        };
    },
    created() {
        this.teamInfo = JSON.parse(this.$route.query.team);
        this.examineInfo = JSON.parse(localStorage.getItem('examineInfo'));
    },
    methods: {
        //拒绝
        async reject() {
            await insertApplyReject({ applyCode: this.examineInfo.applyCode, reason: this.examineInfo.reasonDesc });
            this.$toast('已拒绝');
        },
        //同意
        async approve() {
            await insertApplyApprove({ applyCode: this.examineInfo.applyCode, reason: this.examineInfo.reasonDesc });
            this.$toast('已通过审核');
            setTimeout(() => {
                this.$router.push({ path: '/examine/team', query: { team: JSON.stringify(this.teamInfo) } });
            }, 1000);
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
    .content-btn {
        position: fixed;
        width: 100%;
        height: 100px;
        background: #fff;
        bottom: 0;
        padding: 16px 16px 40px;
        box-shadow: 0px -8px 8px #eff3fa;
        display: flex;
        justify-content: space-between;
        div {
            width: 164px;
            height: 44px;
            font-family: Poppins;
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 44px;
            text-align: center;
            color: #ffffff;
            background: #ff6969;
            border-radius: 10px;
        }
        div:last-child {
            background: #5ed582;
        }
    }
}
</style>
