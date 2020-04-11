import Vue from 'vue'
// 引入swiper的样式
import "swiper/css/swiper.min.css";


import App from './App.vue'
import router from "./router";
import store from "./store";
import TypeNav from "./components/TypeNav";
import Carousel from "./components/Carousel";
// 加载mock接口文档模块
import "./mock/mokeServer";

//注册全局组件
Vue.component('TypeNav',TypeNav)
Vue.component('Carousel',Carousel)


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


console.log('mock接口执行了')
