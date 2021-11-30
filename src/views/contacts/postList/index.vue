<template>
    <div>
        <div class="custom-nav">
            <m-nav-bar
                fixed
                placeholder
                :border="false"
                title="选择岗位"
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
        <div class="postListBox">
            <m-search v-model="value" left-icon="iscon-search" shape="round" placeholder="搜索" @search="onSearch">
            </m-search>
        </div>
        <div class="cell">
            <div v-if="personList.length">
                <m-cell v-for="(item, index) in personList" :key="index">
                    <div class="disFlex-a">
                        <m-radio-group v-model="radio">
                            <m-radio :name="item.id"></m-radio>
                        </m-radio-group>
                        <div class="name fontSize16">{{ item.postName }}</div>
                        <div class="fontSize14 color0009">{{ `(${item.postCode})` }}</div>
                    </div>
                </m-cell>
            </div>
            <div v-else class="personList disFlex-ja">暂无数据</div>
        </div>
    </div>
</template>

<script>
import { queryNotOldPost } from '../service';
export default {
    name: '',
    data() {
        return {
            radio: -1,
            value: '',
            personnel: [],
            personList: []
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
        //查询不包含旧岗位信息
        console.log(this.$route.query.id);
        this.personnel = await queryNotOldPost(this.$route.query.id);
        this.personList = this.personnel;
        let a = localStorage.getItem('newPost'); //默认单选
        a ? (this.radio = JSON.parse(a).id) : (this.radio = -1);
    },
    methods: {
        onClickLeft() {
            this.$router.back();
        },
        onClickRight() {
            let arr = this.personList.find((item) => {
                return item.id === this.radio;
            });
            if (arr) {
                localStorage.setItem('newPost', JSON.stringify(arr));
                this.$router.back();
            } else {
                this.$toast('请选择新岗位');
            }
        },
        //搜索回车
        onSearch(e) {
            if (e.trim()) {
                this.personList = this.personnel.filter((item) => {
                    if (item.postName) {
                        return item.postName.includes(e) === true;
                    }
                });
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
