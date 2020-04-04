<template>
  <div
    class="mb-7"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="page-archive d-flex flex-column ai-center jc-center">
      <div class="mt-11 pr-11 mr-11">
        <div class="fs-xxxxl text-green">共计{{ model.length }}篇文章</div>
        <div class="fs-xxxl text-grey-2 mt-6">{{ model.createdAt | date("YYYY") }}</div>
      </div>
      <div>
        <router-link
          tag="div"
          :to="`/article/list/${item._id}`"
          class="show box hand"
          v-for="item in model"
          :key="item.title"
        >
          <div class="bg-postcolor px-8 my-8 py-7" style="border-radius: 10px;">
            <div class="fs-lg text-grey-1">{{ item.title }}</div>
            <div class="fs-sm text-grey-1 mt-5">{{ item.createdAt | date("YYYY-MM-DD") }}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: []
    };
  },
  methods: {
    async fetchArticles() {
      this.loading = true;
      const res = await this.$http.get("articles/list");
      this.model = res.data;
      this.loading = false;
    }
  },
  created() {
    this.fetchArticles();
  }
};
</script>

<style lang="scss" scoped>
.box {
  min-width: 25rem !important;
}
</style>
