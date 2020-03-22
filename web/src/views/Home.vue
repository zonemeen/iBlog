<template>
  <div class="main-container mb-9 mt-8">
    <img
      width="100%"
      height="100%"
      src="../assets/images/bg.png"
      style="position: fixed; left:0; top:0; z-index:-1;"
    />
    <div
      class="post-container d-flex flex-wrap jc-center"
      :data="
        articles.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
    >
      <div v-for="(article, i) in articles" :key="i">
        <div class="show">
          <router-link
            tag="div"
            :to="`/article/${article._id}`"
            class="top mt-10 mr-10 mb-0 ml-10 hand"
            :style="{ 'background-image': `url(${article.icon})` }"
          ></router-link>
          <div class="bg-postcolor pt-8 mx-10 title">
            <router-link
              tag="span"
              :to="`/article/${article._id}`"
              class="fs-xxl jc-center d-flex flex-wrap hand text-grey-1"
            >{{ article.title }}</router-link>
            <div class="d-flex mt-4 p-7 text-grey-1">
              <i class="iconfont icon-xinzengyudingicon- pr-2"></i>
              <span class="fs-sm">{{ article.date }}</span>
              <i class="iconfont icon-inbox1 pl-9"></i>
              <router-link tag="span" :to="`/archives`" class="fs-sm pl-2 mr-6 hand">文章</router-link>
              <i class="iconfont icon-love- text-red hand"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex jc-center mt-10">
      <el-pagination
        background
        class="text-white"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next"
        :total="articles.length"
        prev-text="上一页"
        next-text="下一页"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pagesize: 6,
      articles: []
    };
  },
  methods: {
    handleSizeChange: size => {
      this.pagesize = size;
      /*console.log(this.pagesize) */
    },
    handleCurrentChange: currentPage => {
      this.currentPage = currentPage;
      /*console.log(this.currentPage) */
    },
    async fetchArticles() {
      const res = await this.$http.get("articles/list");
      this.articles = res.data;
    }
  },
  created() {
    this.fetchArticles();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";

// .main-container {
//   background: url("../assets/images/bg.png");
//   background-repeat: no-repeat;
//   // background-position: right top;
// }

.post-container {
  .top {
    width: 19.2857rem;
    height: 17.8571rem;
    // background: #f7f7f7 no-repeat top center;
    // background-size: auto 100%;
    &.title.title {
      width: 19.2857rem;
    }
  }
}

.post:hover {
  box-shadow: 1px 1px 15px 2px rgba(0, 0, 0, 0.3);
}

.show {
  transition: transform 0.25s ease;
  list-style: none;
}
.show:hover {
  transform: scale(1.1, 1.1);
}
.btn-prev,
.btn-next {
  background: map-get($colors, "bgcolor") !important;
  color: red;
}
.el-pagination__total {
  color: map-get($colors, "grey-1") !important;
}
</style>
