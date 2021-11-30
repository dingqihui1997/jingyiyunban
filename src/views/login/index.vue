<template>
    <div>
        <div><img class="loginBack" src="../../assets/image/login.png" alt="" /></div>
        <div class="disFlex-ja">
            <div class="logo"><img src="../././../assets/image/logo.png" alt="" /></div>
        </div>
        <m-form @submit="onSubmit">
            <div class="username login-user" :class="user ? 'isBtm' : ''">
                <img v-if="!user" src="../../assets/login/denglum.svg" alt="" />
                <img v-else src="../../assets/login/denglu2.svg" />
                <m-field
                    v-model="username"
                    style="background-color: transparent"
                    :border="false"
                    placeholder="请输入登录名"
                    :rules="rules.username"
                    @focus="focus(0)"
                    @blur="blur(0)"
                />
                <img src="../../assets/login/shanchu.svg" @click="reset" />
            </div>
            <div class="password login-user" :class="word ? 'isBtm' : ''">
                <img v-if="!word" src="../../assets/login/mima.svg" alt="" />
                <img v-else src="../../assets/login/mima2.svg" alt="" />
                <m-field
                    v-model="password"
                    style="background-color: transparent"
                    :border="false"
                    :type="type ? 'password' : ''"
                    placeholder="请输入密码"
                    :rules="rules.password"
                    @focus="focus(1)"
                    @blur="blur(1)"
                />
                <span @click="change">
                    <img v-if="!type" src="../../assets/login/yinc.svg" alt="" />
                    <img v-else src="../../assets/login/yinc2.svg" alt="" />
                </span>
            </div>
            <div class="Sign-in" :class="username && password ? 'signBnt1' : 'signBnt'">
                <m-button round block type="info" native-type="submit">登录</m-button>
            </div>
        </m-form>
        <tips-popup ref="popup" :title="title" :text="message"></tips-popup>
    </div>
</template>
<script>
import { querylogin } from './service';
export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            type: true,
            show: false,
            user: false,
            word: false,
            title: '登录失败',
            message: '',
            rules: {
                username: [
                    {
                        required: true,
                        message: '登录名不能为空',
                        trigger: 'onBlur'
                    },
                    {
                        validator: (value) => {
                            return /^[0-9a-zA-Z_]{1,}$/.test(value);
                        },
                        message: '登录名只能包含英文字母、数字、下划线',
                        trigger: 'onBlur'
                    },
                    {
                        validator: (value) => {
                            return value.length <= 18 && value.length >= 2;
                        },
                        message: '登录名长度请控制在2-18位',
                        trigger: 'onBlur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '密码不能为空',
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
            },
            flag: false,
            userInfo: {}
        };
    },
    methods: {
        reset() {
            this.username = '';
        },
        change() {
            this.type = !this.type;
        },
        async onSubmit() {
            this.flag = true;
            const res = await querylogin({ loginName: this.username, password: this.password }); //登录
            if (res.data.code === 0) {
                localStorage.setItem('token', res.data.data.token);
                localStorage.setItem('userInfo', JSON.stringify(res.data.data));
                this.$router.push('/');
            } else {
                this.$refs.popup.show = true;
                this.message = res.data.message;
            }
        },
        focus(val) {
            val ? (this.word = true) : (this.user = true);
        },
        blur(val) {
            val ? (this.word = false) : (this.user = false);
        }
    }
};
</script>

<style lang="scss" scoped>
.logo {
    position: relative;
    width: 120px;
    height: 120px;
    top: -70px;
    img {
        width: 120px;
        height: 120px;
    }
}
.isBtm {
    box-shadow: inset 0px -0.5px 0px #479aff;
}
.loginBack {
    width: 100%;
    height: 200px;
}
.Sign-in {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: #fff;
    position: absolute;
    width: 335px;
    height: 48px;
    left: 20px;
    top: 446px;
    border-radius: 10px;
}
.signBnt {
    background: #479aff;
    opacity: 0.4;
}
.signBnt1 {
    background: #479aff;
}
.username {
    top: 282px;
}
.password {
    top: 350px;
}
.isc-svg-icon {
    color: #999999;
    font-size: 18px;
}
</style>
