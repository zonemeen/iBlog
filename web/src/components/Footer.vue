<template>
  <div>
    <div class="border-bottom border-top bg-navcolor">
      <div class="d-flex py-6 jc-center">
        <div class="px-7 hand">
          <a href="https://github.com/miqilin21" target="_blank" class="text-grey-1">GITHUB</a>
        </div>
        <div class="px-7 hand">
          <a
            href="https://www.zhihu.com/people/mi-qi-lin-60-52"
            target="_blank"
            class="text-grey-1"
          >ZHIHU</a>
        </div>
        <div class="px-7 hand">
          <a
            href="https://www.weibo.com/p/1005052708035565"
            target="_blank"
            class="text-grey-1"
          >WEIBO</a>
        </div>
        <div class="px-7 hand">
          <a href="/" class="text-grey-1">TWITTER</a>
        </div>
      </div>
    </div>
    <div class="footer pt-3 bg-navcolor">
      <div class="pt-5 d-flex jc-center">
        <div class="px-8 mb-4">
          <router-link class="hand" tag="div" to="/">
            <img src="../assets/logo.png" height="32" />
          </router-link>
          <div class="text-grey-2 fs-sm">
            <p class="load">I work with passion & love.</p>
            <p>
              The Site is Powered by
              <a href="https://github.com/miqilin21">miqilin21</a>
            </p>
            <p>
              © Copyright 2020
              <a href="https://github.com/miqilin21">miqilin21</a>
            </p>
            <p>
              <a href="http://www.beian.miit.gov.cn/" class="text-grey-2">浙ICP备20010345号-1</a>
            </p>
          </div>
        </div>
        <div class="px-8">
          <div class="text-grey-1 fs-md mt-6">RECENT POSTS</div>
          <div class="text-grey-2 fs-sm hand">
            <router-link
              tag="p"
              v-for="item in model"
              :to="`/article/list/${item._id}`"
              :key="item._id"
            >{{ item.title }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: [],
      fullscreenLoading: false
    };
  },
  methods: {
    async fetchArticles() {
      this.fullscreenLoading = true;
      const res = await this.$http.get("articles/recent");
      this.model = res.data;
      this.fullscreenLoading = false;
    }
  },
  created() {
    this.fetchArticles();
  }
};
</script>