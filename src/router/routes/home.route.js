/**
 * @type { import('vue-router').RouteConfig }
 */
export const homeRoute = {
    path: '/',
    name: '首页',
    component: () => import('@/views/home/index.vue')
};
