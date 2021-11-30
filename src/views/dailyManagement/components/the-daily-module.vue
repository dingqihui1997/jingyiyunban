<template>
    <div>
        <div class="daily">
            <div class="dailyName">
                <span class="name disFlex-a">{{ title }}</span>
            </div>
            <div class="disFlex-w dailyItemBox">
                <div v-for="(item, index) in list" :key="index" class="Item">
                    <div class="dailyItem flex-dji" :class="index % 3 == 2 ? 'bor' : ''" @click="goto(item)">
                        <img :src="item.icon" class="imgIcon" />
                        <div class="fontSize14">{{ item.name }}</div>
                        <img v-if="!item.aclModuleId" src="../../../assets/image/shengji.svg" class="Enable" />
                    </div>
                </div>
            </div>
        </div>
        <tips-popup ref="tips" title="无法使用" text="升级后可使用!"></tips-popup>
    </div>
</template>

<script>
export default {
    props: {
        workList: {
            type: Array,
            require: true
        },
        title: {
            type: String,
            default: ''
        }
    },
    data() {
        return { type: 0, list: [] };
    },
    mounted() {
        this.workList.map((item) => {
            if (item.hasAcl) {
                this.list.push(item);
            }
        });
        this.type = Number(this.$route.query.num);
    },
    methods: {
        goto(item) {
            if (!item.aclModuleId) {
                this.$refs.tips.show = true;
            } else {
                if (this.type) {
                    let orgId = localStorage.getItem('orgId');
                    orgId
                        ? this.$router.push({ path: item.path, query: { orgId: orgId } })
                        : this.$toast('请选择所在班组');
                } else {
                    this.$router.push(item.url);
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.daily {
    margin: 12px;
    background: #fff;
    box-shadow: inset 0px -0.5px 0px rgba(0, 0, 0, 0.15);
    border-radius: 10px 10px 0px 0px;
}
.dailyName {
    width: 351px;
    height: 40px;
    .name {
        padding: 10px 20px;
        color: #00000099;
        border-bottom: 1px solid #eee;
    }
}
.dailyItem {
    width: 117px;
    height: 120px;
    border-bottom: 1px solid #eee;
    border-right: 1px solid #eee;
    position: relative;
    .imgIcon {
        width: 48px;
        height: 48px;
        margin-bottom: 12px;
    }
    .Enable {
        position: absolute;
        top: 0;
        right: 0;
    }
}
.bor {
    border-right: none !important;
}
</style>
