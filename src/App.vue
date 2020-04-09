<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer v-if="!$route.meta.isHideFooter" />
    <!-- 一级路由显示器 -->
  </div>
</template>

<script type="text/ecmascript-6">
import Footer from "./components/Footer";
import Header from "./components/Header";
import { reqBaseCategoryList } from "@/api";
export default {
  name: "App",
  components: {
    Header,
    Footer
  },

  async mounted() {
    // const result = await reqBaseCategoryList();
    // console.log('result', result)

    // 触发vuex 中的 getBaseCategoryList 调用
    this.$store.dispatch("getBaseCategoryList");
  }
};
</script>

<style lang="less" scoped>
</style>
