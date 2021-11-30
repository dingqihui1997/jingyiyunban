<template>
    <div>
        <div class="patrolInfor">
            <div>
                <div class="disFlex-a patrolBox">
                    <div class="patrolPlace"></div>
                    <div>检查信息</div>
                </div>
                <div>
                    <div class="disFlex-sba patrol-infor bottom">
                        <div class="disFlex-a"><span class="required-point">*</span>检查人</div>
                        <div class="disFlex-a" @click="gotocontacts(1, '选择检查人')">
                            <span :class="person.personName ? 'color0cc' : 'color0006'">{{
                                person.personName ? person.personName : '请选择'
                            }}</span>
                            <isc-svg-icon name="iscon-arrow-right-low" color="#00000066"></isc-svg-icon>
                        </div>
                    </div>
                    <div class="disFlex-sba patrol-infor bottom" @click="show = true">
                        <div class="disFlex-a"><span class="required-point">*</span>现场状况</div>
                        <div class="disFlex-a">
                            <span :class="params.conditionType ? 'color0cc' : 'color0006'">{{
                                params.conditionType ? params.conditionType : '请选择'
                            }}</span>
                            <isc-svg-icon name="iscon-arrow-right-low" color="#00000066"></isc-svg-icon>
                        </div>
                    </div>
                    <div class="disFlex-sba patrol-infor bottom">
                        <div><span class="required-point">*</span>日期</div>
                        <div class="disFlex-a color0cc">{{ time }}</div>
                    </div>
                    <div v-if="params.conditionType == '异常'" class="problem">
                        <div class="problemRecord disFlex-a"><span class="required-point">*</span>问题记录</div>
                        <div class="fontSize16">
                            <m-field
                                v-model="params.problemDesc"
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
                    <div
                        v-if="params.conditionType == '异常'"
                        class="dutyBox disFlex-sba"
                        @click="gotocontacts(0, '选择责任人')"
                    >
                        <div class="color0B2 disFlex-a"><span class="required-point">*</span>责任人</div>
                        <div class="disFlex-a">
                            <div v-if="personList.length" class="patrolItem disFlex-w color0cc">
                                <div v-for="(item, index) in personList" :key="index" class="disFlex-a">
                                    <div class="patrolNameItem">{{ item.personName }}</div>
                                    <div class="personLine">|</div>
                                </div>
                            </div>
                            <div v-if="!personList.length" class="color0006 disFlex-a">请选择</div>
                            <div class="disFlex-a">
                                <isc-svg-icon name="iscon-arrow-right-low" color="#00000066"></isc-svg-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <uploader
                ref="uploader"
                :up-type="upType"
                is-btm="2"
                :business-key="params.id"
                business-module="早上巡检信息"
                @isImg="isImg"
                @isVideo="isVideo"
            ></uploader>
        </div>
        <div style="height: 45px"></div>
        <div v-show="showButton" class="my-Submit-bnt">
            <div class="Submit-bnt disFlex-ja" :class="isKeep() ? '' : 'opacity'" @click="Submit">提交</div>
        </div>
        <m-action-sheet
            v-model="show"
            description="现场状况"
            :actions="actions"
            cancel-text="取消"
            close-on-click-action
            @select="onSelect"
        />
        <tips-popup ref="popup" :title="popupTitle" :text="popupText" url="/morningPatrolHistory"></tips-popup>
    </div>
</template>

<script>
import { queryNow } from '@/utils/servicetime.js';
import uploader from '@/components/uploader/index.vue';
import { insertInspectionRecord, queryGetListByWtIdOrCheckType } from '../service.js';
export default {
    name: '',
    components: { uploader },
    props: {
        flag: {
            typeof: Boolean
        }
    },
    data() {
        return {
            show: false,
            popupTitle: '',
            popupText: '',
            actions: [{ name: '正常' }, { name: '异常' }],
            time: '',
            person: {}, //检查人信息
            personList: [], //责任人
            isUpImg: false,
            isUpVideo: false,
            params: {
                checkCode: '',
                checkEmpid: '',
                conditionType: '',
                problemDesc: '', //问题记录
                respEmpid: '',
                id: 0
            },
            isSubmit: false, //是否允许点击提交按钮
            upType: 'video',
            showButton: true, //提交按钮显示与否
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
        this.time = await queryNow();
        this.person = localStorage.getItem('staff') ? JSON.parse(localStorage.getItem('staff')) : {};
        this.personList = localStorage.getItem('staffList') ? JSON.parse(localStorage.getItem('staffList')) : [];
        let wtId = localStorage.getItem('organize') ? JSON.parse(localStorage.getItem('organize')).id : ''; //班主id
        this.params.checkCode = await queryGetListByWtIdOrCheckType({
            //获取检查清单通过班组id或者清单类型
            wtId: wtId,
            checkType: '早上巡检清单',
            postCode: ''
        });
    },
    async mounted() {
        this.params.id = new Date().getTime();
        window.onresize = () =>
            (() => {
                this.showHeight = document.body.clientHeight;
            })();
    },
    //返回当前页面
    deactivated() {
        if (this.flag) {
            this.Reset();
        }
    },
    methods: {
        // 清空表单
        Reset() {
            this.$refs.uploader.fileList = [];
            this.$refs.uploader.videoList = [];
            this.params = {
                checkCode: '',
                checkEmpid: '',
                conditionType: '',
                problemDesc: '', //问题记录
                respEmpid: '',
                id: 0
            };
            this.isUpImg = false;
            this.isUpVideo = false;
            localStorage.removeItem('staff');
            localStorage.removeItem('staffList');
            this.person = {};
            this.personList = {};
            this.upType = 'video';
            this.showButton = true;
        },
        isImg(val) {
            //上传图片成功
            this.isUpImg = val;
        },
        isVideo(val) {
            this.isUpVideo = val;
        },
        // 选择现场状况弹框
        onSelect(e) {
            this.params.conditionType = e.name;
            e.name == '异常' ? (this.upType = 'all') : (this.upType = 'video');
        },
        //选择/检查人单选1责任人多选0
        gotocontacts(val, title) {
            this.$router.push({ path: '/contacts', query: { val: val, title: title } });
        },
        // 判断是否填写完毕
        isSuccess() {
            if (this.params.conditionType == '异常') {
                if (this.person.id && this.params.problemDesc && this.params.conditionType && this.personList.length) {
                    return true;
                }
            } else {
                //正常
                if (this.person.id && this.params.conditionType) {
                    return true;
                }
            }
        },
        isKeep() {
            if (
                this.person.id ||
                this.params.problemDesc ||
                this.params.conditionType ||
                this.personList.length ||
                this.isUpImg ||
                this.isUpVideo
            ) {
                return true;
            }
        },
        //提交
        async Submit() {
            if (this.isSuccess()) {
                if (!this.isSubmit) {
                    if (this.params.conditionType == '异常') {
                        let str = '';
                        this.personList.map((item) => {
                            str += `${item.id},`;
                        });
                        this.params.respEmpid = str.substring(0, str.length - 1); //责任人
                    } else {
                        this.params.respEmpid = '';
                    }
                    this.isSubmit = true;
                    this.params.checkEmpid = this.person.id; //检查人id
                    await insertInspectionRecord(this.params);
                    this.isSubmit = false;
                    this.popupTitle = '提交成功';
                    this.popupText = '';
                    this.Reset();
                    this.params.id = new Date().getTime();
                }
            } else {
                this.popupTitle = '提交失败';
                this.popupText = '有未填写的内容';
            }
            this.$refs.popup.show = true;
        }
    }
};
</script>

<style lang="scss" scoped>
.patrol-infor {
    div:first-child {
        color: #000000b2;
    }
}
.isc-svg-icon {
    margin-left: 8px;
}
.patrolInfor {
    width: 351px;
    margin: 12px;
    background: #ffffff;
    border-radius: 10px;
}
.patrolBox {
    padding-left: 12px;
    height: 48px;
}
.problem {
    padding: 0 12px;
    border-bottom: 1px solid #eee;
    flex-direction: column;
    padding-bottom: 10px;
}
.problemRecord {
    height: 48px;
    color: #000000b2;
}
.dutyBox {
    min-height: 48px;
    padding: 0 12px;
}
.bottom {
    border-bottom: 1px solid #eee;
}
.patrolItem {
    width: 220px;
    display: flex;
    justify-content: flex-end;
}
.personLine {
    padding: 0 3px;
}
.opacity {
    opacity: 0.4;
}
</style>
