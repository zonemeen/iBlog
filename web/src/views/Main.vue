<template>
  <div>
    <div class="topbar nav jc-around bg-navcolor">
      <div class="mt-4 hand">
        <router-link tag="div" to="/">
          <img src="../assets/logo.png" height="42" />
        </router-link>
      </div>
      <div class="d-flex my-7 text-grey-1 hand">
        <router-link
          tag="div"
          :to="item.link"
          v-for="(item, i) in items"
          @click="currentIndex = i"
          :class="{ active: currentIndex === i }"
          :key="item.text"
          class="nav-item px-5 icon"
        >{{ item.text }}</router-link>
        <div class="nav-item px-5">
          <router-link tag="div" to="/find" class="iconfont icon-findx"></router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
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
      <div class="pt-9 d-flex jc-center">
        <div class="me px-8">
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
          </div>
        </div>
        <div class="me px-8">
          <div class="text-grey-1 fs-md">RECENT POSTS</div>
          <div class="text-grey-2 fs-sm hand">
            <router-link
              tag="p"
              v-for="item in model"
              :to="`/article/${item._id}`"
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
      items: [
        { text: "首页", link: "/" },
        { text: "归档", link: "/archives" },
        { text: "友链", link: "/links" },
        { text: "留言", link: "/message" },
        { text: "关于", link: "/about" }
      ],
      model: [],
      currentIndex: ""
    };
  },
  methods: {
    async fetchArticles() {
      const res = await this.$http.get("articles/recent");
      this.model = res.data;
    }
  },
  created() {
    this.fetchArticles();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/style.scss";
.nav-item:hover {
  color: map-get($colors, "red");
}

.active {
  color: map-get($colors, "red");
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}

.load {
  width: 13em;
  white-space: nowrap;
  border-right: 2px solid transparent;
  animation: load 3.5s steps(15, end), blink-caret 0.75s step-end infinite;
  overflow: hidden;
}

@keyframes load {
  from {
    width: 0;
  }
  // to {
  //   width: 15em;
  // }
}

@keyframes blink-caret {
  to {
    box-shadow: 1px 0 0 0 transparent;
  }
  50% {
    box-shadow: 1px 0 0 0;
  }
}
</style>
