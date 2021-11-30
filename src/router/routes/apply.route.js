/**
 * @type { import('vue-router').RouteConfig }
 */
export const applyRoute = [
    {
        path: '/apply',
        name: '调岗申请',
        component: () => import('@/views/apply/index.vue')
    },
    {
        path: '/applyHistory',
        name: '调岗申请历史记录',
        component: () => import('@/views/apply/history/index.vue')
    },
    {
        path: '/applyInfo',
        name: '调岗申请详情',
        component: () => import('@/views/apply/info/index.vue')
    }
];
