// 路由器对象模块

import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store"; // 在组件中不需要引入

//通用方案
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (loaction, onComplete = () => {}, onAbort) {
    return originPush.call(this, loaction, onComplete, onAbort)
}

// VueRouter.prototype.replace = function (location, onComplete, onAbort = () => {}) {
//     return originReplace.call(this, location, onComplete, onAbort)
// }

VueRouter.prototype.replace = function (location, onComplete, onAbort) {
    return originReplace.call(this, location, onComplete, onAbort).catch(() => {})
}

Vue.use(VueRouter)

// 创建路由对象
const router = new VueRouter({

    mode: 'history',

    routes,

    // 配置滚动行为  =>跳转路由时自动滚动到最上面
    scrollBehavior(to, from, savedPosition) {
        // 期望滚动到的位置
        return {
            x: 0,
            y: 0
        }
    }
})

const checkPaths = ['/trade', '/pay', '/center']
// 添加全局前置守卫
router.beforeEach((to, from, next) => {
    // 跳转目标路径
    const targetPath = to.path
    if (checkPaths.find(path => targetPath.indexOf(path) === 0)) { // 如果targetPath 在 checkPaths 中 // 需要检查
        if (store.state.user.userInfo.name) {
            // 如果已经登录 放行
            next()
        } else {
            // 如果没有 跳转登录页面
            next('/login?redirect=' + targetPath)
        }


    } else { // 否则放行
        next()
    }


})

export default router