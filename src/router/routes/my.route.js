/**
 * @type { import('vue-router').RouteConfig }
 */
export const myRoute = [
    {
        path: '/my',
        name: '个人中心',
        component: () => import('@/views/my/index.vue')
    },
    {
        path: '/modifyInfo',
        name: '修改密码',
        component: () => import('@/views/my/modifyInfo/index.vue')
    }
];
