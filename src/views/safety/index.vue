<template>
    <div class="safety-content">
        <div class="custom-nav">
            <m-nav-bar title="安全点检" left-text="Back" left-arrow @click-left="goback" @click-right="gotoHistory">
                <template #left>
                    <isc-svg-icon name="iscon-arrow-left-low" size="20px"></isc-svg-icon>
                </template>
                <template #right> 历史记录 </template>
            </m-nav-bar>
        </div>

        <div class="content">
            <div class="content-title">
                <div></div>
                <div>点检内容</div>
            </div>
            <div class="content-box content-box-height">
                <div><span class="required-point">*</span>员工</div>
                <div @click="gotoPerson">
                    <div class="line-height48" :class="{ color0008: staff.personName }">
                        {{ staff.personName || '请选择' }}
                    </div>
                    <isc-svg-icon name="iscon-arrow-right-low"></isc-svg-icon>
                </div>
            </div>
            <div v-if="staff.empCode" class="content-box content-box-height">
                <div><span class="required-point">*</span>工号</div>
                <div>
                    <div class="line-height48 color0008">
                        {{ staff.empCode }}
                    </div>
                </div>
            </div>
            <div v-if="staff.postName" class="content-box content-box-height">
                <div><span class="required-point">*</span>岗位</div>
                <div>
                    <div class="line-height48 color0008">
                        {{ staff.postName }}
                    </div>
                </div>
            </div>
            <div class="content-box content-box-height">
                <div><span class="required-point">*</span>点检结果</div>
                <div @click="openFrame">
                    <div class="line-height48" :class="{ color0008: resultType != '' }">
                        {{ resultType || '请选择' }}
                    </div>
                    <isc-svg-icon name="iscon-arrow-right-low"></isc-svg-icon>
                </div>
            </div>
            <div class="content-box content-box-height">
                <div><span class="required-point">*</span>生产日期</div>
                <div class="color0008">{{ productionDate }}</div>
            </div>
            <div class="content-box content-problem">
                <div><span class="required-point">*</span>问题备注</div>
                <m-field
                    v-model="reasonDesc"
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
                :business-key="businessKey"
                business-module="安全点检"
                @isImg="isImg"
            ></uploader>
        </div>
        <div v-show="showButton" class="content-btn" :style="{ opacity: isHave() ? '1' : '0.4' }">
            <div @click="gotoSubmit">提交</div>
        </div>
        <div class="new-actionsheet">
            <m-action-sheet
                v-model="showFrame"
                :actions="actions"
                cancel-text="取消"
                description="点检结果"
                close-on-click-action
                @select="onSelect"
            />
        </div>
        <detailed-list-popup ref="detailedPopup" :detailed-obj="detailedObj"></detailed-list-popup>
        <tips-popup
            ref="popup"
            :title="tipsTitle"
            :text="tipsText"
            url="/safety/history"
            :is-back="isBack"
            @send="send"
        ></tips-popup>
    </div>
</template>

<script>
import { queryNow } from '@/utils/servicetime.js';
import { insertSafetyCheck, queryGetListByWtIdOrCheckType, queryLeanChecklist } from './service.js';
import uploader from '@/components/uploader/index.vue';
import detailedListPopup from '@/components/detailedList-popup/index.vue';
export default {
    name: 'KeepAlive',
    components: { uploader, detailedListPopup },
    data() {
        return {
            showFrame: false, //弹框
            actions: [{ name: '合格' }, { name: '不合格' }], //弹框内容列表
            staff: {}, //被点检人员信息
            reasonDesc: '', //问题备注
            resultType: '', //点检结果
            checkCode: '', //清单code
            productionDate: '', //生产日期
            businessKey: 0, //时间戳
            tipsTitle: '提交成功',
            tipsText: '',
            isUpImg: false, //是否上传图片
            isBack: false,
            detailedObj: {}, //清单数据
            isSubmit: false, //是否允许点击提交按钮(防止用户多次点击)
            showButton: true, //提交按钮显示与否
            docmHeight: document.documentElement.clientHeight, //默认屏幕高度
            showHeight: document.documentElement.clientHeight //实时屏幕高度
        };
    },
    watch: {
        staff(val) {
            if (val.id) {
                this.openShowFrame(val.postCode);
            }
        },
        showHeight() {
            if (this.docmHeight > this.showHeight) {
                this.showButton = false;
            } else {
                this.showButton = true;
            }
        }
    },
    async activated() {
        this.productionDate = await queryNow();
        this.$refs.popup.show = false;
        this.staff = localStorage.getItem('staff') ? JSON.parse(localStorage.getItem('staff')) : {};
    },
    mounted() {
        this.businessKey = new Date().getTime();
        window.onresize = () =>
            (() => {
                this.showHeight = document.body.clientHeight;
            })();
    },
    methods: {
        //安全点检清单
        async openShowFrame(postCode) {
            let newObj = await queryGetListByWtIdOrCheckType({
                wtId: JSON.parse(localStorage.getItem('organize')).id,
                checkType: '安全点检清单',
                postCode
            });
            if (!newObj) {
                this.$toast('该班组岗位未配置检查清单');
                return;
            }
            this.checkCode = newObj.checkCode;
            this.detailedObj = await queryLeanChecklist(this.checkCode);
            this.$refs.detailedPopup.show = true;
        },
        // 重置参数
        initInfo() {
            this.staff = {};
            this.resultType = '';
            this.reasonDesc = '';
            this.isUpImg = false;
            this.showButton = true;
        },
        // 判断是否填写完
        isComplete() {
            if (!this.staff.id || !this.resultType || !this.reasonDesc || !this.checkCode) {
                return true;
            }
        },
        // 判断是否存在任意一个参数
        isHave() {
            if (this.staff.id || this.resultType || this.reasonDesc || this.checkCode) {
                return true;
            }
        },
        //是否已经上传图片
        isImg(item) {
            this.isUpImg = item;
        },
        //提交新增
        async gotoSubmit() {
            if (this.isComplete()) {
                this.isBack = false;
                this.tipsTitle = '提交失败';
                this.tipsText = '有未填写或未上传的内容';
                this.$refs.popup.show = true;
                return;
            }
            let params = {
                checkCode: this.checkCode,
                empid: this.staff.id,
                resultType: this.resultType,
                reasonDesc: this.reasonDesc,
                id: this.businessKey
            };
            if (!this.isSubmit) {
                this.isSubmit = true;
                setTimeout(() => {
                    this.isSubmit = false;
                }, 1000);
                await insertSafetyCheck(params);
                this.businessKey = new Date().getTime();
                this.tipsTitle = '提交成功';
                this.tipsText = '';
                localStorage.removeItem('staff');
                this.send();
                this.$refs.popup.show = true;
            }
        },
        //前去人员选择页面
        gotoPerson() {
            this.$router.push({ path: '/contacts', query: { val: 1, title: '选择人员' } });
        },
        //打开弹框
        openFrame() {
            this.showFrame = true;
        },
        //选择某一项
        onSelect(item) {
            this.resultType = item.name;
            this.showFrame = false;
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
        //确认返回上一页面
        send() {
            this.$refs.uploader.fileList = [];
            this.initInfo();
        },
        //前去历史记录页面
        gotoHistory(item) {
            this.$router.push('/safety/history');
        },
        afterRead(file) {
            console.log(file);
        }
    }
};
</script>

<style lang="scss" scoped>
.safety-content {
    .content {
        margin: 12px 12px 0;
        border-radius: 10px;
        background: #ffffff;
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
