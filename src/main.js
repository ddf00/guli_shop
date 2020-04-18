import Vue from 'vue'
// 引入swiper的样式
import "swiper/css/swiper.min.css";


import App from './App.vue'
import router from "./router";
import store from "./store";
import TypeNav from "./components/TypeNav";
import Carousel from "./components/Carousel";
import Pagination from "./components/Pagination";
// 加载mock接口文档模块
import "./mock/mokeServer";

import * as API from "./api"; // 引入所有包含所有接请求函数方法的对象

import "./element"  // elementment-ui组件
import loading from "@/assets/loading.gif";

import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload, {
  loading, // 指定未加载图片loading图片
})


Vue.prototype.$API = API // 所有的组件都可通过this.$API来访问



//注册全局组件
Vue.component('TypeNav',TypeNav)
Vue.component('Carousel',Carousel)
Vue.component('Pagination',Pagination)


Vue.config.productionTip = false

new Vue({

  beforeCreate() {
    // 将当前vm作为事件总线 挂到原型上  所有组件都可见
    Vue.prototype.$bus = this
  },


  render: h => h(App),
  router, // 配置路由器(内部路由才会生效)
  store, // 配置vuex的核心管理对象store  ==> 组件中可以通过$store得到store对象

}).$mount('#app')


// console.log('mock接口执行了')
