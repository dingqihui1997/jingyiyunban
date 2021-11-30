<template>
    <div class="contentBox">
        <div class="custom-nav">
            <m-nav-bar
                fixed
                placeholder
                :border="false"
                title="班前会议"
                @click-left="onClickLeft"
                @click-right="onClickRight"
            >
                <template #left>
                    <isc-svg-icon name="iscon-arrow-left-low" />
                </template>
                <template #right>
                    <div>历史记录</div>
                </template>
            </m-nav-bar>
        </div>
        <!-- 人员确认 -->
        <div class="checkList">
            <div class="disFlex-a infoTitle">
                <div class="patrolPlace"></div>
                <div>人员确认</div>
            </div>
            <div class="disFlex-sba patrol-infor borderBut">
                <div>人员出勤<span class="sign">*</span></div>
                <div v-if="!staffFlag" class="disFlex-ja confirmBnt" @click="staffFlag = true">点击确认</div>
                <div v-if="staffFlag" class="disFlex-ja state">
                    <img src="../../assets/image/Vector.svg" alt="" />
                </div>
            </div>
            <div class="disFlex-sba patrol-infor">
                <div>人员状态<span class="sign">*</span></div>
                <div v-if="!stateFlag" class="disFlex-ja confirmBnt" @click="stateFlag = true">点击确认</div>
                <div v-if="stateFlag" class="disFlex-ja state">
                    <img src="../../assets/image/Vector.svg" alt="" />
                </div>
            </div>
        </div>
        <!-- 会议信息 -->
        <div class="problemBox">
            <div class="disFlex-a infoTitle">
                <div class="patrolPlace"></div>
                <div>会议信息</div>
            </div>
            <div class="problem">
                <div class="problemRecord disFlex-a">
                    <div class="required-point">*</div>
                    <div>昨日总结</div>
                </div>
                <div style="min-height: 88px">
                    <m-field
                        v-model="params.summary"
                        style="padding: 0"
                        rows="2"
                        autosize
                        type="textarea"
                        maxlength="100"
                        placeholder="请输入"
                        show-word-limit
                    />
                </div>
            </div>
            <div class="problem">
                <div class="problemRecord disFlex-a">
                    <div class="required-point">*</div>
                    <div>今日安排</div>
                </div>
                <div style="min-height: 88px">
                    <m-field
                        v-model="params.workContent"
                        style="padding: 0"
                        rows="2"
                        autosize
                        type="textarea"
                        maxlength="100"
                        placeholder="请输入"
                        show-word-limit
                    />
                </div>
            </div>
            <div class="disFlex-sba patrol-infor">
                <div><span class="required-point">*</span>日期</div>
                <div class="disFlex-a">{{ time }}</div>
            </div>
            <uploader
                ref="uploader1"
                up-type="img"
                is-top="1"
                img-title="上传任务单"
                :business-key="params.id"
                business-module="任务单照片"
                @isImg="isImg1"
            ></uploader>
            <div class="disFlex-sba patrol-infor">
                <div>信息通告<span class="sign">*</span></div>
                <div v-if="!inforFlag" class="disFlex-ja confirmBnt" @click="inforFlag = true">点击确认</div>
                <div v-if="inforFlag" class="disFlex-ja state">
                    <img src="../../assets/image/Vector.svg" alt="" />
                </div>
            </div>
        </div>
        <!-- 人员互动 -->
        <div class="interact">
            <div class="disFlex-a infoTitle">
                <div class="patrolPlace"></div>
                <div>人员互动</div>
            </div>
            <div class="disFlex-sba patrol-infor borderBut">
                <div>
                    <span class="required-point">*</span>
                    人员
                </div>
                <div class="disFlex-a" @click="onClick">
                    <span :class="staff.personName ? 'color0cc' : 'color0006'">{{ staff.personName || '请选择' }}</span>
                    <isc-svg-icon name="iscon-arrow-right-low" color="#00000066"></isc-svg-icon>
                </div>
            </div>
            <div class="disFlex-sba patrol-infor borderBut">
                <div><span class="required-point">*</span>互动模式</div>
                <div class="disFlex-a" @click="openPopup(0)">
                    <span :class="params.interactiveType ? 'color0cc' : 'color0006'">{{
                        params.interactiveType || '请选择'
                    }}</span>
                    <isc-svg-icon name="iscon-arrow-right-low" color="#00000066"></isc-svg-icon>
                </div>
            </div>
            <div class="disFlex-sba patrol-infor">
                <div><span class="required-point">*</span>互动评价</div>
                <div class="disFlex-a" @click="openPopup(1)">
                    <span :class="params.assessType ? 'color0cc' : 'color0006'">{{
                        params.assessType || '请选择'
                    }}</span>
                    <isc-svg-icon name="iscon-arrow-right-low" color="#00000066"></isc-svg-icon>
                </div>
            </div>
            <uploader
                ref="uploader2"
                up-type="img"
                :business-key="params.id"
                business-module="互动照片"
                img-title="互动拍照"
                @isImg="isImg"
            ></uploader>
            <uploader
                ref="uploader"
                up-type="video"
                :business-key="params.id"
                business-module="会议视频"
                video-title="上传会议视频"
                @isVideo="isvideo"
            ></uploader>
        </div>
        <div v-show="showButton" class="my-Submit-bnt">
            <div class="Submit-bnt disFlex-ja" :class="isKeep() ? '' : 'opacity'" @click="Submit">提交</div>
        </div>
        <div class="new-actionsheet">
            <m-action-sheet
                v-model="show"
                :description="popupTitle"
                :actions="actions"
                cancel-text="取消"
                close-on-click-action
                @cancel="show = false"
                @select="onSelect"
            />
        </div>
        <tips-popup
            ref="popup"
            :title="Title"
            url="/meetingHistory"
            :text="tipsText"
            :is-back="isBack"
            @send="send"
        ></tips-popup>
    </div>
</template>

<script>
import { queryNow } from '@/utils/servicetime.js';
import { insertLeanMorningMeeting } from './service';
import uploader from '../../components/uploader/index.vue';
export default {
    name: 'KeepAlive',
    components: { uploader },
    data() {
        return {
            show: false,
            Title: '', //提交状态确认
            tipsText: '',
            time: '',
            actions: [],
            popupTitle: '',
            staff: {}, //互动人员信息
            evaluateList: [{ name: '合格' }, { name: '不合格' }],
            interactList: [{ name: '问答' }, { name: '分享' }, { name: '表扬' }, { name: '批评' }],
            isUpImg: false, //是否上传图片
            isOnImg: false,
            isUpvideo: false,
            isBack: false,
            params: {
                assessType: '', //互动评价
                createdBy: '', //创建人id
                empid: '', //互动人员id
                empidOrgid: '', //互动人员组织机构 wid
                interactiveType: '', //互动模式-数据字典
                summary: '', //昨日总结
                workContent: '', //今日安排
                wtId: '', //班组id
                id: 0 //上传图片视频
            },
            staffFlag: false, //人员确认
            inforFlag: false, //信息确认
            stateFlag: false,
            isSubmit: false,
            showButton: true,
            docmHeight: document.documentElement.clientHeight, //默认屏幕高度
            showHeight: document.documentElement.clientHeight //实时屏幕高度
        };
    },
    watch: {
        showHeight(val) {
            if (this.docmHeight > val) {
                this.showButton = false;
            } else {
                this.showButton = true;
            }
        }
    },
    async activated() {
        this.$refs.popup.show = false;
        this.staff = localStorage.getItem('staff') ? JSON.parse(localStorage.getItem('staff')) : {};
        this.time = await queryNow();
        this.params.wtId = localStorage.getItem('organize') ? JSON.parse(localStorage.getItem('organize')).id : '';
    },
    mounted() {
        this.params.id = new Date().getTime();
        window.onresize = () =>
            (() => {
                this.showHeight = document.body.clientHeight;
            })();
    },
    methods: {
        onClickRight() {
            this.$router.push('/meetingHistory');
        },
        onClickLeft() {
            if (this.isKeep()) {
                this.isBack = true;
                this.Title = '提示';
                this.tipsText = '有未保存的内容,请注意数据丢失';
                this.$refs.popup.show = true;
            } else {
                this.$router.go(-1);
            }
        },
        //确认返回上一页面
        send() {
            this.Reset();
        },
        Reset() {
            this.$refs.uploader1.fileList = [];
            this.$refs.uploader2.fileList = [];
            this.$refs.uploader.videoList = [];
            this.params = {
                assessType: '', //互动评价
                createdBy: '', //创建人id
                empid: '', //互动人员id
                empidOrgid: '', //互动人员组织机构 wid
                interactiveType: '', //互动模式-数据字典
                summary: '', //昨日总结
                workContent: '', //今日安排
                wtId: '', //班组id
                id: 0 //上传图片视频
            };
            this.staffFlag = false; //人员确认
            this.inforFlag = false; //信息确认
            this.stateFlag = false;
            this.isUpImg = false;
            this.isOnImg = false;
            this.isUpvideo = false;
            this.showButton = true;
        },
        //互动拍照
        isImg(val) {
            this.isOnImg = val;
        },
        //图片上传
        isImg1(val) {
            this.isUpImg = val;
        },
        isvideo(val) {
            this.isUpvideo = val;
        },
        openPopup(num) {
            if (!num) {
                this.actions = this.interactList;
                this.popupTitle = '互动模式';
            } else {
                this.actions = this.evaluateList;
                this.popupTitle = '互动评价';
            }
            this.show = true;
        },
        // 选择状况
        onSelect(e) {
            this.popupTitle === '互动模式' ? (this.params.interactiveType = e.name) : (this.params.assessType = e.name);
        },
        // 选择人员
        onClick() {
            this.$router.push({ path: '/contacts', query: { val: 1, title: '选择人员' } });
        },
        // 填写完成
        isSuccess() {
            if (
                this.params.assessType &&
                this.staff.wtId &&
                this.params.interactiveType &&
                this.params.workContent &&
                this.params.id &&
                this.staffFlag &&
                this.inforFlag &&
                this.stateFlag
            ) {
                return true;
            }
        },
        isKeep() {
            if (
                this.params.assessType ||
                this.staff.wtId ||
                this.params.interactiveType ||
                this.params.workContent ||
                this.isUpImg ||
                this.isOnImg ||
                this.isUpvideo ||
                this.staffFlag ||
                this.inforFlag ||
                this.stateFlag
            ) {
                return true;
            }
        },
        // 提交
        async Submit() {
            this.params.empid = this.staff.id;
            this.params.empidOrgid = this.staff.wtId;
            if (this.isSuccess()) {
                if (!this.isSubmit) {
                    this.isSubmit = true;
                    let res = await insertLeanMorningMeeting(this.params);
                    this.isSubmit = false;
                    this.Title = '提交成功';
                    this.tipsText = '';
                    this.Reset();
                    this.params.id = new Date().getTime();
                    localStorage.removeItem('staff');
                }
            } else {
                this.isBack = false;
                this.Title = '提交失败';
                this.tipsText = '有未填写或未上传的内容';
            }
            this.$refs.popup.show = true;
        }
    }
};
</script>

<style lang="scss" scoped>
.sign {
    color: #ff5555;
    margin-left: 5px;
    position: relative;
    top: 5px;
}
.checkList {
    width: 351px;
    height: 156px;
    background: #ffffff;
    border-radius: 10px;
    margin: 12px;
}
.infoTitle {
    height: 48px;
    padding-left: 12px;
}
.problemBox {
    width: 351px;
    min-height: 580px;
    background: #ffffff;
    border-radius: 10px;
    margin: 12px;
}
.problem {
    padding: 0 12px;
    border-bottom: 1px solid #eee;
}
.problemRecord {
    height: 48px;
    color: #000000b2;
}

.patrolInfor {
    width: 351px;
    height: 736px;
    margin: 12px;
    background: #ffffff;
    border-radius: 10px;
}
.patrol-infor {
    div:first-child {
        color: #000000b2;
    }
}
.contentBox {
    height: calc(100vh - 100px);
    overflow-y: overlay;
}
.confirmBnt {
    width: 72px;
    height: 32px;
    background: #479aff;
    border-radius: 4px;
    color: #ffffff;
    font-size: 12px;
}
.state {
    width: 72px;
    height: 32px;
    background: rgba(71, 154, 255, 0.2);
    border-radius: 4px;
}
.state1 {
    width: 72px;
    height: 32px;
    background: rgba(252, 179, 6, 0.2);
    border-radius: 4px;
}
.interact {
    width: 351px;
    min-height: 508px;
    background: #ffffff;
    border-radius: 10px;
    margin: 12px;
}
.borderBut {
    border-bottom: 1px solid #eee;
}
.opacity {
    opacity: 0.4;
}
.isc-svg-icon {
    margin-left: 8px !important;
}
</style>
