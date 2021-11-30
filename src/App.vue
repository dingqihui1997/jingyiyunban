<template>
    <div id="app" class="d-flex flex-column">
        <keep-alive include="KeepAlive">
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
export default {
    mounted() {
        if (!localStorage.getItem('token')) this.$router.push('/login');
    }
};
</script>
<style lang="scss">
#app {
    background: #f6f8fb;
    ::-webkit-scrollbar {
        display: none;
        width: 0;
        height: 0;
    }
}
* {
    margin: 0;
    padding: 0;
}
@import '../src/styles/common';
body {
    background: #f6f8fb;
}
</style>
