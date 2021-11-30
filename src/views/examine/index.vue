<template>
    <div class="info-content">
        <div class="custom-nav custom-nav-bg">
            <m-nav-bar fixed title="审批中心" left-text="Back" left-arrow @click-left="goback">
                <template #left>
                    <isc-svg-icon name="iscon-arrow-left-low" size="20px"></isc-svg-icon>
                </template>
            </m-nav-bar>
        </div>
        <div class="info-cards">
            <div class="info-crumbs">
                <div>{{ fieldValue || '请选择' }}</div>
                <div @click="openTeam">选择</div>
            </div>
            <div class="card-box">
                <m-collapse
                    v-for="(it, index) in teamList"
                    :key="index"
                    v-model="activeName"
                    accordion
                    :class="{ 'card-box-new': index == activeName }"
                >
                    <m-collapse-item :name="index">
                        <template #title>
                            <div class="box-title">
                                <img src="@/assets/examine/department.svg" alt="" />
                                <div>{{ it.name }}</div>
                                <div class="title-icon">
                                    <isc-svg-icon v-if="index == activeName" name="iscon-arrow-up"></isc-svg-icon>
                                    <isc-svg-icon v-else name="iscon-arrow-down"></isc-svg-icon>
                                </div>
                                <div v-if="index == 2" class="title-point"></div>
                            </div>
                        </template>
                        <div class="box-blocks">
                            <div
                                v-for="(i, idx) in it.children"
                                :key="idx"
                                class="box-block"
                                :class="{ 'box-marbtm': idx < 2 }"
                                @click="gotoTeam(i)"
                            >
                                <div>{{ i.className }}</div>
                                <div v-if="i.num">{{ i.num }}</div>
                            </div>
                        </div>
                    </m-collapse-item>
                </m-collapse>
            </div>
        </div>
        <div class="team-model">
            <m-popup v-model="showTeam" round position="bottom">
                <m-cascader
                    v-model="cascaderValue"
                    :options="options"
                    :closeable="false"
                    :field-names="fieldNames"
                    @finish="onFinish"
                >
                    <template #title>
                        <div class="team-title">
                            <div>选择所在班组</div>
                            <div @click="showTeam = false">取消</div>
                            <!-- <div @click="onFinish">确定</div> -->
                        </div>
                    </template>
                </m-cascader>
            </m-popup>
        </div>
    </div>
</template>

<script>
import { queryOrgTreeList, queryStaticApproveByOrg } from './service';
export default {
    name: 'Examine',
    data() {
        return {
            activeName: 0,
            showTeam: false, //班组选择框
            cascaderValue: '',
            options: [],
            fieldNames: {
                text: 'rentalName',
                value: 'id',
                children: 'children'
            }, //自定义字段
            fieldValue: '',
            teamList: []
        };
    },
    watch: {
        activeName(val, oldVal) {
            // console.log('展示框' + val);
        }
    },
    async created() {
        this.options = await queryOrgTreeList();
    },
    methods: {
        //打开班组选择框
        openTeam() {
            this.showTeam = true;
        },
        //前去班组列表页
        gotoTeam(item) {
            this.$router.push({ path: '/examine/team', query: { team: JSON.stringify(item) } });
        },
        //返回上一级
        goback() {
            this.$router.go(-1);
        },
        // 全部选项选择完毕后，会触发 finish 事件
        async onFinish({ selectedOptions }) {
            this.showTeam = false;
            this.fieldValue = selectedOptions.map((option) => option.rentalName).join(' | ');
            this.teamList = await queryStaticApproveByOrg({ empidOrgid: this.cascaderValue });
        },
        afterRead(file) {
            console.log(file);
        }
    }
};
</script>
<style lang="scss">
.card-box {
    .m-collapse {
        margin-bottom: 12px;
    }
    .m-cell {
        border-radius: 10px;
    }
    .m-collapse-item__wrapper {
        border-radius: 0 0 10px 10px;
    }
    .m-cell::after {
        border: 0;
    }
}
.card-box-new {
    .m-cell {
        border-radius: 10px 10px 0 0 !important;
    }
}
.team-model {
    .m-cascader__title {
        width: 100%;
    }
    .m-cascader__header {
        padding: 0;
    }
    .m-cascader__option {
        font-family: PingFang SC;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.4);
    }
    .m-cascader__option--selected {
        font-weight: 500;
        color: rgba(0, 0, 0, 0.8);
    }
    .m-tabs__line {
        background: #479aff;
    }
}
</style>
<style lang="scss" scoped>
.info-content {
    font-family: PingFang SC;
    font-style: normal;
    font-weight: normal;
    .info-cards {
        .info-crumbs {
            height: 48px;
            margin-top: 46px;
            background: #fff;
            padding: 0 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.6);
            div:last-child {
                color: #479aff;
            }
        }
    }
    .card-box {
        height: calc(100vh - 94px);
        overflow-y: overlay;
        padding: 12px 12px 0;
        font-family: PingFang SC;
        font-style: normal;
        font-weight: normal;
        .box-title {
            position: relative;
            font-size: 16px;
            line-height: 22px;
            color: #000000;
            display: flex;
            align-items: center;
            img {
                margin-right: 8px;
            }
            .title-icon {
                width: 16px;
                height: 16px;
                position: absolute;
                right: -21px;
            }
            .title-point {
                width: 8px;
                height: 8px;
                background: #ff6969;
                border-radius: 50%;
                margin-left: 12px;
            }
        }
        .box-blocks {
            padding: 0 8px 8px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
        .box-block {
            width: 136px;
            height: 56px;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.8);
            background: #eef6ff;
            border: 1px solid #becee3;
            box-sizing: border-box;
            border-radius: 4px;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            div:nth-child(2) {
                width: 32px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                background: #ff6969;
                border-radius: 19px;
                font-size: 10px;
                color: #fff;
            }
        }
    }
    .box-marbtm {
        margin-bottom: 24px;
    }
    .team-title {
        width: 100%;
        height: 48px;
        padding: 0 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: PingFang SC;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.8);
        box-shadow: inset 0px -0.5px 0px rgba(0, 0, 0, 0.15);
        div:nth-child(2) {
            font-weight: 500;
            color: rgba(0, 0, 0, 0.6);
        }
        // div:last-child {
        //     color: #479aff;
        // }
    }
}
</style>
