import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
  path: "/",
  component: resolve => require(['@/views/Main'], resolve),
  children: [{
      path: "/",
      name: "Home",
      component: resolve => require(['@/views/Home'], resolve)
    },
    {
      path: "/archives",
      name: "归档",
      component: resolve => require(['@/views/Archive'], resolve)
    },
    {
      path: "/links",
      name: "友链",
      component: resolve => require(['@/views/Link'], resolve)
    },
    {
      path: "/message",
      name: "留言",
      component: resolve => require(['@/views/Message'], resolve)
    },
    {
      path: "/about",
      name: "关于",
      component: resolve => require(['@/views/About'], resolve)
    },
    {
      path: "/article/:id",
      name: "文章",
      component: resolve => require(['@/views/Article'], resolve),
      props: true
    },
    {
      path: "/search",
      name: "搜索",
      component: resolve => require(['@/views/Search'], resolve)
    },
  ]
}, ];

const router = new VueRouter({
  routes
});

export default router;