<template>
  <div>
    <div
      class="page-article d-flex jc-center w-100"
      v-if="model"
      v-loading.fullscreen.lock="fullscreenLoading"
      element-loading-background="rgba(0, 0, 0, 1)"
    >
      <div class="d-none left"></div>
      <div class="page">
        <div class="text-green fs-xxxxl mt-11">{{ model.title }}</div>
        <div class="text-grey-2 fs-sm mt-6">
          <p>发布于：{{ model.createdAt | date("YYYY-MM-DD HH:mm") }}</p>
        </div>
        <div>
          <div
            class="p-2 bdr post-tags text-border text-center bg-blue fs-sm mt-6 hand"
          >
            <span class>
              <i class="iconfont icon-tag"></i>
            </span>
            &nbsp;
            <span class>{{ model.categories[0].name }}</span>
          </div>
        </div>
        <div class="mt-5 mb-6"></div>
        <div class="text-grey-2 fs-md mb-10 container">
          <div class="markdown-body">
            <div id="content" v-html="model.body"></div>
          </div>
        </div>
        <div class="fs-xxl">
          <h3 class><i class="col-primary"># </i>评论</h3>
          <comment-textarea
            model="comments"
            @toResponse="getBlogsComments"
            type="parent"
            :blogsId="id"
            placeholder="大家请坐下，陈独秀同志，要发言了。。。"
          ></comment-textarea>
          <comment-list
            class="mt-4"
            model="comments"
            @getCommentList="getBlogsComments"
            :commentsList="parentComments"
            v-if="parentComments"
            :blogsId="id"
          ></comment-list>
        </div>
      </div>
      <div class="d-none left">
        <div class="blogs-menu pl-4 toc-sticky text-grey-1 pl-9">
          <div>
            <h2>目录</h2>
            <div
              class="menu-title hand text-ellipsis"
              :title="item.text"
              v-for="item in articleToc"
              :key="item.id"
              :style="{ paddingLeft: `${item.indent}em` }"
              @click="scrollTo(item.id)"
            >
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-100 h-100">
      <el-backtop :bottom="50"></el-backtop>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/tomorrow-night-eighties.css";
import { addLineAndCopy } from "../common/lineAndCopy";
import Toc from "../common/Toc.js";
import commentTextarea from "../components/commentTextarea";
import commentList from "../components/commentList";

const renderer = new marked.Renderer();

marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code, true).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  },
});

export default {
  components: {
    commentTextarea,
    commentList,
  },
  props: {
    id: { required: true },
  },
  data() {
    return {
      model: null,
      articleToc: [],
      fullscreenLoading: false,
      parentComments: [],
    };
  },
  watch: {
    id: "fetch",
    // id(){
    //   this.fetch()
    // }
  },
  methods: {
    async fetch() {
      this.fullscreenLoading = true;
      const res = await this.$http.get(`articles/list/${this.id}`);
      this.model = res.data;
      let tocData = Toc(marked(res.data.body));
      this.model.body = tocData.article;
      this.articleToc = tocData.toc;
      this.$nextTick(() => {
        addLineAndCopy();
        // this.addCodeSupport()
      });
      this.fullscreenLoading = false;
    },
    scrollTo(id) {
      // 绑定 toc 点击事件
      let node = document.querySelector('[data-id="' + id + '"]');
      if (!node) {
        return;
      }
      node.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    },
    async getBlogsComments() {
      let res = await this.$http.get(`/comments/${this.id}`);
      console.log(res);
      let blogsComments = res.data;
      this.parentComments = blogsComments.filter(
        (v) => v.parent == "5e52a80981bf76430fd982f0"
      );
      this.parentComments.forEach((c) => {
        return (c.children = blogsComments.filter((v) => v.parent == c._id));
      });
    },
  },
  created() {
    this.fetch();
    this.getBlogsComments();
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";

#content {
  line-height: 1.5;
}

.page {
  max-width: 46.4286rem;
}
.post-tags {
  max-width: 4.2857rem;
}

.post-tags:hover {
  background-color: map-get($colors, "border");
  color: map-get($colors, "grey");
}

.left {
  width: 25%;
}

.blogs-menu {
  max-width: 14.2857rem;
  line-height: 1.3;
  margin-top: 205px;
  .menu-title {
    padding: 6px 0;
    color: map-get($colors, "green-1");
    &:hover {
      text-decoration: underline;
    }
  }
}
.toc-sticky {
  position: -webkit-sticky !important;
  position: sticky !important;
  top: 80px;
}
@media (max-width: 900px) {
  .d-none {
    display: none;
  }
  .page {
    margin: 0 auto;
  }
}
@media (max-width: 780px) {
  .page {
    width: 95%;
    margin: 0 auto;
  }
}
</style>
