<template>
    <div>
        <div
            v-if="upType != 'video' && imgs.length"
            class="uploader"
            :class="{ uploaderTop: isTop == '1', uploaderBottom: isBtm == '1' }"
        >
            <div class="uploderImg disFlex-a">
                <div>{{ imgTitle }}</div>
                <!-- <div class="uploadImg">支持JPG、PNG,大小不超过10MB</div> -->
            </div>
            <div class="disFlex-a">
                <div v-for="(i, index) in imgs" :key="index" class="uploadBox">
                    <img :src="i" alt="" @click="getImg(index)" />
                </div>
            </div>
        </div>
        <div
            v-if="upType != 'img' && videos.length"
            class="uploader"
            :class="{ uploaderTop: isTop == '1', uploaderBottom: isBtm == '1' }"
        >
            <div class="uploderImg disFlex-a">
                <div>{{ videoTitle }}</div>
                <!-- <div class="uploadImg">时长五分钟以内，大小不超过500MB</div> -->
            </div>
            <div class="disFlex-w">
                <div v-for="(i, index) in videos" :key="index">
                    <video
                        :id="index"
                        :src="i"
                        controls="controls"
                        class="uploadVideo"
                        controlslist="nodownload"
                        autoplay
                        style="object-fit: fill"
                        playsinline="true"
                        webkit-playsinline="true"
                        x-webkit-airplay="allow"
                        airplay="allow"
                        x5-video-player-type="h5"
                        x5-video-player-fullscreen="true"
                        x5-video-orientation="portrait"
                    ></video>
                </div>
            </div>
        </div>
        <m-image-preview v-model="show" :images="imgs" :start-position="showIndex"> </m-image-preview>
    </div>
</template>

<script>
export default {
    props: {
        upType: {
            type: String,
            default: 'all'
        }, // 判断是图片视频  'img'图片  'video'视频  'all'全部
        isTop: {
            type: String,
            default: '1'
        }, // 判断是否需要上边框  '1'需要  '2'不需要
        isBtm: {
            type: String,
            default: '1'
        }, // 判断是否需要上边框  '1'需要  '2'不需要
        imgTitle: {
            type: String,
            default: '上传图片'
        },
        videoTitle: {
            type: String,
            default: '上传会议视频'
        },
        imgs: {
            type: Array,
            default: () => []
        }, // 上传的图片数组
        videos: {
            type: Array,
            default: () => []
        } // 上传的视频数组
    },
    data() {
        return {
            video: [],
            show: false, //图片展示
            showIndex: -1 //展示的第一张图片位置
        };
    },
    methods: {
        getImg(index) {
            this.showIndex = index;
            this.show = true;
        }
    }
};
</script>

<style lang="scss" scoped>
.uploader {
    width: 351px;
    min-height: 152px;
    padding-left: 12px;
}
.uploderImg {
    height: 48px;
    line-height: 48px;
    color: rgba(0, 0, 0, 0.7);
}
.uploadImg {
    font-size: 12px;
    color: #00000066;
    margin-left: 10px;
}
//上边框
.uploaderTop {
    border-top: 1px #eee solid;
}
//下边框
.uploaderBottom {
    border-bottom: 1px solid #eee;
}

//自定义上传框
.uploadBox {
    width: 80px;
    height: 80px;
    margin-right: 24px;
    img {
        width: 100%;
        height: 100%;
    }
}
.uploadVideo {
    width: 327px;
    height: 163.5px;
}
</style>
