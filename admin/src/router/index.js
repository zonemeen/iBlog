import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [{
      path: "/login",
      name: "login",
      component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue'),
      meta: {
        isPublic: true
      }
    },
    {
      path: "/",
      name: "main",
      component: () => import( /* webpackChunkName: "main" */ '../views/Main.vue'),
      children: [{
          path: "/categories/create",
          component: () => import( /* webpackChunkName: "category_edit" */ '../views/CategoryEdit.vue'),
        },
        {
          path: "/categories/edit/:id",
          component: () => import( /* webpackChunkName: "category_edit" */ '../views/CategoryEdit.vue'),
          props: true
        },
        {
          path: "/categories/list",
          component: () => import( /* webpackChunkName: "category_list" */ '../views/CategoryList.vue'),
        },
        {
          path: "/articles/create",
          component: () => import( /* webpackChunkName: "article_edit" */ '../views/ArticleEdit.vue'),
        },
        {
          path: "/articles/edit/:id",
          component: () => import( /* webpackChunkName: "article_edit" */ '../views/ArticleEdit.vue'),
          props: true
        },
        {
          path: "/articles/list",
          component: () => import( /* webpackChunkName: "article_list" */ '../views/ArticleList.vue'),
        },
        {
          path: "/comments/list",
          component: () => import( /* webpackChunkName: "comment_list" */ '../views/CommentList.vue'),
          props: true
        },
        {
          path: "/links/create",
          component: () => import( /* webpackChunkName: "link_edit" */ '../views/LinkEdit.vue'),
        },
        {
          path: "/links/edit/:id",
          component: () => import( /* webpackChunkName: "link_edit" */ '../views/LinkEdit.vue'),
          props: true
        },
        {
          path: "/links/list",
          component: () => import( /* webpackChunkName: "link_list" */ '../views/LinkList.vue'),
        },
        {
          path: "/messages/list",
          component: () => import( /* webpackChunkName: "message_list" */ '../views/MessageList.vue'),
        },
        {
          path: "/users/list",
          component: () => import( /* webpackChunkName: "link_list" */ '../views/UserList.vue'),
        },
        {
          path: "/admin_users/create",
          component: () => import( /* webpackChunkName: "admin_edit" */ '../views/AdminUserEdit.vue'),
        },
        {
          path: "/admin_users/edit/:id",
          component: () => import( /* webpackChunkName: "admin_edit" */ '../views/AdminUserEdit.vue'),
          props: true
        },
        {
          path: "/admin_users/list",
          component: () => import( /* webpackChunkName: "admin_list" */ '../views/AdminUserList.vue'),
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