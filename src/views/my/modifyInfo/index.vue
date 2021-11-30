<template>
    <div>
        <m-nav-bar fixed placeholder :border="false" title="修改密码" @click-left="goback">
            <template #left>
                <isc-svg-icon name="iscon-arrow-left-low" size="20px" />
            </template>
        </m-nav-bar>
        <div class="contentBox disFlex-d my-contentBox-input modifyinfoBox">
            <m-form @submit="onSubmit">
                <div class="flex1 disFlex-sba field bottom">
                    <div class="text">原密码</div>
                    <div>
                        <m-field
                            v-model="oriPassword"
                            type="password"
                            placeholder="请输入"
                            input-align="right"
                            :rules="rules.oriPassword"
                        />
                    </div>
                </div>
                <div class="flex1 disFlex-sba field">
                    <div class="text">新密码</div>
                    <div>
                        <m-field
                            v-model="newPassword"
                            type="password"
                            placeholder="请输入"
                            input-align="right"
                            :rules="rules.newPassword"
                        />
                    </div>
                </div>
                <div class="signOut disFlex-ja"><m-button block type="info" native-type="submit">提交</m-button></div>
            </m-form>
        </div>
        <tips-popup ref="popup" :title="tipsTitle" :text="message" url="/login"></tips-popup>
    </div>
</template>

<script>
import { changePwd } from '../service';
export default {
    name: '',
    components: {},
    props: {},
    data() {
        return {
            oriPassword: '',
            newPassword: '',
            value: '',
            message: '',
            tipsTitle: '',
            rules: {
                oriPassword: [
                    {
                        required: true,
                        message: '原密码不能为空',
                        trigger: 'onBlur'
                    },
                    {
                        validator: (value) => {
                            return value.length <= 18 && value.length >= 5;
                        },
                        message: '密码长度请控制在5-18位',
                        trigger: 'onBlur'
                    }
                ],
                newPassword: [
                    {
                        required: true,
                        message: '新密码不能为空',
                        trigger: 'onBlur'
                    },
                    {
                        validator: (value) => {
                            return value.length <= 18 && value.length >= 5;
                        },
                        message: '密码长度请控制在5-18位',
                        trigger: 'onBlur'
                    }
                ]
            }
        };
    },
    methods: {
        goback() {
            this.$router.back();
        },
        async onSubmit() {
            let params = { password: this.newPassword, oldPassword: this.oriPassword };
            let res = await changePwd(params);
            if (res.data.code === 0) {
                this.$toast('修改成功');
                setTimeout(() => {
                    localStorage.clear();
                    this.$router.push('/login');
                }, 1000);
            } else {
                this.tipsTitle = '提交失败';
                this.message = res.data.message;
                this.$refs.popup.show = true;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.contentBox {
    width: 351px;
    height: 120px;
    margin: 12px 12px 40px 12px;
    background: #ffffff;
    border-radius: 10px;
    padding: 12px 0;
}
.field {
    height: 48px;
}
.bottom {
    border-bottom: 1px solid #eee;
}
.text {
    padding-left: 12px;
}
.signOut {
    color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 335px;
    height: 48px;
    left: 20px;
    top: 260px;
    background: #479aff;
    border-radius: 10px;
    overflow: hidden;
}
</style>
<style lang="scss">
.modifyinfoBox {
    .m-field__error-message {
        position: relative;
        top: 3px;
        text-align: right;
        color: #ff6969;
    }
    .m-field--error .m-field__control,
    .m-field--error .m-field__control::placeholder {
        position: relative;
        top: 4px;
        color: #ff6969;
    }
}
</style>
