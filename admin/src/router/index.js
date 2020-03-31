import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [{
      path: "/login",
      name: "login",
      component: resolve => require(['@/views/Login.vue'], resolve),
      meta: {
        isPublic: true
      }
    },
    {
      path: "/",
      name: "main",
      component: resolve => require(['@/views/Main.vue'], resolve),
      children: [{
          path: "/categories/create",
          component: resolve => require(['@/views/CategoryEdit.vue'], resolve),
        },
        {
          path: "/categories/edit/:id",
          component: resolve => require(['@/views/CategoryEdit.vue'], resolve),
          props: true
        },
        {
          path: "/categories/list",
          component: resolve => require(['@/views/CategoryList.vue'], resolve),
        },
        {
          path: "/articles/create",
          component: resolve => require(['@/views/ArticleEdit.vue'], resolve),
        },
        {
          path: "/articles/edit/:id",
          component: resolve => require(['@/views/ArticleEdit.vue'], resolve),
          props: true
        },
        {
          path: "/articles/list",
          component: resolve => require(['@/views/ArticleList.vue'], resolve),
        },
        {
          path: "/links/create",
          component: resolve => require(['@/views/LinkEdit.vue'], resolve),
        },
        {
          path: "/links/edit/:id",
          component: resolve => require(['@/views/LinkEdit.vue'], resolve),
          props: true
        },
        {
          path: "/links/list",
          component: resolve => require(['@/views/LinkList.vue'], resolve),
        },
        {
          path: "/admin_users/create",
          component: resolve => require(['@/views/AdminUserEdit.vue'], resolve),
        },
        {
          path: "/admin_users/edit/:id",
          component: resolve => require(['@/views/AdminUserEdit.vue'], resolve),
          props: true
        },
        {
          path: "/admin_users/list",
          component: resolve => require(['@/views/AdminUserList.vue'], resolve),
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})
export default router;