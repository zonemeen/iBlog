<template>
  <div class="search-box">
    <img
      width="100%"
      height="100%"
      src="../assets/images/bg.png"
      style="position: fixed; left:0; top:0; z-index:-1;"
    />
    <div class="d-flex flex-column ai-center" style="padding: 250px;">
      <div class="bg-white bdr">
        <input
          type="text"
          placeholder="Search..."
          v-model="search"
          required="true"
          class="p-3 fs-xxl mr-3 ml-5"
          style="border: 1px solid white; width: 500px"
        />
        <span class="iconfont icon-findx text-black mr-2"></span>
      </div>
      <!-- <div v-for="blog in filterBlogs" :key="blog._id" class="fs-xxxl p-5 mt-10 text-grey-1 hand">
        <router-link tag="div" :to="`/article/${article._id}`">{{blog.title}}</router-link>
      </div>-->
      <!-- <div v-for="blog in filterBlogs" :key="blog.title">
      <div>{{blog.title}}</div>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blog: [],
      search: ""
    };
  },
  methods: {
    async fetchArticles() {
      const cat = await this.$http.get("articles/list");
      this.blogs = cat.data;
    }
  },
  created() {
    this.fetchArticles();
  },
  computed: {
    filterBlogs: function() {
      return this.blogs.filter(blog => {
        return blog.title.match(this.search);
      });
    }
  }
};
</script>