// 路由器对象模块

import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

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

export default new VueRouter({

    mode: 'history',

    routes,
 
    // 配置滚动行为  =>跳转路由时自动滚动到最上面
    scrollBehavior(to, from, savedPosition){
        // 期望滚动到的位置
        return{
            x: 0,
            y: 0
        }
    }
})