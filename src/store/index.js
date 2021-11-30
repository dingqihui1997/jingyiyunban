import Vue from 'vue';
import Vuex from 'vuex';
import { menuModule } from './modules/menu';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        menu: menuModule
    },
    state: {},
    mutations: {}
});

export default store;
