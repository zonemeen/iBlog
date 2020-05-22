<template>
  <div class="foot">
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
            <img src="https://miqilin-blog.oss-cn-shenzhen.aliyuncs.com/logo.png" height="32" />
          </router-link>
          <div class="text-grey-2 fs-sm">
            <p class="load">I work with passion & love.</p>
            <p>
              The Site is Powered by
              <a href="https://github.com/miqilin21" target="_blank">miqilin21</a>
            </p>
            <p>
              <a
                href="http://www.beian.miit.gov.cn/"
                target="_blank"
                class="text-grey-2"
              >浙ICP备20010345号-1</a>
            </p>
            <p>
              本博客已运行{{ this.timeObj.day }}天{{ this.timeObj.hour }}时{{
              this.timeObj.minute
              }}分{{ this.timeObj.second }}秒
            </p>
          </div>
        </div>
        <div class="px-8">
          <div class="text-grey-1 fs-md mt-5">RECENT POSTS</div>
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
import dayjs from "dayjs";

export default {
  data() {
    return {
      model: [],
      currentTime: "232",
      startTime: 1583856000000,
      timeCha: "232321",
      timeObj: {
        day: 0,
        hour: 0,
        minute: 0,
        second: 0
      },
      showTime: true,
      intTime: null
    };
  },
  created() {
    this.getTime();
  },
  beforeDestroy() {
    clearInterval(this.intTime);
  },
  methods: {
    async fetchArticles() {
      const res = await this.$http.get("articles/recent");
      this.model = res.data;
    },
    async getTime() {
      let res = await this.$http.get("/time");
      this.currentTime = res.data.data;
      this.timeCha = this.currentTime - this.startTime;
      this.getCountTime(this.timeCha);
      this.intTime = setInterval(() => {
        this.timeCha += 1000;
        this.getCountTime(this.timeCha);
      }, 1000);
    },
    // 将倒计的时间戳换算成天、时、分、秒
    getCountTime(time) {
      let countTime = {
        day: 0,
        hour: 0,
        minute: 0,
        second: 0
      };
      countTime.day = Math.floor(time / (24 * 60 * 60 * 1000));
      countTime.hour = Math.floor(
        (time % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
      );
      countTime.minute = Math.floor(
        ((time % (24 * 60 * 60 * 1000)) % (60 * 60 * 1000)) / (60 * 1000)
      );
      countTime.second = Math.floor(
        (((time % (24 * 60 * 60 * 1000)) % (60 * 60 * 1000)) % (60 * 1000)) /
          1000
      );
      this.$nextTick(() => {
        this.timeObj = countTime;
        this.showTime = true;
      });
    }
  },
  mounted() {
    this.fetchArticles();
  }
};
</script>

<style lang="scss" scoped>
.foot {
  width: 100%;
  bottom: 0;
  left: 0;
}
</style>
