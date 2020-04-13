<template>
  <!--分页组件-->
  <div class="pagination" v-if="pageConfig.total > 0">
    <!--上一页-->
    <button :disabled="currentPage === 1" @click="changeCurrentPage(currentPage - 1)">上一页</button>
    <!-- 第1页 -->
    <button v-if="startEnd.start > 1" @click="changeCurrentPage(1)">1</button>
    <!-- 省略号 -->
    <button disabled v-if="startEnd.start > 2">···</button>
    <!-- 连续页码 -->
    <button
      v-for="no in startEnd.end"
      :key="no"
      v-if="no >= startEnd.start"
      :class="{active: currentPage === no}"
      @click="changeCurrentPage(no)"
    >{{no}}</button>
    <!-- 省略号 -->
    <button disabled v-if="startEnd.end < totalPages - 1">···</button>
    <!-- 最后一页 -->
    <button v-if="startEnd.end !== totalPages" @click="changeCurrentPage(totalPages)">{{totalPages}}</button>
    <!--下一页-->
    <button :disabled="currentPage === totalPages" @click="changeCurrentPage(currentPage + 1)">下一页</button>
    <!-- 总记录数 -->
    <button disabled style="margin-left: 30px">共 {{pageConfig.total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pageConfig: {
      type: Object,
      default: {
        // 接收属性的默认值
        total: 0, // 总记录数量
        showPageNo: 3, //连续页码数
        pageNo: 1, // 当前在第几页
        pageSize: 10 // 一页最多显示多条记录<
      }
    }
  },

  data() {
    // 在data中可以读取 props 和 Vue原型上的属性
    // 不可以: 不能直接读取data对象中的数据
    return {
      currentPage: this.pageConfig.pageNo //当前页码
    };
  },

  computed: {
    // 总页码数
    totalPages() {
      // 取出总数量和每页记录数     36 / 5
      const { total, pageSize } = this.pageConfig;
      if (total <= 0 || pageSize <= 0) return 0;
      return Math.ceil(total / pageSize); // 向上取整
    },

    // 根据已有数据计算连续页码start和end
    startEnd() {
      // 取出已有数据
      // 当前页码数
      // const currentPage = this.currentPage;
      // // 连续页码数
      // const showPageNo = this.showPageNo.showPageNo;
      // // 总页码数
      // const totalPages = this.totalPages;
      const {
        totalPages,
        currentPage,
        pageConfig: { showPageNo }
      } = this; // 多层级对象解构
      // 计算产生需要的数据
      let start = 0;
      let end = 0;

      // currentPage  showPageNo  totalPages
      //    4              5          10          ==> start = 4 - 2 = 2
      start = currentPage - Math.floor(showPageNo / 2);
      // currentPage  showPageNo  totalPages
      //    2              5          10          ==> start = 2 - 2 = 0  // 不对  最小页码是 1
      if (start < 1) {
        start = 1;
      }

      // currentPage  showPageNo  totalPages              4 + 5 - 1
      //    4              5          10          ==>  star + showPageNo -1

      // end = currentPage + Math.floor(showPageNo / 2);
      end = start + showPageNo - 1;

      // currentPage  showPageNo  totalPages
      //    9             5          10          ==> end = 9 + 2   超过了最大页码
      if (end > totalPages) {
        end = totalPages;
        start = end - showPageNo + 1;
      }
      // currentPage  showPageNo  totalPages
      //    9             5          10
      // star = 9 - 2
      // end = 10   7,8,9,10  页码数只有4个
      // 返回数据

      return { start, end };
    }
  },

  watch: {
    'pageConfig.pageNo'(value) {
      this.currentPage = value
    }
  },
  methods: {
    // 将当前页码改为指定页码
    changeCurrentPage(page) {
      this.currentPage = page;
      this.$emit('changeCurrentPage', page)
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>