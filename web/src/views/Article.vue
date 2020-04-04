<template>
  <div class="page-article d-flex flex-column ai-center flex-wrap" v-if="model">
    <div class="page">
      <div class="text-green fs-xxxxl mt-11">{{ model.title }}</div>
      <div class="text-grey-2 fs-sm mt-6">
        <p>
          发布于：{{ model.createdAt | date("YYYY-MM-DD HH:mm") }} | 更新于：{{
          model.updateAt | date("YYYY-MM-DD HH:mm")
          }}
        </p>
      </div>
      <div>
        <div class="p-2 bdr post-tags text-border text-center bg-blue fs-sm mt-6 hand">
          <span class>
            <i class="iconfont icon-tag1"></i>
          </span>
          &nbsp;
          <span class>{{ model.categories[0].name }}</span>
        </div>
      </div>

      <div class="mt-5 mb-6"></div>
      <div class="text-grey-2 fs-md mb-10 container">
        <div class="markdown-body">
          <div id="content" v-html="compiledMarkdown"></div>
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

const renderer = new marked.Renderer();
const r = {
  heading: renderer.heading.bind(renderer)
};
let toc = [];

renderer.heading = (text, level, raw, slugger) => {
  toc.push({
    level: level,
    text: text
  });

  return r.heading(text, level, raw, slugger);
};
console.log(toc);

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
  }
});

export default {
  name: "test",
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: null
    };
  },
  watch: {
    id: "fetch"
    // id(){
    //   this.fetch()
    // }
  },
  computed: {
    compiledMarkdown() {
      return marked(this.model.body);
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/list/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>
