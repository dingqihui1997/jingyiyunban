/**
 * @type { import('vue-router').RouteConfig }
 */
export const meetingRoute = [
    {
        path: '/meeting',
        name: '班前会议',
        component: () => import('@/views/meeting/index.vue')
    },
    {
        path: '/meetingHistory',
        name: '班前会议历史记录',
        component: () => import('@/views/meeting/history/index.vue')
    },
    {
        path: '/meetingInfo',
        name: '班前会议详情',
        component: () => import('@/views/meeting/info/index.vue')
    }
];
