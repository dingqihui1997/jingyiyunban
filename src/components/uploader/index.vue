<template>
    <div>
        <div
            v-if="upType != 'video'"
            class="uploader"
            :class="{ uploaderTop: isTop == '1', uploaderBottom: isBtm == '1' }"
        >
            <div class="uploderImg disFlex-a">
                <div class="color0B2">{{ imgTitle }}</div>
                <div class="uploadImg">支持JPG、PNG,大小不超过10MB</div>
            </div>
            <div>
                <m-uploader
                    v-model="fileList"
                    preview-image
                    :after-read="afterRead"
                    max-count="3"
                    :before-read="beforeRead"
                    deletable
                    :before-delete="beforeDelete"
                    accept="image/*"
                >
                    <div class="uploadBox disFlex-ja">
                        <isc-svg-icon name="iscon-add-low" color="#479AFF" size="20px"></isc-svg-icon>
                    </div>
                </m-uploader>
            </div>
        </div>
        <div
            v-if="upType != 'img'"
            class="uploader"
            :class="{ uploaderTop: isTop == '1', uploaderBottom: isBtm == '1' }"
        >
            <div class="uploderImg disFlex-a">
                <div class="color0B2">{{ videoTitle }}</div>
                <div class="uploadImg">时长五分钟以内，大小不超过500MB</div>
            </div>
            <div>
                <m-uploader
                    v-model="videoList"
                    accept="video/*"
                    :after-read="onRead"
                    :before-read="onBeforeRead"
                    :before-delete="onBeforeDelete"
                    max-count="3"
                    deletable
                >
                    <div class="uploadBox disFlex-ja">
                        <isc-svg-icon name="iscon-add-low" color="#479AFF" size="20px"></isc-svg-icon></div
                ></m-uploader>
            </div>
        </div>
    </div>
</template>

<script>
import { insertUploadFile, deleteLeanUploadfileRecord } from './service';
export default {
    name: '',
    props: {
        upType: {
            type: String,
            default: 'all'
        }, // 判断只进行图片上传或者视频上传  'img'图片上传  'video'视频上传  'all'全部
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
            default: '图片上传'
        },
        videoTitle: {
            type: String,
            default: '视频上传'
        },
        businessKey: {
            type: Number,
            default: 0
        },
        businessModule: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            fileList: [],
            fileIdList: [], // 上传的图片id数组
            videoList: [],
            videoIdList: [] // 上传的视频id数组
        };
    },
    methods: {
        // 上传图片
        async afterRead(file) {
            file.status = 'uploading';
            file.message = '上传中...';
            const fd = new FormData();
            const { name } = file.file;
            fd.append('file', file.file, name);
            this.fileIdList.push(await insertUploadFile(this.businessKey, this.businessModule, fd));
            file.status = 'done';
            this.$emit('isImg', true);
        },
        beforeRead(file) {
            if (file.type != 'image/jpeg' && file.type != 'image/png') {
                this.$toast('请上传 jpg 或 png 格式图片');
                return false;
            }
            if (file.size > 10485760) {
                this.$toast('上传图片不应超过10MB');
                return false;
            }
            return true;
        },
        // 删除图片之前
        async beforeDelete(file, detail) {
            await deleteLeanUploadfileRecord(this.fileIdList[detail.index]);
            this.fileIdList.splice(detail.index, 1);
            this.fileList.splice(detail.index, 1);
            let trueOrfalse = this.fileList.length > 0 ? true : false;
            this.$emit('isImg', trueOrfalse);
        },
        // 上传视频
        async onRead(file) {
            file.status = 'uploading';
            file.message = '上传中...';
            let fds = new FormData();
            let { name } = file.file;
            fds.append('file', file.file, name);
            this.videoIdList.push(await insertUploadFile(this.businessKey, this.businessModule, fds));
            file.status = 'done';
            this.$emit('isVideo', true);
        },
        onBeforeRead(file) {
            if (file.size > 524288000) {
                this.$toast('上传视频不应超过500MB');
                return false;
            }
            return true;
        },
        // 删除视频之前
        async onBeforeDelete(file, detail) {
            await deleteLeanUploadfileRecord(this.videoIdList[detail.index]);
            this.videoIdList.splice(detail.index, 1);
            this.videoList.splice(detail.index, 1);
            let trueOrfalse = this.videoList.length > 0 ? true : false;
            this.$emit('isVideo', trueOrfalse);
        }
    }
};
</script>
<style>
.m-uploader__preview-delete-icon {
    width: 18px !important;
    height: 18px !important;
    top: -2.5px !important;
    right: -3px !important;
}
</style>
<style lang="scss" scoped>
.uploader {
    width: 351px;
    min-height: 152px;
    padding-left: 12px;
}
.uploderImg {
    height: 48px;
    line-height: 48px;
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
    background: #f1f5ff;
}
</style>
