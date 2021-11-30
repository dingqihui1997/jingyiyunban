/**
 * @type { import('vue-router').RouteConfig }
 */
export const kytRoute = [
    {
        path: '/kyt',
        name: 'KYT活动',
        component: () => import('@/views/kyt/index.vue')
    },
    {
        path: '/kyt/history',
        name: 'kyt历史记录',
        component: () => import('@/views/kyt/history/index.vue')
    },
    {
        path: '/kyt/info',
        name: 'kyt详情',
        component: () => import('@/views/kyt/info/index.vue')
    }
];
