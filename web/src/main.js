import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import "./assets/scss/comment.scss";
import "./assets/scss/style.scss";
import "./assets/iconfont/iconfont.css";
import './common/filters'
import './common/global'
import http from './http'
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$http = http
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");