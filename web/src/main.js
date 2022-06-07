import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './assets/scss/style.scss'
import './assets/iconfont/iconfont.css'
import './plugins/filters'
import './plugins/global'
import http from './http'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = http

NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3,
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})
// axios请求拦截器
http.interceptors.request.use(
  (config) => {
    NProgress.start()
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// axios响应拦截器
http.interceptors.response.use(
  (response) => {
    NProgress.done()
    return response.status === 200
      ? Promise.resolve(response)
      : Promise.reject(response)
  },
  (error) => {
    return Promise.reject(error)
  }
)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
