<template>
  <div class="page-link d-flex flex-column ai-center pt-10">
    <div class="page p-6">
      <div class="text-green fs-xxxxl">Message</div>
      <div class="text-grey-2 fs-sm mt-5">Published on March 11th 2020</div>
      <div class="mt-5 mb-5"></div>
      <div class="py-4">
        <span class="fs-xxl text-green">#</span>
        &nbsp;
        <span class="fs-xxl text-grey-1">留言前需知</span>
      </div>
      <div class="pl-6 text-green-1">
        <p>• 烦请各位留言时务必填写自己真实的邮箱。</p>
        <p>• 留言博主基本都会回复，并会邮件通知留言者。</p>
        <p>• 请不要发广告和带有商业推广链接的无用留言。</p>
      </div>
      <p class="my-8 text-grey-2">希望彼此之间有好的交流。 ^_^</p>
    </div>
    <div class="mb-9">
      <div class="mb-7">
        <span class="fs-xxxl text-grey-1 text-center">Responses</span>
      </div>
      <div
        id="comment"
        class="bg-postcolor p-8"
        style="width: 600px !important"
      ></div>
    </div>
  </div>
</template>

<script>
window.AV = require("leancloud-storage");
import Valine from "valine";
export default {
  mounted: function() {
    new Valine({
      el: "#comment",
      appId: "gx1SngFstb33zG0O4dDEAoIi-gzGzoHsz", // your AppId
      appKey: "7WIr5ScNYiwC5JiV9e3KhguE", // your AppKey
      notify: false,
      verify: false,
      avatar: "monsterid", // (''/mp/identicon/monsterid/wavatar/robohash/retro/hide)
      pageSize: 5,
      placeholder: "大家请坐下，陈独秀同志要发言了。。。"
    });
  }
};
</script>
<style lang="scss">
@import "../assets/scss/style.scss";
/*评论样式*/
div.info {
  display: none;
}

div#comments.comments.v {
  margin-top: 0px !important;
  margin-left: 0px !important;
  margin-right: 0px !important;
}
.vwrap {
  border: 1px solid grey !important;
}
div.vcontrol {
  padding-top: 0px !important;
}

.v .vbtn {
  background-color: #6fa3ef !important;
  color: white !important;
}

.v .vwrap .vedit .vctrl {
  text-align: left !important;
}

.v .vwrap .vedit .vctrl span {
  color: map-get($colors, "grey") !important;
  padding: 3px !important;
}

.v .veditor {
  min-height: 70px !important;
  height: 100px !important;
}

.v .vlist .vcard {
  border: 1px solid grey !important;
  padding-left: 14px !important;
  padding-right: 14px !important;
  margin-bottom: 25px !important;
  border-radius: 10px !important;
}

.v .vlist .vcard .vhead .vsys {
  display: none !important;
}
.v .vlist .vcard .vh .vmeta .vat {
  background-color: #6fa3ef !important;
  color: #fff !important;
  border-radius: 3px !important;
  padding-left: 10px !important;
  padding-right: 10px !important;
}
// .v .vlist .vcard .vh

.v .vlist .vcard .vcontent {
  margin-top: 20px !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  margin-bottom: unset !important;
}

.v .vlist .vcard .vh .vquote .vh .vcontent {
  font-weight: 500 !important;
}

.v .vlist .vcard .vhead .vnick {
  font-size: 16px !important;
  font-weight: 500 !important;
  color: #a7c194 !important;
}

.v .vlist .vcard {
  padding-top: 8px !important;
}

.v .vlist .vcard .vhead {
  float: left !important;
}

.v .vlist .vcard .vh .vmeta {
  float: right !important;
}
</style>
