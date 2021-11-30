/**
 * @type { import('vue-router').RouteConfig }
 */
export const dailyRoute = {
    path: '/daily',
    name: '日常管理',
    component: () => import('@/views/dailyManagement/index.vue')
};
