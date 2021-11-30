<template>
    <div>
        <div class="custom-nav">
            <m-nav-bar
                fixed
                placeholder
                :border="false"
                title="调岗申请"
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
        <div class="contentBox">
            <div class="disFlex-a infoTitle">
                <div class="patrolPlace"></div>
                <div>申请内容</div>
            </div>
            <div>
                <div class="disFlex-sba patrol-infor borderBottom">
                    <div><span class="required-point">*</span>员工</div>
                    <div class="disFlex-a" @click="onClick">
                        <span :class="staff.personName ? 'color0cc' : 'color0006'">{{
                            staff.personName || '请选择'
                        }}</span>
                        <isc-svg-icon name="iscon-arrow-right-low" color="#00000066"></isc-svg-icon>
                    </div>
                </div>
                <div v-if="staff.empCode" class="disFlex-sba patrol-infor borderBottom">
                    <div>工号</div>
                    <div class="disFlex-a color0cc">
                        <span>{{ staff.empCode }}</span>
                    </div>
                </div>
                <div v-if="staff.postName" class="disFlex-sba patrol-infor borderBottom">
                    <div>原岗位</div>
                    <div class="disFlex-a" style="color: #00000066">
                        <span class="color0cc">{{ staff.postName }}</span>
                    </div>
                </div>
                <div class="disFlex-sba patrol-infor borderBottom">
                    <div><span class="required-point">*</span>新岗位</div>
                    <div class="disFlex-a" @click="gotoPostList">
                        <span :class="newPost.postName ? 'color0cc' : 'color0006'">{{
                            newPost.postName || '请选择'
                        }}</span>
                        <isc-svg-icon name="iscon-arrow-right-low" color="#00000066"></isc-svg-icon>
                    </div>
                </div>
                <div class="disFlex-sba patrol-infor">
                    <div class="color0006">调岗时间</div>
                </div>
                <div class="disFlex-sba patrol-infor">
                    <div><span class="required-point">*</span>开始时间</div>
                    <div class="disFlex-a color0006" @click="openTime(1)">
                        <span :class="params.changeTime ? 'color0cc' : 'color0006'">{{
                            params.changeTime || '请选择'
                        }}</span>
                        <isc-svg-icon name="iscon-arrow-right-low"></isc-svg-icon>
                    </div>
                </div>
                <div class="disFlex-sba patrol-infor borderBottom">
                    <div><span class="required-point">*</span>结束时间</div>
                    <div class="disFlex-a color0006" @click="openTime(0)">
                        <div :class="params.changeEndtime ? 'color0cc' : 'color0006'">
                            {{ params.changeEndtime || '请选择' }}
                        </div>
                        <isc-svg-icon name="iscon-arrow-right-low"></isc-svg-icon>
                    </div>
                </div>
                <div class="problem">
                    <div class="problemRecord disFlex-a patrol-infor">
                        <span class="required-point">*</span>原因备注
                    </div>
                    <div style="min-height: 88px">
                        <m-field
                            v-model="params.reasonDesc"
                            rows="2"
                            autosize
                            type="textarea"
                            maxlength="100"
                            placeholder="请输入"
                            show-word-limit
                        />
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showButton" class="my-Submit-bnt">
            <div class="Submit-bnt disFlex-ja" :class="isKeep() ? '' : 'opacity'" @click="Submit">提交</div>
        </div>
        <m-popup v-model="show" position="bottom " round>
            <the-apply-date ref="popup" :time-type="timeType" :min-time="minTime" @send="send"></the-apply-date>
        </m-popup>
        <tips-popup
            ref="tips"
            :text="tipsText"
            :title="tipsTitle"
            url="/applyHistory"
            :is-back="isBack"
            @send="goBack"
        ></tips-popup>
    </div>
</template>
<script>
import TheApplyDate from './components/the-apply-date.vue';
import { dateStringify } from '@isyscore/utils/date';
import { insertChangePostApply } from './service';
export default {
    name: 'KeepAlive',
    components: { TheApplyDate },
    data() {
        return {
            show: false,
            timeType: 0,
            minTime: {
                minhour: 0,
                minMinute: 0,
                minDate: new Date() //最小日期
            },
            startTime: {
                date: null,
                time: ''
            },
            endTime: {
                date: '',
                time: ''
            },
            staff: {}, //员工
            newPost: {}, //新岗位
            tipsTitle: '',
            tipsText: '有未填写或未上传的内容',
            isBack: false,
            params: {
                reasonDesc: '', //原因备注
                changeEndtime: '', //结束时间
                changeTime: '' ////开始时间
            },
            isSubmit: false, //是否允许点击提交按钮
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
    activated() {
        this.$refs.tips.show = false;
        this.staff = localStorage.getItem('staff') ? JSON.parse(localStorage.getItem('staff')) : {};
        this.newPost = localStorage.getItem('newPost') ? JSON.parse(localStorage.getItem('newPost')) : {};
    },
    mounted() {
        window.onresize = () =>
            (() => {
                this.showHeight = document.body.clientHeight;
            })();
    },
    methods: {
        onClickLeft() {
            if (this.isKeep()) {
                this.isBack = true;
                this.tipsTitle = '提示';
                this.tipsText = '有未保存的内容,请注意数据丢失';
                this.$refs.tips.show = true;
            } else {
                this.$router.go(-1);
            }
        },
        //清空表单
        Reset() {
            this.params = {};
            this.newPost = {};
            this.staff = {};
            localStorage.removeItem('newPost');
            localStorage.removeItem('staff');
            this.showButton = true;
        },
        // 确认返回
        goBack() {
            this.Reset();
        },
        onClickRight() {
            this.$router.push('/applyHistory');
        },
        // 选择员工
        onClick() {
            this.$router.push({ path: '/contacts', query: { val: 1, title: '选择人员' } });
        },
        // 选择新岗位
        gotoPostList() {
            if (this.staff.id) {
                this.$router.push({ path: '/postList', query: { id: this.staff.id } });
            } else {
                this.$toast('请先选择员工');
            }
        },
        //选择时间弹框
        openTime(num) {
            this.timeType = num;
            if (num) {
                //选择开始时间
                this.show = true;
                this.minTime.minDate = new Date();
            } else {
                //结束时间
                if (this.startTime.date) {
                    this.show = true;
                    this.minTime.minDate = this.startTime.date;
                } else {
                    this.$toast('请先选择开始时间');
                }
            }
        },
        // 确认时间
        send(val) {
            this.show = false;
            if (this.timeType) {
                //开始时间
                this.startTime = val;
                this.params.changeTime =
                    dateStringify(this.startTime.date, 'YYYY-MM-DD') + ` ${this.startTime.time}:00`;
            } else {
                //结束时间
                this.endTime = val;
                this.params.changeEndtime = dateStringify(this.endTime.date, 'YYYY-MM-DD') + ` ${this.endTime.time}:00`;
            }
        },
        isSuccess() {
            if (
                this.staff.id &&
                this.params.changeEndtime &&
                this.params.changeTime &&
                this.newPost.postName &&
                this.params.reasonDesc
            ) {
                return true;
            }
        },
        isKeep() {
            if (
                this.staff.id ||
                this.params.changeEndtime ||
                this.params.changeTime ||
                this.newPost.postName ||
                this.params.reasonDesc
            ) {
                return true;
            }
        },
        // 确认提交
        async Submit() {
            this.isBack = false;
            if (this.isSuccess()) {
                if (!this.isSubmit) {
                    this.isSubmit = true;
                    this.params.newPostCode = this.newPost.postCode;
                    this.params.empid = this.staff.id;
                    await insertChangePostApply(this.params);
                    this.isSubmit = false;
                    this.Reset();
                    this.tipsText = '';
                    this.tipsTitle = '提交成功';
                    this.$refs.tips.show = true;
                }
            } else {
                this.tipsText = '有未填写或未上传的内容';
                this.tipsTitle = '提交失败';
                this.$refs.tips.show = true;
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.contentBox {
    width: 351px;
    background: #ffffff;
    border-radius: 10px;
    margin: 12px;
}
.patrol-infor {
    color: #000000b2;
}
.infoTitle {
    height: 48px;
    padding-left: 10px;
}
.borderBottom {
    border-bottom: 1px solid #eee;
}
.isc-svg-icon {
    margin-left: 8px;
}
.opacity {
    opacity: 0.4;
}
</style>
