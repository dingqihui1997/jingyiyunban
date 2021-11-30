<template>
    <div class="kyt-content">
        <div class="custom-nav">
            <m-nav-bar
                fixed
                title="KYT活动"
                left-text="Back"
                left-arrow
                @click-left="goback"
                @click-right="gotoHistory"
            >
                <template #left>
                    <isc-svg-icon name="iscon-arrow-left-low" size="20px"></isc-svg-icon>
                </template>
                <template #right> 历史记录 </template>
            </m-nav-bar>
        </div>
        <div class="page-height-btn">
            <div class="content">
                <div class="content-title">
                    <div></div>
                    <div>活动内容</div>
                </div>
                <div class="content-box content-box-height disFlex-a">
                    <!-- <div>活动主题</div>
                    <input type="text" placeholder="请输入" /> -->
                    <span class="required-point">*</span>
                    <m-field
                        v-model="params.activityName"
                        label-class="theme"
                        label="活动主题"
                        placeholder="请输入"
                        input-align="right"
                    />
                </div>
                <div class="content-box content-problem">
                    <div><span class="required-point">*</span>活动内容</div>
                    <m-field
                        v-model="params.activityContent"
                        rows="3"
                        autosize
                        type="textarea"
                        maxlength="100"
                        placeholder="请输入"
                        show-word-limit
                        style="padding: 0"
                    />
                </div>
                <div class="content-box content-box-height">
                    <div><span class="required-point">*</span>活动日期</div>
                    <div class="color0008">{{ activityDate }}</div>
                </div>
            </div>
            <div class="content">
                <div class="content-title">
                    <div></div>
                    <div>人员互动</div>
                </div>
                <div class="content-box content-box-height">
                    <div><span class="required-point">*</span>人员</div>
                    <div @click="gotoPerson">
                        <div class="line-height48" :class="{ color0008: staff.personName }">
                            {{ staff.personName || '请选择' }}
                        </div>
                        <isc-svg-icon name="iscon-arrow-right-low"></isc-svg-icon>
                    </div>
                </div>
                <div class="content-box content-box-height">
                    <div><span class="required-point">*</span>互动模式</div>
                    <div @click="openFrame(1)">
                        <div class="line-height48" :class="{ color0008: params.interactiveType != '' }">
                            {{ params.interactiveType || '请选择' }}
                        </div>
                        <isc-svg-icon name="iscon-arrow-right-low"></isc-svg-icon>
                    </div>
                </div>
                <div class="content-box content-box-height">
                    <div><span class="required-point">*</span>互动评价</div>
                    <div @click="openFrame(2)">
                        <div class="line-height48" :class="{ color0008: params.assessType != '' }">
                            {{ params.assessType || '请选择' }}
                        </div>
                        <isc-svg-icon name="iscon-arrow-right-low"></isc-svg-icon>
                    </div>
                </div>
                <uploader
                    ref="uploader"
                    up-type="img"
                    is-top="2"
                    :business-key="businessKey"
                    business-module="KYT活动"
                    img-title="互动拍照"
                    @isImg="isImg"
                ></uploader>
                <div class="content-box content-problem">
                    <div><span class="required-point">*</span>活动输出</div>
                    <m-field
                        v-model="params.activityInput"
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
                    ref="uploader1"
                    up-type="video"
                    is-top="2"
                    is-btm="2"
                    video-title="上传会议视频"
                    :business-key="businessKey"
                    business-module="KYT活动"
                    @isVideo="isVideo"
                ></uploader>
            </div>
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
            url="/Kyt/history"
            :is-back="isBack"
            @send="send"
        ></tips-popup>
    </div>
</template>

<script>
import { queryNow } from '@/utils/servicetime.js';
import { insertLeanKytActivity } from './service';
import uploader from '../../components/uploader/index.vue';
export default {
    name: 'KeepAlive',
    components: { uploader },
    data() {
        return {
            showFrame: false, //互动模式评价弹框
            actions: [], //弹框内容列表
            description: '互动模式', //弹框标题
            modelList: [{ name: '问答' }, { name: '分享' }, { name: '表扬' }, { name: '批评' }], //模式内容列表
            evaluateList: [{ name: '合格' }, { name: '不合格' }], //评价内容列表
            activityDate: '', //活动日期
            staff: {}, //人员信息
            params: {
                activityName: '', //活动主题
                activityContent: '', //活动内容
                empid: '', //人员id
                interactiveType: '', //活动模式
                assessType: '', //活动评价
                activityInput: '', //活动输出
                id: '' //时间戳
            },
            businessKey: 0, //时间戳
            tipsTitle: '提交成功',
            tipsText: '',
            isUpImg: false, //是否上传图片
            isUpVideo: false, //是否上传视频
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
    async activated() {
        this.activityDate = await queryNow();
        this.$refs.popup.show = false;
        this.staff = localStorage.getItem('staff') ? JSON.parse(localStorage.getItem('staff')) : {};
    },
    created() {
        this.actions = this.modelList;
    },
    mounted() {
        this.businessKey = new Date().getTime();
        window.onresize = () =>
            (() => {
                this.showHeight = document.body.clientHeight;
            })();
    },
    methods: {
        //获取焦点时
        focusInput() {
            this.showButton = false;
        },
        //失去焦点时
        blurInput() {
            this.showButton = true;
        },
        // 重置参数
        initInfo() {
            this.staff = {};
            this.params = {
                activityName: '', //活动主题
                activityContent: '', //活动内容
                empid: '', //人员id
                interactiveType: '', //活动模式
                assessType: '', //活动评价
                activityInput: '', //活动输出
                id: '' //时间戳
            };
            this.isUpImg = false;
            this.isUpVideo = false;
        },
        // 判断是否填写完
        isComplete() {
            if (
                !this.staff.id ||
                !this.params.activityName ||
                !this.params.activityContent ||
                !this.params.interactiveType ||
                !this.params.assessType ||
                !this.params.activityInput
            ) {
                return true;
            }
        },
        // 判断是否存在任意一个参数
        isHave() {
            if (
                this.staff.id ||
                this.params.activityName ||
                this.params.activityContent ||
                this.params.interactiveType ||
                this.params.assessType ||
                this.params.activityInput
            ) {
                return true;
            }
        },
        //是否已经上传视频
        isVideo(item) {
            this.isUpVideo = item;
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
            this.params.empid = this.staff.id;
            this.params.id = this.businessKey;
            if (!this.isSubmit) {
                this.isSubmit = true;
                setTimeout(() => {
                    this.isSubmit = false;
                }, 1000);
                await insertLeanKytActivity(this.params);
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
        openFrame(num) {
            this.actions = num == 1 ? this.modelList : this.evaluateList;
            this.description = num == 1 ? '互动模式' : '互动评价';
            this.showFrame = true;
        },
        //选择某一项
        onSelect(item) {
            if (this.description == '互动模式') {
                this.params.interactiveType = item.name;
            } else {
                this.params.assessType = item.name;
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
            this.$refs.uploader1.videoList = [];
            this.initInfo();
        },
        //前去历史记录页面
        gotoHistory(item) {
            this.$router.push('/Kyt/history');
        },
        afterRead(file) {
            console.log(file);
        }
    }
};
</script>
<style lang="scss">
.kyt-content {
    .theme {
        font-family: PingFang SC;
        font-style: normal;
        font-weight: normal;
        font-size: 16px !important;
        color: rgba(0, 0, 0, 0.7);
    }
    .m-cell {
        padding: 0;
        background: #fff0;
    }
}
</style>
<style lang="scss" scoped>
.kyt-content {
    .content {
        margin: 12px 12px 0;
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
