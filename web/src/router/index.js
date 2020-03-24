import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Archive from "../views/Archive.vue";
import Link from "../views/Link.vue";
import Message from "../views/Message.vue";
import About from "../views/About.vue";
import Article from "../views/Article.vue";
import Search from "../views/Search.vue";
import Tag from "../views/Tag.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    component: Main,
    children: [{
        path: "/",
        name: "Home",
        component: resolve => require(['@/views/Home'], resolve)
      },
      {
        path: "/archives",
        name: "归档",
        component: Archive
      },
      {
        path: "/links",
        name: "友链",
        component: Link
      },
      {
        path: "/message",
        name: "留言",
        component: Message
      },
      {
        path: "/about",
        name: "关于",
        component: About
      },
      {
        path: "/article/:id",
        name: "文章",
        component: Article,
        props: true
      },
      {
        path: "/tag",
        name: "tag",
        component: Tag,
        props: true
      },
      {
        path: "/search",
        name: "搜索",
        component: Search
      },
    ]
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;