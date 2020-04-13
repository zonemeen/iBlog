<template>
  <div class="main-container mb-9 mt-8">
    <div class="post-container d-flex flex-wrap jc-center ai-center">
      <div v-for="(article, i) in articles" :key="i">
        <div class="show home-art">
          <router-link
            tag="div"
            :to="`/article/list/${article._id}`"
            class="top mt-10 mx-8 mb-0 hand"
            :style="{ 'background-image': `url(${article.icon})` }"
          ></router-link>
          <div class="bg-postcolor pt-8 mx-8 title">
            <router-link
              tag="span"
              :to="`/article/list/${article._id}`"
              class="fs-xxl jc-center d-flex flex-wrap hand text-grey-1"
            >{{ article.title }}</router-link>
            <div class="d-flex mt-4 p-7 text-grey-1">
              <i class="iconfont icon-xinzengyudingicon- pr-2"></i>
              <span class="fs-sm">{{ article.createdAt | date("YYYY-MM-DD") }}</span>
              <i class="iconfont icon-inbox1 pl-9"></i>
              <router-link
                tag="span"
                :to="`/article/list/${article._id}`"
                class="fs-sm pl-2 mr-6 hand"
              >{{ article.categories[0].name }}</router-link>
              <i class="iconfont icon-love- text-red hand"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-10">
      <div class="page-navigator d-flex jc-center">
        <div :class="{ current: 1 == pagination.currentPage }" class="mx-4 hand fs-md">
          <a @click="goToPage(1)" data-hover="首页">
            <span class="text-grey-1">首页</span>
          </a>
        </div>
        <div class="mx-4 hand fs-md">
          <a @click="prev()">
            <span class="text-grey-1">&laquo;</span>
          </a>
        </div>
        <div
          class="mx-4 hand fs-md"
          :class="{ current: article == pagination.currentPage }"
          v-for="article in pagination.totalPage"
          :key="article"
        >
          <a @click="goToPage(article)" :data-hover="article" class="text-grey-1">{{ article }}</a>
        </div>

        <div class="mx-4 hand fs-md">
          <a @click="next()">
            <span class="text-grey-1">&raquo;</span>
          </a>
        </div>
        <div
          class="mx-4 hand fs-md"
          :class="{ current: pagination.totalPage == pagination.currentPage }"
        >
          <a @click="goToPage(pagination.totalPage)" data-hover="末页">
            <span class="text-grey-1">末页</span>
          </a>
        </div>
        <div class="current mx-4 fs-md">
          <span class="text-grey-1">第{{ pagination.currentPage }}页 / 共{{ pagination.totalPage }}页</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
      pagination: {
        totalPage: 1,
        currentPage: 1
      }
    };
  },
  methods: {
    async fetchData() {
      const res = await this.$http.get(
        `/articles/${this.pagination.currentPage}`
      );
      this.articles = res.data.list;
      this.pagination.totalPage = res.data.totalPage;
      this.pagination.currentPage = res.data.currentPage;
    },
    async goToPage(pageNum) {
      this.pagination.currentPage = pageNum;
      this.fetchData();
    },
    prev() {
      if (this.pagination.currentPage == 1) {
        return;
      }
      this.pagination.currentPage--;
      this.fetchData();
    },
    next() {
      if (this.pagination.currentPage == this.pagination.totalPage) {
        return;
      }
      this.pagination.currentPage++;
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style lang="scss" scoped>
.post-container {
  max-width: 1080px;
  margin: 0 auto;
  .top {
    width: 270px;
    height: 250px;
    // background: #f7f7f7 no-repeat top center;
    // background-size: auto 100%;
  }
}
</style>
