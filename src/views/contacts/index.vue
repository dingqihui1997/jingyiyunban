<template>
    <div>
        <div class="custom-nav">
            <m-nav-bar
                fixed
                placeholder
                :border="false"
                :title="title"
                left-text="Back"
                @click-left="onClickLeft"
                @click-right="onClickRight"
            >
                <template #left>
                    <isc-svg-icon name="iscon-arrow-left-low" />
                </template>
                <template #right>
                    <div>确定</div>
                </template>
            </m-nav-bar>
        </div>
        <!-- 搜索 -->
        <div class="postListBox">
            <m-search v-model="value" left-icon="iscon-search" shape="round" placeholder="搜索" @search="onSearch">
            </m-search>
        </div>
        <div class="cell">
            <m-cell v-for="(item, index) in personList" :key="index">
                <div class="disFlex-a wi100">
                    <m-radio-group v-if="type" v-model="radio">
                        <m-radio :name="item.id">
                            <div class="disFlex-a wi100">
                                <div class="name fontSize16">{{ item.personName }}</div>
                                <div class="fontSize14 color0009">{{ `(${item.empCode})` }}</div>
                            </div>
                        </m-radio>
                    </m-radio-group>
                    <m-checkbox v-if="!type" v-model="item.checked">
                        <div class="disFlex-a wi100">
                            <div class="name fontSize16">{{ item.personName }}</div>
                            <div class="fontSize14 color0009">{{ `(${item.empCode})` }}</div>
                        </div>
                    </m-checkbox>
                </div>
            </m-cell>
            <div v-if="personList.length === 0" class="personList disFlex-ja">暂无数据</div>
        </div>
    </div>
</template>

<script>
import { queryLeanEmployee } from './service';
export default {
    name: '',
    data() {
        return {
            radio: -1,
            type: 1, //判断多选单选
            title: '', //tabBar标题
            value: '',
            personnel: [], //总数据
            personList: [] //页面展示搜索数据
        };
    },
    watch: {
        value(val) {
            if (!val) {
                this.personList = this.personnel;
            }
        }
    },
    async mounted() {
        //根据班组id查询人员信息  单选 选择检查人
        let wtId = localStorage.getItem('organize') ? JSON.parse(localStorage.getItem('organize')).id : '';
        this.personnel = await queryLeanEmployee(wtId);
        this.personnel.map((item, index) => {
            this.$set(item, 'checked', false);
        });
        this.personList = this.personnel;
        this.type = Number(this.$route.query.val);
        this.title = this.$route.query.title;
        let a = localStorage.getItem('staff'); //默认单选
        a ? (this.radio = JSON.parse(a).id) : (this.radio = -1);
        //默认多选
        if (localStorage.getItem('staffList')) {
            let arr = JSON.parse(localStorage.getItem('staffList'));
            this.personList.map((item) => {
                arr.map((item1) => {
                    if (item.id === item1.id) {
                        item.checked = true;
                    }
                });
            });
        }
    },
    methods: {
        onClickLeft() {
            this.$router.back();
        },
        // 回车搜索
        onSearch(e) {
            if (e.trim()) {
                this.personList = this.personnel.filter((item) => {
                    return item.personName.includes(e) === true;
                });
            }
        },
        // 点击确认
        onClickRight() {
            //单选
            let staff = this.personList.find((item) => {
                return item.id === this.radio;
            });
            // 多选责任人
            let staffList = this.personList.filter((item) => {
                return item.checked;
            });
            if (this.type) {
                localStorage.setItem('staff', JSON.stringify(staff));
                this.$router.go(-1);
            } else {
                staffList.length > 10
                    ? this.$toast('最多选择十位责任人')
                    : localStorage.setItem('staffList', JSON.stringify(staffList));
                this.$router.go(-1);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.anchor {
    background: #fff;
    height: 48px;
    border-bottom: 1px solid #eee;
    padding-left: 13px;
}
.name {
    margin: 0 12px 0 17px;
}
.indexList {
    padding: 3.5px 12px;
}
.cell {
    margin-top: 10px;
}
.personList {
    margin-top: 70px;
    color: #a0a0a0;
}
</style>
