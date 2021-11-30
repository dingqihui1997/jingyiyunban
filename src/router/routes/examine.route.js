/**
 * @type { import('vue-router').RouteConfig }
 */
export const examineRoute = [
    {
        path: '/examine',
        name: '审批中心',
        component: () => import('@/views/examine/index.vue')
    },
    {
        path: '/examine/team',
        name: '班组列表',
        component: () => import('@/views/examine/team/index.vue')
    },
    {
        path: '/examine/info',
        name: '审批中心详情',
        component: () => import('@/views/examine/info/index.vue')
    }
];
