/**
 * @type { import('vue-router').RouteConfig }
 */
export const loginRoute = {
    path: '/login',
    name: '登录',
    component: () => import('@/views/login/index.vue')
};
