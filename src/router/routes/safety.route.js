/**
 * @type { import('vue-router').RouteConfig }
 */
export const safetyRoute = [
    {
        path: '/safety',
        name: '安全点检',
        component: () => import('@/views/safety/index.vue')
    },
    {
        path: '/safety/history',
        name: '安全点检历史记录',
        component: () => import('@/views/safety/history/index.vue')
    },
    {
        path: '/safety/info',
        name: '安全点检详情',
        component: () => import('@/views/safety/info/index.vue')
    }
];
