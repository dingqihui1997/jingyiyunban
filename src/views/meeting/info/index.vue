<template>
    <div class="contentBox">
        <div class="custom-nav">
            <m-nav-bar
                fixed
                placeholder
                :border="false"
                title="详情"
                @click-left="onClickLeft"
                @click-right="onClickRight"
            >
                <template #left>
                    <isc-svg-icon name="iscon-arrow-left-low" />
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
                <div>人员出勤</div>
                <div class="disFlex-ja state"><img src="../../../assets/image/Vector.svg" alt="" /></div>
            </div>
            <div class="disFlex-sba patrol-infor">
                <div>人员状态</div>
                <div class="disFlex-ja state"><img src="../../../assets/image/Vector.svg" alt="" /></div>
            </div>
        </div>
        <!-- 会议信息 -->
        <div class="problemBox">
            <div class="disFlex-a infoTitle">
                <div class="patrolPlace"></div>
                <div>会议信息</div>
            </div>
            <div class="problem">
                <div class="problemRecord disFlex-sba">昨日总结</div>
                <div style="min-height: 77px">
                    {{ details.record && details.record.summary }}
                </div>
            </div>
            <div class="problem">
                <div class="problemRecord disFlex-sba">今日安排</div>
                <div style="min-height: 77px">
                    {{ details.record && details.record.workContent }}
                </div>
            </div>
            <div class="disFlex-sba patrol-infor">
                <div>生产日期</div>
                <div class="disFlex-a">{{ details.record && details.record.createTime }}</div>
            </div>
            <pics-videos up-type="img" img-title="上传任务单" :imgs="details.taskPics"></pics-videos>
            <div class="disFlex-sba patrol-infor">
                <div>信息通告</div>
                <div class="disFlex-ja state"><img src="../../../assets/image/Vector.svg" alt="" /></div>
            </div>
        </div>
        <!-- 人员互动 -->
        <div class="interact">
            <div>
                <div class="disFlex-a infoTitle">
                    <div class="patrolPlace"></div>
                    <div>人员互动</div>
                </div>
                <div class="disFlex-sba patrol-infor borderBut">
                    <div>人员</div>
                    <div class="disFlex-a">{{ details.record && details.record.empName }}</div>
                </div>
                <div class="disFlex-sba patrol-infor borderBut">
                    <div>互动模式</div>
                    <div class="disFlex-a">{{ details.record && details.record.interactiveType }}</div>
                </div>
                <div class="disFlex-sba patrol-infor">
                    <div>互动评价</div>
                    <div class="disFlex-a">{{ details.record && details.record.assessType }}</div>
                </div>
                <pics-videos
                    img-title="互动拍照"
                    video-title="上传会议视频"
                    :videos="details.videos"
                    :imgs="details.interactivePics"
                ></pics-videos>
            </div>
        </div>
    </div>
</template>
<script>
import { queryLeanMorningMeeting } from '../service';
import picsVideos from '../../../components/pics-videos/index.vue';
export default {
    name: '',
    components: { picsVideos },
    data() {
        return { message: '', details: {} };
    },
    computed: {},
    watch: {},
    async mounted() {
        this.details = await queryLeanMorningMeeting(this.$route.query.id);
    },
    methods: {
        onClickRight() {
            this.$router.push('/meetingHistory');
        },
        onClickLeft() {
            this.$router.back();
        }
    }
};
</script>

<style lang="scss" scoped>
.borderBut {
    border-bottom: 1px solid #eee;
}
.patrol-infor {
    div:first-child {
        color: #000000b2;
    }
    div:last-child {
        color: #000000cc;
    }
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
    background: #ffffff;
    border-radius: 10px;
    margin: 12px;
}
.problem {
    padding-left: 12px;
    border-bottom: 1px solid #eee;
}
.problemRecord {
    height: 42px;
    color: #000000b2;
}

.state {
    width: 72px;
    height: 32px;
    background: rgba(71, 154, 255, 0.2);
    border-radius: 4px;
}
.interact {
    width: 351px;
    background: #ffffff;
    border-radius: 10px;
    margin: 12px;
}
.uploader {
    border-top: 1px #eee solid;
    width: 351px;
    min-height: 152px;
    padding-left: 12px;
    border-bottom: 1px solid #eee;
}
.uploderImg {
    height: 48px;
}
.imgItem {
    width: 80px;
    height: 80px;
    background: #f7f8fa;
    margin-right: 24px;
}
</style>
