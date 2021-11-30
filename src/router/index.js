import Vue from 'vue';
import Router from 'vue-router';
import { titleGuard } from './guards/title.guard';
import routes from './routes';
import acl from '@isyscore/vue-plugin-acl';
import { queryAclList } from '@/service/aclList';
import store from '../store';

Vue.use(Router);

export async function createRouter() {
    const aclList = await queryAclList();
    store.commit('SET_MENU_LIST', aclList);
    const router = new Router({
        mode: 'history',
        base: process.env.BASE_URL,
        routes: []
    });
    const noAclRouteName = '首页';
    router.beforeEach(titleGuard);
    Vue.use(acl, { aclList, routes, router, noAclRouteName });
    return router;
}
