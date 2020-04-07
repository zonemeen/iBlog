import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Archive from '../views/Archive.vue'
import Link from '../views/Link.vue'
import Message from '../views/Message.vue'
import About from '../views/About.vue'
import Article from '../views/Article.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Main,
    children: [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          title: '首页 - MIQILIN'
        }
      },
      {
        path: '/archives',
        name: 'Archive',
        component: Archive,
        meta: {
          title: '归档 - MIQILIN'
        }
      },
      {
        path: '/links',
        name: 'Link',
        component: Link,
        meta: {
          title: '友链 - MIQILIN'
        }
      },
      {
        path: '/message',
        name: 'Message',
        component: Message,
        meta: {
          title: '留言 - MIQILIN'
        }
      },
      {
        path: '/about',
        name: 'About',
        component: About,
        meta: {
          title: '关于 - MIQILIN'
        }
      },
      {
        path: '/article/list/:id',
        name: 'Article',
        component: Article,
        props: true,
        meta: {
          title: '文章详情 - MIQILIN'
        }
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // to and from are both route objects
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router