export const menu = [
    [
        { name: '填写交接班', icon: require('@/assets/daily/before/tianxie.svg'), hasAcl: true },
        { name: '员工考勤', icon: require('@/assets/daily/before/yuangong.svg'), hasAcl: true },
        { name: '物料确认', icon: require('@/assets/daily/before/wuliao.svg'), hasAcl: true },
        { name: '缺料报备', icon: require('@/assets/daily/before/queliao.svg'), hasAcl: true }
    ],
    [
        { name: '分配任务', icon: require('@/assets/daily/work/fenpen.svg'), hasAcl: true },
        { name: '设备自检', icon: require('@/assets/daily/work/shebei.svg'), hasAcl: true },
        { name: '物料确认', icon: require('@/assets/daily/work/wuliao.svg'), hasAcl: true },
        { name: '停线记录', icon: require('@/assets/daily/work/tixian.svg'), hasAcl: true },
        { name: '午后巡检', icon: require('@/assets/daily/work/wuhou.svg'), hasAcl: true },
        { name: '标准作业维护', icon: require('@/assets/daily/work/biaozhun.svg'), hasAcl: true },
        { name: '质量检查', icon: require('@/assets/daily/work/zhiliang.svg'), hasAcl: true },
        { name: '加班申请', icon: require('@/assets/daily/work/jiaban.svg'), hasAcl: true },
        { name: '脱岗记录', icon: require('@/assets/daily/work/tuogang.svg'), hasAcl: true },
        { name: '生产日报', icon: require('@/assets/daily/work/shengchan.svg'), hasAcl: true },
        { name: '生产进度同步', icon: require('@/assets/daily/work/shengchanjindu.svg'), hasAcl: true },
        { name: '收班巡检', icon: require('@/assets/daily/work/shouban.svg'), hasAcl: true }
    ],
    [
        { name: '物料确认', icon: require('@/assets/daily/afterShift/wuliao.svg'), hasAcl: true },
        { name: '绩效考核', icon: require('@/assets/daily/afterShift/jixiao.svg'), hasAcl: true },
        { name: '问题关闭', icon: require('@/assets/daily/afterShift/wenti.svg'), hasAcl: true },
        { name: '改善活动', icon: require('@/assets/daily/afterShift/gaishan.svg'), hasAcl: true }
    ]
];

export const menuUrl = [
    [
        {
            icon: require('@/assets/daily/before/zaoshangxj.svg'),
            url: '/morningPatrol',
            path: '/morningPatrolHistory'
        },
        {
            icon: require('@/assets/daily/before/banqian.svg'),
            url: '/meeting',
            path: '/meetingHistory'
        }
    ],
    [
        {
            icon: require('@/assets/daily/work/diaogang.svg'),
            url: '/apply',
            path: '/applyHistory'
        },
        {
            icon: require('@/assets/daily/work/anquan.svg'),
            url: '/safety',
            path: '/safety/history'
        },
        {
            icon: require('@/assets/daily/work/weigui.svg'),
            url: 'violation',
            path: '/violation/history'
        }
    ],
    [
        {
            icon: require('@/assets/daily/afterShift/KYT.svg'),
            url: '/kyt',
            path: 'Kyt/history'
        },
        {
            icon: require('@/assets/daily/afterShift/5s.svg'),
            url: '/fives',
            path: '/fives/history'
        }
    ]
];
export const iconList = [];
