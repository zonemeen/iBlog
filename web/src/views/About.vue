<template>
  <div class="page-about d-flex flex-column ai-center py-9">
    <div class="page p-6">
      <div class="text-green fs-xxxxl">About</div>
      <div class="text-grey-2 fs-sm mt-5">Published on March 11th 2020</div>
      <div class="mt-5 mb-5"></div>
      <div class="py-4">
        <span class="fs-xxl text-green">#</span>
        &nbsp;
        <span class="fs-xxl text-grey-1">关于自己</span>
      </div>
      <div class="pl-5 text-green-1">
        <p>• 转行前端程序员一枚，目前坐标：深圳</p>
        <p>• 未来希望成为一名优秀前端工作者</p>
        <p>• 还是一名具有吃遍各地美食梦的程序🐵</p>
      </div>
      <div class="py-4">
        <span class="fs-xxl text-green">#</span>
        &nbsp;
        <span class="fs-xxl text-grey-1">关于博客</span>
      </div>
      <div class="pl-5 text-green-1">
        <p>
          •
          该博客用Vue实现，express提供数据接口，mongoDB储存数据，部署在腾讯云的linux服务器上，搭建博客的初衷是希望把自己平常工作学习总结的东西记录下来，以便不时之需可以查阅。
        </p>
        <p>• 如有错误地方烦请指正</p>
      </div>
      <div class="py-4 mt-6">
        <span class="fs-xxl text-green">#</span>
        &nbsp;
        <span class="fs-xxl text-grey-1">Side Project (Coding)</span>
      </div>
      <div class="pl-5 text-green-1 mb-9">
        <p>
          <a
            href="https://github.com/miqilin21/myBlog"
            target="_blank"
            class="text-green-1 bd-bottom-about"
            >• CMS(本博客)</a
          >
          - 基于NodeJs、Vue、MongoDB实现的一款CMS博客系统🔥
        </p>
        <p>
          <a
            href="https://github.com/miqilin21/iMoney"
            target="_blank"
            class="text-green-1 bd-bottom-about"
            >• iMoney</a
          >
          - 基于Vue、Vue Router、Vuex、TypeScript实现的一款极简的记账应用🤑
        </p>
        <p>
          <a
            href="https://github.com/miqilin21/iMusic"
            target="_blank"
            class="text-green-1 bd-bottom-about"
            >• iMusic</a
          >
          - 基于网易云音乐API实现的一款音乐微信小程序🎵
        </p>
        <p>
          <a
            href="https://github.com/miqilin21/cv"
            target="_blank"
            class="text-green-1 bd-bottom-about"
            >• cv</a
          >
          - 原生js实现的米淇淋个人简历📄
        </p>
        <p>
          <a
            href="https://github.com/miqilin21"
            target="_blank"
            class="text-green-1 bd-bottom-about"
            >• 其他项目</a
          >
          - 持续开发中...
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/style.scss";

.bd-bottom-about {
  border-bottom: 0.0714rem solid grey;
  &.bd-bottom-about:hover {
    color: map-get($colors, "red");
  }
}
</style>
