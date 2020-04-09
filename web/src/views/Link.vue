<template>
  <div
    class="page-link d-flex flex-column ai-center pt-10"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-background="rgba(0, 0, 0, 1)"
  >
    <div class="page p-6">
      <div class="text-green fs-xxxxl">Links</div>
      <div class="text-grey-2 fs-sm mt-5">Published on March 11th 2020</div>
      <div class="mt-5 mb-7"></div>
      <div>
        <span class="fs-xxl text-green">#</span>
        &nbsp;
        <span class="fs-xxl text-grey-1">友情链接</span>
      </div>
      <div class="m-9 pl-9 link-item">
        <div
          class="p-6 show-link show m-7 bg-postcolor bdr"
          style="width: 70%;"
          v-for="item in model"
          :key="item.name"
        >
          <el-tooltip
            placement="right-end"
            effect="light"
            open-delay="100"
            popper-class="text-grey-2 fs-xl"
          >
            <div slot="content" class="text-green">{{ item.site }}</div>
            <a class="a-container hand" :href="item.site">
              <div class="ai-center d-flex">
                <span>
                  <img :src="item.icon" style="width: 40px; height: 40px;" />
                </span>
                <span class="fs-xxxxl text-green pl-6 link-font">{{
                  item.name
                }}</span>
              </div>
            </a>
          </el-tooltip>
          <div class="fs-md text-green-1 mt-5">{{ item.description }}</div>
        </div>
      </div>
      <div class="py-4">
        <span class="fs-xxl text-green">#</span>
        &nbsp;
        <span class="fs-xxl text-grey-1">链接需知</span>
      </div>
      <div class="px-5 py-2 text-green-1 bg-postcolor bdr">
        <p>• 请确定贵站可以稳定运营</p>
        <p>• 原创博客优先，技术类博客优先，设计、视觉类博客优先</p>
        <p>• 经常过来访问和评论，眼熟的</p>
      </div>
      <p class="text-grey-2 my-6">备注：默认申请友情链接均为内页（当前页面）</p>
      <div class="py-4 mb-5">
        <span class="fs-xxl text-green">#</span>
        &nbsp;
        <span class="fs-xxl text-grey-1">基本信息</span>
      </div>
      <div class="bg-postcolor px-5 py-2 text-green-1 fs-sm bdr">
        <p>• 格式比如：</p>
        <p>• 网站名称：miqilin's blog</p>
        <p>• 网站地址：blog.miqilin21.cn</p>
        <p>• 描述：我劝你要多喝热水哈哈哈哈哈哈哈哈哈哈哈</p>
      </div>
      <p class="my-9 text-grey-2">
        暂时先这样，同时欢迎互换友链，到留言页留言即可。 ^_^
      </p>
    </div>
    <div class="w-100 h-100">
      <el-backtop :bottom="50"></el-backtop>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: [],
      fullscreenLoading: false,
    };
  },
  methods: {
    async fetchLinks() {
      this.fullscreenLoading = true;
      const res = await this.$http.get("links/list");
      this.model = res.data;
      this.fullscreenLoading = false;
    },
  },
  created() {
    this.fetchLinks();
  },
};
</script>

<style lang="scss" scpoed>
.show-link {
  box-shadow: 0.0714rem 0.0714rem 0.3571rem 0.0714rem rgba(0, 0, 0, 0.2);
}
</style>
