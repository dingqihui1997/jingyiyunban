<template>
    <div>
        <m-nav-bar
            :title="timeType ? '请选择开始时间' : '请选择结束时间'"
            left-text="取消"
            right-text="确定"
            left-arrow
        >
            <template #left>
                <div>取消</div>
            </template>
            <template #right>
                <div @click="confirm">确定</div>
            </template>
        </m-nav-bar>
        <div class="tabTime">
            <m-tabs v-model="active">
                <m-tab title="日期" name="0">
                    <m-datetime-picker
                        v-model="currentDate"
                        type="date"
                        :columns-order="['year', 'month', 'day']"
                        :formatter="formatter"
                        :show-toolbar="false"
                        :min-date="minTime.minDate"
                    ></m-datetime-picker>
                </m-tab>
                <m-tab title="时间" name="1">
                    <m-datetime-picker
                        v-model="currentTime"
                        type="time"
                        :columns-order="['hour', 'minute']"
                        :formatter="formatter1"
                        :show-toolbar="false"
                        :min-hour="minTime.minhour"
                        :min-minute="minTime.minMinute"
                    ></m-datetime-picker>
                </m-tab>
            </m-tabs>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        timeType: {
            type: Number,
            require: true
        },
        minTime: {
            type: Object,
            require: true
        }
    },
    data() {
        return {
            currentDate: new Date(),
            currentTime: '00:00',
            active: 0
        };
    },
    methods: {
        confirm() {
            this.active = 0;
            this.$emit('send', { date: this.currentDate, time: this.currentTime });
        },
        formatter(type, val) {
            if (type === 'year') {
                return val + ' 年';
            }
            if (type === 'month') {
                return val + ' 月';
            }
            if (type === 'day') {
                return val + ' 日';
            }
            return val;
        },
        formatter1(type, val) {
            if (type === 'hour') {
                return val + ' 时';
            }
            if (type === 'minute') {
                return val + ' 分';
            }
            return val;
        }
    }
};
</script>

<style lang="scss" scoped></style>
