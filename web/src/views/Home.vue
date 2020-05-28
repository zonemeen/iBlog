<template>
  <div class="mb-9">
    <div class="mb-7">
      <div class="bgImg d-flex jc-center" id="header">
        <div class="text-white d-flex jc-center ai-center">
          <span class="shouye-text">亲亲这边建议您要多喝热水哦</span>
          <span class="line-down pl-3">_</span>
        </div>
        <div class="arrow-down">
          <i class="iconfont icon-down" @click="downPage"></i>
        </div>
      </div>
    </div>
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
              <i class="iconfont icon-riqi2 pr-2"></i>
              <span class="fs-sm">{{ article.createdAt | date("YYYY-MM-DD") }}</span>
              <i class="iconfont icon-sort pl-9"></i>
              <router-link
                tag="span"
                :to="`/tags`"
                class="fs-sm pl-2 mr-6 hand"
              >{{ article.categories[0].name }}</router-link>
              <i class="iconfont icon-love text-red hand"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-10" v-if="articles.length > 0">
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
import $ from "jquery";
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
    },
    downPage() {
      $("html,body").animate(
        { scrollTop: $("#header").outerHeight() - 56 },
        500
      );
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style lang="scss" scoped>
.bgImg {
  background-image: url(https://miqilin-blog.oss-cn-shenzhen.aliyuncs.com/bg-blog.png);
  width: 100%;
  height: 100vh;
  background-position: center;
  background-size: cover;
  position: relative;
  overflow: hidden;
  .shouye-text {
    font-size: 32px;
    font-family: "Roboto", sans-serif;
    width: 13em;
    white-space: nowrap;
    animation: typing 2.5s steps(13, end), infinite;
    overflow: hidden;
  }
  .line-down {
    font-size: 32px;
    font-family: "Roboto", sans-serif;
    animation: shine 0.5s linear infinite alternate;
  }
  .arrow-down {
    position: absolute;
    bottom: 30px;
    color: #fff;
    animation: arrowDown 0.8s linear infinite alternate;
    .icon-down {
      cursor: pointer;
      font-size: 45px;
    }
  }
}

@keyframes arrowDown {
  0% {
    visibility: hidden;
    opacity: 0;
    -webkit-transform: translatey(-20%);
  }
  20% {
    visibility: visible;
    opacity: 0;
    -webkit-transform: translatey(10%);
  }
  100% {
    visibility: visible;
    opacity: 1;
    -webkit-transform: translatey(20%);
  }
}
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 13em;
  }
}
@keyframes shine {
  0% {
    visibility: hidden;
    opacity: 0;
  }
  100% {
    visibility: visible;
    opacity: 1;
  }
}

.post-container {
  max-width: 1024px;
  margin: 0 auto;
  .top {
    width: 270px;
    height: 250px;
  }
}
@media screen and (max-width: 768px) {
  .shouye-text {
    font-size: 24px !important;
  }
  .line-down {
    font-size: 24px !important;
  }
}
</style>
