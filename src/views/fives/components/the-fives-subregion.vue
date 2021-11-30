<template>
    <div class="the-fives-subregion" style="height: 400px">
        <div class="subregion-title">
            <div>{{ areaName }}</div>
            <isc-svg-icon name="iscon-bold-close" @click="closeModel"></isc-svg-icon>
        </div>
        <div class="subregion-status">
            <div></div>
            <div>未发牌</div>
            <div></div>
            <div>绿牌</div>
            <div></div>
            <div>黄牌</div>
            <div></div>
            <div>红牌</div>
            <div></div>
            <div>禁用</div>
        </div>
        <div class="subregion-table">
            <div
                v-for="(i, index) in subregionList"
                :key="index"
                :class="{ 'table-left': index % 3 == 0, 'table-top': index < 3 }"
                class="table-box"
                @click="chooseRegion(i, index)"
            >
                <div v-if="index == chooseIndex" class="sure-icon">
                    <img src="../../../assets/fives/sure.svg" alt="" />
                </div>
                <div v-if="i.enabled == 'Y'">
                    <div v-if="i.status == 'UNCHECKED'">{{ i.divisionName }}</div>
                    <div v-else-if="i.status == 'GOOD'" style="background: #00af31">{{ i.divisionName }}</div>
                    <div v-else-if="i.status == 'MID'" style="background: #fcb306">{{ i.divisionName }}</div>
                    <div v-else style="background: #ff6969">{{ i.divisionName }}</div>
                </div>
                <div v-else style="background: #ccc">
                    {{ i.divisionName }}
                </div>
            </div>
        </div>
        <div style="height: 60px"></div>
        <div class="subregion-btn">
            <div @click="sureSubmit">确定</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TheFivesSubregion',
    props: {
        subregionList: {
            type: Array,
            default: () => []
        }, //分区域列表
        areaName: {
            type: String,
            default: ''
        } //区域名称
    },
    data() {
        return {
            chooseIndex: -1, //选中的分区域
            chooseItem: -1 //选中的分区域
        };
    },
    methods: {
        //确定分区域
        sureSubmit() {
            this.$emit('success', this.chooseItem);
        },
        //选中某一个分区域
        chooseRegion(item, index) {
            if (item.enabled == 'Y') {
                this.chooseIndex = index;
                this.chooseItem = item;
            }
        },
        closeModel() {
            this.$emit('closeModel');
        }
    }
};
</script>

<style lang="scss" scoped>
.the-fives-subregion {
    width: 300px;
    height: 460px !important;
    .subregion-title {
        padding: 0 12px;
        height: 48px;
        font-family: PingFang SC;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: inset 0px -0.5px 0px rgba(0, 0, 0, 0.15);
    }
    .subregion-status {
        padding: 0 12px;
        height: 36px;
        display: flex;
        align-items: center;
        div:nth-child(odd) {
            width: 12px;
            height: 12px;
            border-radius: 4px;
            margin-right: 4px;
        }
        div:nth-child(1) {
            background: #fff;
            border: 1px solid rgba(0, 0, 0, 0.4);
        }
        div:nth-child(3) {
            background: #00af31;
        }
        div:nth-child(5) {
            background: #fcb306;
        }
        div:nth-child(7) {
            background: #ff6969;
        }
        div:nth-child(9) {
            background: #ccc;
        }
        div:nth-child(even) {
            font-family: PingFang SC;
            font-style: normal;
            font-weight: normal;
            font-size: 10px;
            color: rgba(0, 0, 0, 0.6);
            margin-right: 12px;
        }
    }
    .subregion-table {
        height: 300px;
        padding-left: 13px;
        overflow-y: scroll;
        display: flex;
        align-content: flex-start;
        flex-wrap: wrap;
        .table-box {
            width: 91px;
            height: 48px;
            text-align: center;
            line-height: 48px;
            border-right: 1px solid rgba(0, 0, 0, 0.3);
            border-bottom: 1px solid rgba(0, 0, 0, 0.3);
            position: relative;
            .sure-icon {
                width: 20px;
                height: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                position: absolute;
                right: 3px;
                top: 3px;
            }
        }
        .table-left {
            border-left: 1px solid rgba(0, 0, 0, 0.3);
        }
        .table-top {
            border-top: 1px solid rgba(0, 0, 0, 0.3);
        }
    }
    .subregion-btn {
        position: fixed;
        bottom: 0;
        background: #fff;
        height: 60px;
        width: 300px;
        box-shadow: 0px -8px 8px rgba(239, 243, 250, 0.25);
        padding: 10px 12px;
        div {
            height: 40px;
            background: #479aff;
            border-radius: 10px;
            font-family: PingFang SC;
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            letter-spacing: 4px;
            color: #ffffff;
            text-align: center;
            line-height: 40px;
        }
    }
}
</style>
