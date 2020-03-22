<template>
  <div class="page-article d-flex jc-center flex-wrap" v-if="model">
    <div class="page">
      <div class="text-green fs-xxxxl mt-11">{{ model.title }}</div>
      <div class="text-grey-2 fs-sm mt-5">Published on {{ model.date }}</div>
      <div class="mt-5 mb-6"></div>
      <div class="text-grey-2 fs-md mb-9 container">
        <div class="markdown-body">
          <div class v-html="compiledMarkdown"></div>
        </div>
      </div>
      <div class="list">
        <div
          class="h"
          v-for="(h, i) in toc"
          :is="'h' + h.level"
          :key="i"
          :title="'h' + h.level"
        >{{ h.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/tomorrow-night-eighties.css";

var renderer = new marked.Renderer();
var toc = [];

renderer.heading = function(text, level, raw) {
  var anchor =
    this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, "-");
  toc.push({
    anchor: anchor,
    level: level,
    text: text
  });
  return "<h" + level + ' id="' + anchor + '">' + text + "</h" + level + ">\n";
};
console.log(toc);

marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  // sanitize: false,
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
      article: {
        content: "加载中..."
      },
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
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.page {
  width: 46.4286rem;
}

.page-article img {
  display: block;
  margin: 0 auto;
}

h2,
h3,
h4 {
  color: map-get($colors, "grey-1");
}
pre {
  border-radius: 5px;
  padding: 16px;
  background: map-get($colors, "postcolor");
  overflow: hidden;
}
code {
  background: map-get($colors, "postcolor");
  padding: 2px 6px;
  color: map-get($colors, "codecolor");
}

.list {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 13px;
    font-weight: normal;
    display: flex;

    &:before {
      width: 20px;
      min-width: 20px;
      display: block;
      opacity: 0.5;
    }
  }

  h1 {
    &:before {
      content: "1\00a0 ";
    }
  }

  h2 {
    &:before {
      content: "2\00a0 ";
      margin-right: 1rem;
    }
  }

  h3 {
    &:before {
      content: "3\00a0 ";
      margin-right: 2rem;
    }
  }

  h4 {
    &:before {
      content: "4\00a0 ";
      margin-right: 3rem;
    }
  }

  h5 {
    &:before {
      content: "5\00a0 ";
      margin-right: 4rem;
    }
  }

  h6 {
    &:before {
      content: "6\00a0 ";
      margin-right: 5rem;
    }
  }
}
</style>
