<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="isShowFirst = true" @mouseleave="hideFirst">
        <h2 class="all">全部商品分类</h2>

        <div class="sort" @click="toSearch" v-if="isShowFirst">
          <div class="all-sort-list2">
            <div
              class="item"
              :class="{item_on: currentIndex === index}"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              @mouseenter="showSubCategorys(index)"
            >
              <h3>
                <a
                  href="javascript:;"
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                >{{c1.categoryName}}</a>
                <!-- <router-link :to="{path: '/search', query: {categoryName: c1.categoryName, category1Id: c1.categoryId}}">{{c1.categoryName}}</router-link> -->
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dt>
                      <a
                        href="javascript:;"
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                      >{{c2.categoryName}}</a>
                      <!-- <router-link :to="{path: '/search', query: {categoryName: c2.categoryName, category2Id: c2.categoryId}}">{{c2.categoryName}} </router-link> -->
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          href="javascript:;"
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                        >{{c3.categoryName}}</a>
                        <!-- <router-link :to="{path: '/search', query: {categoryName: c3.categoryName, category3Id: c3.categoryId}}">{{c3.categoryName}}</router-link> -->
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
// 按需引入打包   前: 3.8M  后: 2.5M
import throttle from "loadsh/throttle.js";
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      //默认状态数据
      isShowFirst: true,
      // 显示一级分类下标
      currentIndex: -1
    };
  },

  mounted() {
    // 得到当前路径路由
    const path = this.$route.path;
    // 如果不在首页指定隐藏一级分类列表
    if (path !== "/") {
      this.isShowFirst = false;
    }
  },

  computed: {
    // ...mapState(['home']),
    // ...mapState({
    //   home: 'home'
    // })
    ...mapState({
      categoryList: state => state.home.baseCategoryList
    })
  },

  methods: {
    // 显示指定下标的2 3级分类
    // 未节流
    // showSubCategorys: function(index) {
    //   console.log("事件护理的函数", index);
    //   this.currentIndex = index;
    // }
    //  _.throttle节流处理
    showSubCategorys: throttle(function(index) {
      //  console.log('处理事件的函数', index)
      this.currentIndex = index;
    }, 200),

    //点击某个分类项  跳转到search路由
    toSearch(event) {
      // console.dir(event.target);
      // 得到所有标签中data自定义属性
      const dataset = event.target.dataset;
      const { categoryname, category1id, category2id, category3id } = dataset;
      //判断  如果是a标签才能跳转
      if (categoryname) {
        const query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }

        // 得到路由路径  三种情况 : / ---  /search --- /search/xxxx
        const path = this.$route.path;

        // 如果已经在搜索界面
        if (path.indexOf("/search") === 0) {
          // replace 返回直接 跳转home
          this.$router.replace({ path, query });
        } else {
          // 没有在搜索界面
          // 跳转路由, 并携带query参数
          this.$router.push({ path: "/search", query });
        }
      }
    },

    hideFirst() {
      // 隐藏二三级 流标
      this.currentIndex = -1;

      //只有不在首页才隐藏
      if (this.$route.path !== "/") {
        this.isShowFirst = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;
    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }
    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }
    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            a {
              color: #333;
            }
          }
          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;
            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;
              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;
                &.fore {
                  border-top: 0;
                }
                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }
                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;
                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          &.item_on {
            background: #ccc;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
