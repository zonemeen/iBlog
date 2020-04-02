import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Archive from '../views/Archive.vue'
import Tag from '../views/Tag.vue'
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
        name: '首页',
        component: Home
      },
      {
        path: '/archives',
        name: '归档',
        component: Archive
      },
      {
        path: '/tags',
        name: '标签',
        component: Tag
      },
      {
        path: '/links',
        name: '友链',
        component: Link
      },
      {
        path: '/message',
        name: '留言',
        component: Message
      },
      {
        path: '/about',
        name: '关于',
        component: About
      },
      {
        path: '/article/list/:id',
        name: '文章',
        component: Article,
        props: true
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
  routes
})

export default router