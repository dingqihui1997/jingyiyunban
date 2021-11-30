<template>
    <div class="dailyBox">
        <div class="custom-nav-bg">
            <m-nav-bar
                fixed
                placeholder
                :border="false"
                :title="Number(type) ? '数据中心' : '日常管理'"
                @click-left="goback"
            >
                <template #left>
                    <isc-svg-icon name="iscon-arrow-left-low" color="#ffffff" />
                </template>
            </m-nav-bar>
        </div>
        <div v-if="show">
            <div v-if="Number(type)" class="info-crumbs">
                <div>{{ fieldValue || '请选择' }}</div>
                <div @click="openPopup">选择</div>
            </div>
            <the-daily-module v-if="menuList.length" :work-list="menuList[0]" title="开班前"></the-daily-module>
            <the-daily-module v-if="menuList.length" :work-list="menuList[1]" title="工作中"></the-daily-module>
            <the-daily-module v-if="menuList.length" :work-list="menuList[2]" title="收班后"></the-daily-module>
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
                            <div>取消</div>
                            <div @click="showTeam = false">选择所在班组</div>
                            <div>确定</div>
                        </div>
                    </template>
                </m-cascader>
            </m-popup>
        </div>
    </div>
</template>

<script>
import TheDailyModule from './components/the-daily-module.vue';
import { queryOrgTreeList, queryUserAcl } from './service';
import store from '@/store';
import { menu, menuUrl } from './menu';
export default {
    name: '',
    components: { TheDailyModule },
    data() {
        return {
            menuList: [],
            menuUrlList: menuUrl,
            show: true,
            showTeam: false,
            cascaderValue: '',
            options: [],
            fieldNames: {
                text: 'rentalName',
                value: 'id',
                children: 'children'
            }, //自定义字段
            fieldValue: '',
            type: 0,
            flag: false,
            dataList: [],
            list: []
        };
    },
    async mounted() {
        this.initMenus();
        localStorage.removeItem('patrolParams');
        localStorage.removeItem('newPost');
        this.type = this.$route.query.num;
        this.options = await queryOrgTreeList();
        this.fieldValue = localStorage.getItem('fieldValue') || '';
    },
    methods: {
        goback() {
            localStorage.removeItem('fieldValue');
            localStorage.removeItem('orgId');
            this.$router.back();
        },
        openPopup() {
            this.showTeam = true;
        },
        // 全部选项选择完毕后，会触发 finish 事件
        async onFinish({ selectedOptions }) {
            this.showTeam = false;
            this.fieldValue = selectedOptions.map((option) => option.rentalName).join(' | ');
            let orgId = selectedOptions[selectedOptions.length - 1].id;
            localStorage.setItem('orgId', orgId);
            localStorage.setItem('fieldValue', this.fieldValue);
        },
        async initMenus() {
            let num = Number(this.$route.query.num);
            const data = await queryUserAcl();
            const arr = [];
            num ? (this.dataList = data[1].aclModuleList) : (this.dataList = data[0].aclModuleList);
            this.dataList.map((item) => {
                arr.push(item.aclList);
            });
            this.menuUrlList.map((item, index) => {
                arr[index].map((val, index) => {
                    val.path = item[index].path;
                    val.url = item[index].url;
                    val.icon = item[index].icon;
                });
            });
            this.menuList = JSON.parse(JSON.stringify(menu));
            arr.map((item, index) => {
                if (index) {
                    this.menuList[index] = item.concat(this.menuList[index]);
                } else {
                    item.map((item1, index) => {
                        this.menuList[0].splice(index + 3, 0, item1);
                    });
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.dailyBox {
    height: 100%;
    background: #f6f8fb;
}
.info-crumbs {
    height: 48px;
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
    div:nth-child(1) {
        font-weight: 500;
        color: rgba(0, 0, 0, 0.6);
    }
    div:last-child {
        color: #479aff;
    }
}
</style>
<style lang="scss">
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
