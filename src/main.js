import Vue from 'vue'
import App from './App.vue'
import router from "./router";


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router, // 配置路由器(内部路由才会生效)

}).$mount('#app')








