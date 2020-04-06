<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer />
    <!-- 一级路由显示器 -->
  </div>
</template>

<script type="text/ecmascript-6">
import Footer from "./components/Footer";
import Header from "./components/Header";
export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="less" scoped>
</style>
