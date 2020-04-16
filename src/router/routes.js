// 所有路由配置的数组模块
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Login from "@/pages/Login"
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
import GroupBuy from "@/pages/Center/GroupBuy";
import myOrder from "@/pages/Center/myOrder";

import store from "@/store";

export default [{
        path: '/',
        component: Home
    },
    {
        name: 'search',
        path: '/search/:keyword?', //指定params参数   ?: 代表params参数可以不传
        component: Search,
        //query / params 形参映射成props传递给路由组件
        props: (route) => ({
            keyword1: route.params.keyword,
            keyword2: route.query.keyword
        })
    },
    {
        name: 'detail',
        path: '/detail/:skuId',
        component: Detail,

    },
    {
        path: '/addCartSuccess',
        component: AddCartSuccess,

        // 只有携带skuId 的和 skuNum 以及 sessionStorage 有skuInfo数据 才能查看添加购物车成功的界面
        beforeEnter(to, from, next) {
            const skuInfo = JSON.parse(window.sessionStorage.getItem("SKU_INFO_KEY"));
            const {
                skuId,
                skuNum
            } = to.query
            if (skuId && skuNum && skuInfo) {
                next() // 放行
            } else {
                // 什么都不做  待在原地
                // next('/')
                next(from.path)
            }
        }
    },
    {
        path: '/shopcart',
        component: ShopCart,

    },
    {
        path: '/register',
        component: Register,
        meta: {
            isHideFooter: true //标识Footer是否隐藏
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            isHideFooter: true //标识Footer是否隐藏
        },

        // 即将跳转到login 时调用
        beforeEnter: (to, form, next) => {
            if (store.state.user.userInfo.name) { // 如果已经登录 跳转到首页
                next('/')
            } else { // 如果没有登录 放行 去登录
                next()
            }

        }
    },

    {
        path: '/trade',
        component: Trade,
        // 只能从购物车界面, 才能跳转到交易界面
        beforeEnter: (to, form, next) => {
            if (form.path === '/shopcart') { // 如果已经登录 跳转到首页
                next()
            } else { // 如果没有登录 放行 去登录
                next('/shopcart')
            }

        }
    },
    {
        path: '/pay',
        component: Pay,
        // 将query参数映射成路由组件的props
        props: route => ({
            orderId: route.query.orderId
        }),

        // 只能从交易界面, 才能跳转到支付界面
        beforeEnter: (to, form, next) => {
            if (form.path === '/trade') { // 如果已经登录 跳转到首页
                next()
            } else { // 如果没有登录 放行 去登录
                next('/trade')
            }

        }
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        // 只能从支付界面, 才能跳转到支付成功界面
        beforeEnter: (to, form, next) => {
            if (form.path === '/pay') { // 如果已经登录 跳转到首页
                next()
            } else { // 如果没有登录 放行 去登录
                next('/pay')
            }

        }
    },
    {
        path: '/center',
        component: Center,
        children: [{
                path: '/center/groupBuy',
                component: GroupBuy
            },
            {
                path: 'myorder',
                component: myOrder
            },
            {
                // 配置一个自动重定向的路由
                // path: '/center',
                // 空串默认 '/center'
                path: '',
                redirect: '/center/myorder'

            }
        ]
    },
]