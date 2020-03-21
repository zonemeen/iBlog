import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

Vue.config.productionTip = false;

import "./assets/scss/style.scss";
import "./assets/iconfont/iconfont.css";

import axios from "axios";
Vue.prototype.$http = axios.create({
  // baseURL: process.env.VUE_APP_API_URL || '/web/api'
  baseURL: "http://localhost:3000/web/api"
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

window.AV = require("leancloud-storage");
import Valine from "valine";
new Valine({
  el: "#comment",
  app_id: "gx1SngFstb33zG0O4dDEAoIi-gzGzoHsz",
  app_key: "7WIr5ScNYiwC5JiV9e3KhguE",
  // notify: true,
  verify: true,
  avatar: "monsterid", // (''/mp/identicon/monsterid/wavatar/robohash/retro/hide)
  placeholder: "大家请坐下，陈独秀同志要发言了。。。"
});
