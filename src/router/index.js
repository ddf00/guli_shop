// 路由器对象模块

import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

//通用方案
const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (loaction, onComplete = () => {}, onAbort) {
    return originPush.call(this, loaction, onComplete, onAbort)
}

// VueRouter.prototype.replace = function (location, onComplete, onAbort = () => {}) {
//     return originPush.call(this, location, onComplete, onAbort)
// }

VueRouter.prototype.replace = function (location, onComplete, onAbort) {
    return originPush.call(this, location, onComplete, onAbort).catch(() => {})
}

Vue.use(VueRouter)

export default new VueRouter({

    mode: 'history',

    routes
})