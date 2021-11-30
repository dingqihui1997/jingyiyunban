/**
 * @type { import('vue-router').RouteConfig }
 */
export const violationRoute = [
    {
        path: '/violation',
        name: '违规记录',
        component: () => import('@/views/violation/index.vue')
    },
    {
        path: '/violation/history',
        name: '违规历史记录',
        component: () => import('@/views/violation/history/index.vue')
    },
    {
        path: '/violation/info',
        name: '违规记录详情',
        component: () => import('@/views/violation/info/index.vue')
    }
];
