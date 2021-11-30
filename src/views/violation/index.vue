<template>
    <div class="violation-content">
        <div class="custom-nav">
            <m-nav-bar title="违规记录" left-text="Back" left-arrow @click-left="goback" @click-right="gotoHistory">
                <template #left>
                    <isc-svg-icon name="iscon-arrow-left-low" size="20px"></isc-svg-icon>
                </template>
                <template #right> 历史记录 </template>
            </m-nav-bar>
        </div>

        <div class="content">
            <div class="content-title">
                <div></div>
                <div>违规内容</div>
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
                <div>岗位</div>
                <div>
                    <div class="line-height48 color0008">
                        {{ staff.postName }}
                    </div>
                </div>
            </div>
            <div class="content-box content-box-height">
                <div><span class="required-point">*</span>违规类型</div>
                <div @click="openFrame(1)">
                    <div class="line-height48" :class="{ color0008: illegalType != '' }">
                        {{ illegalType || '请选择' }}
                    </div>
                    <isc-svg-icon name="iscon-arrow-right-low"></isc-svg-icon>
                </div>
            </div>
            <div class="content-box content-box-height">
                <div><span class="required-point">*</span>上报类型</div>
                <div @click="openFrame(2)">
                    <div class="line-height48" :class="{ color0008: submitType != '' }">
                        {{ submitType || '请选择' }}
                    </div>
                    <isc-svg-icon name="iscon-arrow-right-low"></isc-svg-icon>
                </div>
            </div>
            <div class="content-box content-problem">
                <div><span class="required-point">*</span>备注</div>
                <m-field
                    v-model="illegalDesc"
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
                business-module="违规记录"
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
                :description="description"
                close-on-click-action
                @select="onSelect"
            />
        </div>
        <tips-popup
            ref="popup"
            :title="tipsTitle"
            :text="tipsText"
            url="/violation/history"
            :is-back="isBack"
            @send="send"
        ></tips-popup>
    </div>
</template>

<script>
import { insertLeanIllegalRecord } from './service';
import uploader from '../../components/uploader/index.vue';
export default {
    name: 'KeepAlive',
    components: { uploader },
    data() {
        return {
            showFrame: false, //互动模式评价弹框
            actions: [], //弹框内容列表
            description: '违规类型', //弹框标题
            violationList: [
                { name: '不服从安排' },
                { name: '影响团结' },
                { name: '出勤异常' },
                { name: '违法劳动纪律' },
                { name: '其他' }
            ], //模式内容列表
            reportList: [{ name: '组内上报' }, { name: '组外上报' }], //评价内容列表
            staff: {}, //违规人员信息
            illegalType: '', // 违规类型
            submitType: '', //上报类型
            illegalDesc: '', //违规信息描述
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
    },
    created() {
        this.actions = this.violationList;
    },
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
            this.illegalType = '';
            this.submitType = '';
            this.illegalDesc = '';
            this.isUpImg = false;
            this.showButton = true;
        },
        // 判断是否填写完
        isComplete() {
            if (!this.staff.id || !this.illegalDesc || !this.illegalType || !this.submitType) {
                return true;
            }
        },
        // 判断是否存在任意一个参数
        isHave() {
            if (this.staff.id || this.illegalDesc || this.illegalType || this.submitType) {
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
                this.tipsTitle = '提交失败';
                this.tipsText = '有未填写或未上传的内容';
                this.$refs.popup.show = true;
                return;
            }
            let params = {
                empid: this.staff.id,
                illegalDesc: this.illegalDesc,
                illegalType: this.illegalType,
                submitType: this.submitType,
                id: this.businessKey
            };
            if (!this.isSubmit) {
                this.isSubmit = true;
                setTimeout(() => {
                    this.isSubmit = false;
                }, 1000);
                await insertLeanIllegalRecord(params);
                this.businessKey = new Date().getTime();
                this.isBack = false;
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
        openFrame(num) {
            this.actions = num == 1 ? this.violationList : this.reportList;
            this.description = num == 1 ? '违规类型' : '上报类型';
            this.showFrame = true;
        },
        //选择某一项
        onSelect(item) {
            if (this.description == '违规类型') {
                this.illegalType = item.name;
            } else {
                this.submitType = item.name;
            }
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
            this.$router.push('/violation/history');
        },
        afterRead(file) {
            console.log(file);
        }
    }
};
</script>

<style lang="scss" scoped>
.violation-content {
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
