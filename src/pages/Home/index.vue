<template>
  <div id="home">
    <!-- 商品分类导航 -->
    <TypeNav />
    <!--列表-->
    <List />
    <!--今日推荐-->
    <TodyRecommond />

    <!-- 商品排行 -->
    <Rank />

    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <Floor v-for="floor in floors" :key="floor.id" :floor="floor"/>
   
  
    <!--商标-->
    <Brand />
  </div>
</template>

<script type="text/ecmascript-6">
import {mapState} from "vuex";
import TodyRecommond from "./TodyRecommond/TodyRecommond";
import List from "./List";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
export default {
  name: "Home",

  mounted() {
    // 触发vux的异步action调用, 从mock接口中请求到state中
    this.$store.dispatch('getBanners')
    this.$store.dispatch('getFloors')
  },
  components: {
    TodyRecommond,
    List,
    Rank,
    Like,
    Floor,
    Brand
  },
  
  computed: {
    ...mapState({
      floors: state => state.home.floors
    })
  }
};
</script>
<style lang="less" scoped>


</style>
