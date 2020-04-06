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
    <Floor />
    <Floor />
  
    <!--商标-->
    <Brand />
  </div>
</template>

<script type="text/ecmascript-6">
import TodyRecommond from "./TodyRecommond/TodyRecommond";
import List from "./List";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
export default {
  name: "Home",
  components: {
    TodyRecommond,
    List,
    Rank,
    Like,
    Floor,
    Brand
  }
};
</script>
<style lang="less" scoped>


</style>
