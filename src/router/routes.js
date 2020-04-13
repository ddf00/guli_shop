// 所有路由配置的数组模块
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Login from "@/pages/Login"
import Detail from "@/pages/Detail";

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
        }
    },
]