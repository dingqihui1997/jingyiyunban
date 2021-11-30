import Vue from 'vue';
import App from './App.vue';
import router, { createRouter } from './router';
import store from './store';
import '@isyscore/styles';
import '@/styles/global.scss';
import '@/plugins/mobile-ui';
import '@/plugins/svg-icon';
import tipsPopup from '@/components/tips-popup/index.vue';
import load from '@/components/loading/index.vue';
Vue.component('load', load);
Vue.component('tipsPopup', tipsPopup);
Vue.config.productionTip = false;

(async () => {
    const router = await createRouter();
    new Vue({
        router,
        store,
        render: (h) => h(App)
    }).$mount('#app');
})();
