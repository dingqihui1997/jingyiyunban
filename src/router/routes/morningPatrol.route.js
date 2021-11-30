/**
 * @type { import('vue-router').RouteConfig }
 */
export const morningPatrolRoute = [
    {
        path: '/morningPatrol',
        name: '早上巡检',
        component: () => import('@/views/morningPatrol/index.vue')
    },
    {
        path: '/morningPatrolInfo',
        name: '早上巡检详情',
        component: () => import('@/views/morningPatrol/info/index.vue')
    },
    {
        path: '/morningPatrolHistory',
        name: '早上巡检历史',
        component: () => import('@/views/morningPatrol/history/index.vue')
    },
    {
        path: '/contacts',
        name: '选择责任人',
        component: () => import('@/views/contacts/index.vue')
    },
    {
        path: '/postList',
        name: '选择岗位',
        component: () => import('@/views/contacts/postList/index.vue')
    }
];
