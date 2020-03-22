<template>
  <div class="page-link d-flex flex-column ai-center pt-10">
    <div class="page p-6">
      <div class="text-green fs-xxxxl">About</div>
      <div class="text-grey-2 fs-sm mt-5">Published on March 11th 2020</div>
      <div class="mt-5 mb-5"></div>
      <div class="py-4">
        <span class="fs-xxl text-green">#</span>
        &nbsp;
        <span class="fs-xxl text-grey-1">关于自己</span>
      </div>
      <div class="pl-6 text-green-1">
        <p>• 转行前端程序员一枚，目前坐标：深圳</p>
        <p>• 未来希望成为一名优秀前端工作者</p>
        <p>• 还是一名具有吃遍各地美食梦的程序 🐵</p>
        <p>• 如有错误地方烦请指正</p>
      </div>
      <div class="py-4">
        <span class="fs-xxl text-green">#</span>
        &nbsp;
        <span class="fs-xxl text-grey-1">关于博客</span>
      </div>
      <div class="pl-6 text-green-1">
        <p>• 记录一些学习、开发过程中的想法和心得，分享一些日常~</p>
      </div>
      <div class="py-4 mt-6">
        <span class="fs-xxl text-green">#</span>
        &nbsp;
        <span class="fs-xxl text-grey-1">Side Project (Coding)</span>
      </div>
      <div class="pl-6 text-green-1 mb-9">
        <p>
          <a href="http://miqilin21.com" class="text-green-1 bd-bottom-about">• CMS(本博客)</a>
          - 基于NodeJs、Vue、MongoDB实现的一款CMS系统
        </p>
        <p>
          <a
            href="https://github.com/miqilin21/moba-mobile-site"
            class="text-green-1 bd-bottom-about"
          >• Moba-Mobile-Site</a>
          - 仿王者荣耀官网移动端&后台管理系统，后端Node.js，前端Vue.js
        </p>
        <p>
          <a href="/" class="text-green-1 bd-bottom-about">• 其他项目</a>
          - 持续开发中...
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/scss/style.scss";

.bd-bottom-about,
.bd-bottom-about:hover {
  border-bottom: 1px solid grey;
  color: map-get($colors, "red");
}
</style>
