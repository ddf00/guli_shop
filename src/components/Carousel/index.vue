<template>
  <!-- 轮播图 -->
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in carouselList" :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from "vue";
import Swiper from "swiper";
export default {
  name: "Carousel",

  props: {
    carouselList: Array // 外部传入轮播列表数据
  },

  mounted() {
    // 创新swiper对象必须在轮播页面显示之后执行在可以
    // $refs 只会匹配当前组件对应的元素
  },

  watch: {
    
    carouselList: {
      handler() {

          // 只有数组中有数据, 才需要创建swiper对象
          if(this.carouselList.length === 0) return
          
          console.log('watch carouselList', this.carouselList.length)
        Vue.nextTick(() => {
          // 必须在轮播界面列表显示之后创建
          new Swiper(this.$refs.swiper, {
            // direction: "vertical", // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination"
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            },

            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar"
            }
          });
        });
      },
      immediate: true // 是否立即执行一次
    },
  }
};
</script>

<style lang="less" scoped>
</style>
