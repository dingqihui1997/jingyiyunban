/**
 * @type { import('vue-router').RouteConfig }
 */
export const fivesRoute = [
    {
        path: '/fives',
        name: '5S活动',
        component: () => import('@/views/fives/index.vue')
    },
    {
        path: '/fives/history',
        name: '5S活动历史记录',
        component: () => import('@/views/fives/history/index.vue')
    },
    {
        path: '/fives/info',
        name: '5S活动详情',
        component: () => import('@/views/fives/info/index.vue')
    },
    {
        path: '/fives/licensing',
        name: '5S活动发牌',
        component: () => import('@/views/fives/licensing/index.vue')
    }
];
