<template>
    <div class="fives-content">
        <div class="custom-nav">
            <m-nav-bar fixed title="发牌" left-text="Back" left-arrow @click-left="goback" @click-right="gotoHistory">
                <template #left>
                    <isc-svg-icon name="iscon-arrow-left-low" size="20px"></isc-svg-icon>
                </template>
                <template #right> 历史记录 </template>
            </m-nav-bar>
        </div>

        <div class="content">
            <div class="content-title">
                <div></div>
                <div>发牌区域</div>
            </div>
            <div class="content-box content-box-height">
                <div><span class="required-point">*</span>分区域</div>
                <div class="color0008">{{ divisionName }}</div>
            </div>
            <div class="content-box content-box-height">
                <div><span class="required-point">*</span>选择员工</div>
                <div @click="gotoPerson">
                    <div class="line-height48" :class="{ color0008: staff.personName }">
                        {{ staff.personName || '请选择' }}
                    </div>
                    <isc-svg-icon name="iscon-arrow-right-low"></isc-svg-icon>
                </div>
            </div>
            <div class="content-box content-box-height">
                <div><span class="required-point">*</span>发牌</div>
                <div @click="showFrame = true">
                    <div class="line-height48" :class="{ color0008: cardType }">{{ cardType || '请选择' }}</div>
                    <isc-svg-icon name="iscon-arrow-right-low"></isc-svg-icon>
                </div>
            </div>
            <div class="content-box content-problem">
                <div><span class="required-point">*</span>原因备注</div>
                <m-field
                    v-model="reasonRemark"
                    rows="3"
                    autosize
                    type="textarea"
                    maxlength="100"
                    placeholder="请输入"
                    show-word-limit
                    style="padding: 0"
                />
            </div>
            <uploader
                ref="uploader"
                up-type="img"
                is-top="2"
                is-btm="2"
                :business-key="businessKey"
                business-module="5s活动记录信息"
                @isImg="isImg"
            ></uploader>
        </div>
        <div v-show="showButton" class="content-btn">
            <div @click="sucSubmit">提交</div>
        </div>
        <div class="new-actionsheet">
            <m-action-sheet
                v-model="showFrame"
                :actions="actions"
                cancel-text="取消"
                description="发牌"
                close-on-click-action
                @select="onSelect"
            />
        </div>
        <tips-popup
            ref="popup"
            :title="tipsTitle"
            :text="tipsText"
            url="/fives/history"
            :is-back="isBack"
            @send="send"
        ></tips-popup>
    </div>
</template>

<script>
import { insertLean5sactivityRecor } from '../service';
import uploader from '@/components/uploader/index.vue';
export default {
    name: 'KeepAlive',
    components: { uploader },
    data() {
        return {
            showFrame: false, //互动模式评价弹框
            actions: [{ name: '绿牌' }, { name: '黄牌' }, { name: '红牌' }],
            divisionName: '', // 分区域名称
            divisionId: '', // 分区域id
            areaId: '', // 区域id
            staff: {}, //人员信息
            cardType: '', //发牌类型
            reasonRemark: '', //原因备注
            businessKey: 0, //时间戳
            tipsTitle: '提交成功',
            tipsText: '',
            isUpImg: false, //是否上传图片
            isBack: false,
            isSubmit: false, //是否允许点击提交按钮(防止用户多次点击)
            showButton: true, //提交按钮显示与否
            docmHeight: document.documentElement.clientHeight, //默认屏幕高度
            showHeight: document.documentElement.clientHeight //实时屏幕高度
        };
    },
    watch: {
        showHeight() {
            if (this.docmHeight > this.showHeight) {
                this.showButton = false;
            } else {
                this.showButton = true;
            }
        }
    },
    activated() {
        this.$refs.popup.show = false;
        this.staff = localStorage.getItem('staff') ? JSON.parse(localStorage.getItem('staff')) : {};
        let newObj = this.$route.query;
        this.divisionName = newObj.divisionName;
        this.divisionId = newObj.divisionId;
        this.areaId = newObj.areaId;
        if (this.$route.query.personName) {
            this.staff.personName = this.$route.query.personName;
            this.staff.id = this.$route.query.id;
        }
    },
    created() {},
    mounted() {
        this.businessKey = new Date().getTime();
        window.onresize = () =>
            (() => {
                this.showHeight = document.body.clientHeight;
            })();
    },
    methods: {
        // 重置参数
        initInfo() {
            this.staff = {};
            this.cardType = '';
            this.reasonRemark = '';
            this.isUpImg = false;
        },
        // 判断是否填写完
        isComplete() {
            if (!this.staff.id || !this.divisionId || !this.areaId || !this.cardType || !this.reasonRemark) {
                return true;
            }
        },
        // 判断是否存在任意一个参数
        isHave() {
            if (this.staff.id || this.cardType || this.reasonRemark) {
                return true;
            }
        },
        //是否已经上传图片
        isImg(item) {
            this.isUpImg = item;
        },
        //前去人员选择页面
        gotoPerson() {
            this.$router.push({ path: '/contacts', query: { val: 1, title: '选择人员' } });
        },
        //选择某一项
        onSelect(item) {
            this.cardType = item.name;
            this.showFrame = false;
        },
        //确认返回上一页面
        send() {
            this.$refs.uploader.fileList = [];
            this.initInfo();
        },
        //返回上一级
        goback() {
            if (this.isHave()) {
                this.isBack = true;
                this.tipsTitle = '提示';
                this.tipsText = '有未保存的内容,请注意数据丢失';
                this.$refs.popup.show = true;
            } else {
                this.$router.go(-1);
            }
        },
        //前去历史记录页面
        gotoHistory(item) {
            this.$router.push('/fives/history');
        },
        //提交发牌
        async sucSubmit() {
            if (this.isComplete()) {
                this.tipsTitle = '提交失败';
                this.tipsText = '有未填写或未上传的内容';
                this.$refs.popup.show = true;
                return;
            }
            let parmas = {
                divisionId: this.divisionId,
                areaId: this.areaId,
                empid: this.staff.id,
                cardType: this.cardType,
                reasonRemark: this.reasonRemark,
                id: this.businessKey
            };
            if (!this.isSubmit) {
                this.isSubmit = true;
                setTimeout(() => {
                    this.isSubmit = false;
                }, 1000);
                await insertLean5sactivityRecor(parmas);
                this.businessKey = new Date().getTime();
                this.isBack = false;
                this.tipsTitle = '提交成功';
                this.tipsText = '';
                localStorage.removeItem('staff');
                this.send();
                this.$refs.popup.show = true;
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
        margin: 58px 12px 0;
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
            div:last-child {
                position: absolute;
                left: 7.98%;
                top: 22.92%;
                bottom: 25%;
                font-family: PingFang SC;
                font-weight: 500;
                font-size: 18px;
                line-height: 25px;
                color: #000000;
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
