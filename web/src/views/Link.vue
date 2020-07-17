<template>
  <div class="main-container page-link py-9">
    <div class="p-5">
      <div class="content">
        <div class="text-green fs-xxxxl">Links</div>
        <div class="text-grey-2 fs-sm mt-5">Published on March 11th 2020</div>
        <div class="mt-5 mb-7"></div>
        <div>
          <span class="fs-xxl text-green">#</span>
          &nbsp;
          <span class="fs-xxl text-grey-1">友情链接</span>
        </div>
      </div>
      <linkItem></linkItem>
      <div class="content">
        <div class="py-4">
          <span class="fs-xxl text-green">#</span>
          &nbsp;
          <span class="fs-xxl text-grey-1">链接需知</span>
        </div>
        <div class="px-5 py-2 text-green-1">
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
          <p>• 网站名称：米淇淋的个人博客</p>
          <p>• 网站地址：https://amberzqx.com</p>
          <p>• 描述：我劝你要多喝热水哈哈哈</p>
        </div>
        <p class="my-9 text-grey-2">暂时先这样，同时欢迎互换友链，到留言页留言即可。 ^_^</p>
      </div>
    </div>
  </div>
</template>

<script>
import linkItem from "../components/linkItem.vue";

export default {
  components: {
    linkItem
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scpoed>
.page-link {
  max-width: 650px;
  margin: 90px auto 0;
}
.content {
  line-height: 1.8 !important;
}
</style>
