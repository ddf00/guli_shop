<template>
  <div>
    <!-- 商品分类导航 -->
    <TypeNav />
    <h2>Search</h2>
    <!-- <p>query参数: {{$route.query.keyword}}</p>
    <p>params参数: {{$route.params.keyword}}</p>-->

    <p>params参数: {{keyword1}}</p>
    <p>query参数: {{keyword2}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Search",
  props: ["keyword1", "keyword2"]
};
</script>

<style lang="less" scoped>
</style>
