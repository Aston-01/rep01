import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
    {
        name: 'index',
        component: () => import('./view/index/index'),
        meta: {
            title: '首页'
        }
    },
    {
        name: 'mine',
        component: () => import('./view/mine/mine'),
        meta: {
            title: '我的'
        }
    },
    {
        name: 'myVenue',
        component: () => import('./view/mine/myVenue'),
        meta: {
            title: '我的场馆'
        }
    },
    {
        name: 'points',
        component: () => import('./view/mine/points'),
        meta: {
            title: '我的积分'
        }
    },
    {
        name: 'pointDetail',
        component: () => import('./view/mine/point-detail'),
        meta: {
            title: '积分明细'
        }
    },
    {
        path: '*',
        redirect: 'index'
    },
    {
        name: 'user',
        component: () => import('./view/user'),
        meta: {
            title: '会员中心'
        }
    },
    {
        name: 'cart',
        component: () => import('./view/cart'),
        meta: {
            title: '购物车'
        }
    },
    {
        name: 'goods',
        component: () => import('./view/goods'),
        meta: {
            title: '商品详情'
        }
    },
    {
        name: 'login',
        component: () => import('./view/login'),
        meta: {
            title: '登录'
        }
    },
    {
        name: 'phoneLogin',
        component: () => import('./view/login/phonelogin'),
        meta: {
            title: '手机验证码登录'
        }
    },
    {
        name: 'setInfo',
        component: () => import('./view/login/setInfo'),
        meta: {
            title: '设置个人信息'
        }
    },
    {
        name: 'index',
        component: () => import('./view/index/index'),
        meta: {
            title: '首页'
        }
    }, {
        name: 'active',
        component: () => import('./view/active/index'),
        meta: {
            title: '活动报名'
        }
    },
    {
        name: 'activeDetail',
        component: () => import('./view/active/detail'),
        meta: {
            title: '活动详情'
        }
    },
    {
        name: 'activeEvaluate',
        component: () => import('./view/active/evaluate'),
        meta: {
            title: '活动评价'
        }
    },
    {
        name: 'appointments',
        component: () => import('./view/active/appointments'),
        meta: {
            title: '活动评价'
        }
    },
    {
        name: 'venus',
        component: () => import('./view/venus'),
        meta: {
            title: '场馆列表'
        }
    },
    {
        name: 'position',
        component: () => import('./view/position/positionDetail'),
        meta: {
            title: '阵地详情'
        }
    },
    {
        name: 'store',
        component: () => import('./view/store/store'),
        meta: {
            title: '积分商城'
        }
    },
    {
        name: 'produceConfirm',
        component: () => import('./view/store/produceConfirm'),
        meta: {
            title: '兑换'
        }
    },
    {
        name: 'produce',
        component: () => import('./view/store/produce'),
        meta: {
            title: '兑换'
        }
    },
    {
        name: 'exchangeRecord',
        component: () => import('./view/store/exchangeRecord'),
        meta: {
            title: '兑换记录'
        }
    },
    {
        name: 'changeDetail',
        component: () => import('./view/store/changeDetail'),
        meta: {
            title: '兑换详情'
        }
    },
    {
        name: 'news',
        component: () => import('./view/news/news'),
        meta: {
            title: '新闻列表'
        }
    },
    {
        name: 'newsDetail',
        component: () => import('./view/news/newsContent'),
        meta: {
            title: '新闻详情'
        }
    },
    {
        name: 'setup',
        component: () => import('./view/mine/setup'),
        meta: {
            title: '设置'
        }
    },
    {
        name: 'searchResult',
        component: () => import('./view/index/searchResult'),
        meta: {
            title: '搜索'
        }
    },
];

// add route path
routes.forEach(route => {
    route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
    const title = to.meta && to.meta.title;
    if (title) {
        document.title = title;
    }
    if (to.query.ZLBToken) {
        next()
        return;
    }
    if (from.query.ZLBToken) {
        let toQuery = JSON.parse(JSON.stringify(to.query));
        toQuery.ZLBToken = from.query.ZLBToken;
        next({
            path: to.path,
            query: toQuery
        })
    } else {
        next()
    }

    next();
});

export {
    router
};
